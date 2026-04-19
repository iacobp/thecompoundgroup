/**
 * Council orchestration — makes the Anthropic API call that runs Ra's
 * seven-voice deliberation and returns structured JSON.
 *
 * The council-prompt.md is loaded from the barque repo as the system
 * prompt. The user message provides today's context: pending forecasts,
 * recent ra_log entries, date, and run-type (daily vs weekly).
 *
 * Claude's web_search tool is enabled so the Augur can find fresh
 * signals without us having to wire a separate search API.
 */

import Anthropic from "@anthropic-ai/sdk";

export type ForecastUpdate = {
  forecastId: string;
  entity: string;
  priorProb: number;
  newProb: number;
  signal: string;
  counterNarrative?: string;
  flagged: boolean;
  signalStrength: number;
  signalsCited: string[];
};

export type CouncilOutput = {
  runType: "daily" | "weekly";
  runDate: string; // YYYY-MM-DD
  forecastUpdates: ForecastUpdate[];
  metaCognition: string[];
  augurPicks: { body: string }[];
  stoic: { actionable: string[]; noise: string[] } | null;
  premortem: {
    forecastId: string;
    entity: string;
    body: string;
    impliedDelta?: string;
  } | null;
  newForecastCandidates: {
    statement: string;
    probability: number;
    resolutionDate: string;
    rationale: string;
  }[];
  emailSubject: string;
  emailBody: string; // markdown
  briefMarkdown: string; // full brief markdown for the repo
};

export type CouncilContext = {
  councilPrompt: string;
  programMd: string;
  historicalCasesMd: string;
  forecastsTsv: string;
  raLogTsv: string;
  runDate: string; // YYYY-MM-DD
  isWeekly: boolean;
};

const MODEL = process.env.BARQUE_MODEL ?? "claude-opus-4-7";

export async function runCouncil(ctx: CouncilContext): Promise<CouncilOutput> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY env var is required");

  const client = new Anthropic({ apiKey });

  const systemPrompt = [
    ctx.councilPrompt,
    "",
    "## Attached — current Barque protocol (program.md)",
    "",
    ctx.programMd,
    "",
    "## Attached — historical cases (reference-class library)",
    "",
    ctx.historicalCasesMd,
  ].join("\n");

  const userMessage = [
    `Today is ${ctx.runDate}. This is a ${ctx.isWeekly ? "weekly (Sunday) edition" : "daily weekday"} run.`,
    "",
    "## Current forecasts.tsv (pending forecasts to re-evaluate)",
    "",
    "```",
    ctx.forecastsTsv,
    "```",
    "",
    "## Recent ra_log.tsv (prior runs — use most recent entry per forecast as your prior)",
    "",
    "```",
    ctx.raLogTsv,
    "```",
    "",
    "## Your job",
    "",
    "Run the council per the system prompt. For each pending forecast, apply the seven voices (or the weekday subset — Historian, Skeptic, Bayesian, Augur, Curator). Use the web_search tool to pull fresh evidence from the signal sources listed in the Barque protocol (FDA, SEC EDGAR, Reddit, news outlets, earnings calls). Stay disciplined: 5 searches total across the run, not per forecast.",
    "",
    "After deliberating, respond with ONE JSON object wrapped in `<output>...</output>` tags. No preamble, no commentary outside the tags. The schema:",
    "",
    "```json",
    "{",
    '  "runType": "daily" | "weekly",',
    '  "runDate": "YYYY-MM-DD",',
    '  "forecastUpdates": [',
    "    {",
    '      "forecastId": "<id from forecasts.tsv>",',
    '      "entity": "<short human label>",',
    '      "priorProb": <number 0.05-0.95>,',
    '      "newProb": <number 0.05-0.95>,',
    '      "signal": "<1-2 sentences summarizing today\'s direct update or noting no change>",',
    '      "counterNarrative": "<one sentence strongest case against>",',
    '      "flagged": <boolean — true if abs(delta) >= 0.15 OR skeptic/bayesian diverged >= 0.15>,',
    '      "signalStrength": <number 0-1000 recomputed today>,',
    '      "signalsCited": ["<url>", "<url>"]',
    "    }",
    "  ],",
    '  "metaCognition": ["<bullet>", "<bullet>", ...],',
    '  "augurPicks": [{ "body": "<one paragraph or say \'quiet day\'>" }],',
    '  "stoic": { "actionable": ["..."], "noise": ["..."] } | null,',
    '  "premortem": { "forecastId": "...", "entity": "...", "body": "<=80 words", "impliedDelta": "..." } | null,',
    '  "newForecastCandidates": [{ "statement": "...", "probability": 0.0, "resolutionDate": "YYYY-MM-DD", "rationale": "..." }],',
    '  "emailSubject": "Barque · Dawn Brief · YYYY-MM-DD",',
    '  "emailBody": "<markdown for the email body>",',
    '  "briefMarkdown": "<full markdown for the brief file to be committed to the repo at briefs/YYYY-MM-DD.md>"',
    "}",
    "```",
    "",
    "Rules:",
    "- stoic and premortem are null on weekday runs, populated only on weekly (Sunday) runs",
    "- newForecastCandidates may be an empty array",
    "- briefMarkdown should be self-contained publishable markdown with front-matter (slug, date, kind, subtitle?)",
    "- emailBody should be readable prose for the operator's inbox (500–800 words)",
    "",
    "Respond now with the output block.",
  ].join("\n");

  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 16000,
    system: systemPrompt,
    messages: [{ role: "user", content: userMessage }],
    tools: [
      {
        type: "web_search_20250305",
        name: "web_search",
        max_uses: 5,
      } as never,
    ],
  });

  // Extract text content — skip any tool_use blocks
  const textParts = response.content
    .filter((block) => block.type === "text")
    .map((block) => (block as { type: "text"; text: string }).text);
  const fullText = textParts.join("\n");

  const match = fullText.match(/<output>([\s\S]*?)<\/output>/);
  if (!match) {
    throw new Error(
      `Council did not return <output> block. Response preview: ${fullText.slice(0, 500)}`
    );
  }

  const jsonText = match[1].trim();
  try {
    return JSON.parse(jsonText) as CouncilOutput;
  } catch (err) {
    throw new Error(
      `Council JSON parse failed: ${err instanceof Error ? err.message : String(err)}. Raw: ${jsonText.slice(0, 500)}`
    );
  }
}
