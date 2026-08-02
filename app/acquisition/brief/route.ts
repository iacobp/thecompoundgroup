import { NextResponse } from "next/server";

// This is a version-controlled public brief, not a live dashboard. Prebuild it
// so agents can read a stable source without a visitor-triggered computation.
export const dynamic = "force-static";

const brief = {
  name: "The Compound Group",
  document: "Public acquisition brief",
  purpose:
    "A machine-readable orientation to the operating model. It is not a financial disclosure or a substitute for diligence.",
  operatingModel: {
    pattern: ["Observe", "Decide", "Publish", "Learn"],
    principle:
      "The portfolio reuses a commercial-intent operating pattern while adapting each property to its own audience and subject matter.",
    humanControl:
      "People retain control of editorial conclusions, safety standards, and material changes.",
  },
  transferableAssets: [
    "Domains, repositories, content, and product surfaces",
    "Documented routines expressed as inputs, rules, outputs, and review points",
    "A public evidence record that names measured, empty, withheld, and unconnected fields",
  ],
  verification: {
    publicLedger: "https://thecompoundgroup.com/numbers",
    publicAcquisitionCanvas: "https://thecompoundgroup.com/acquisition",
    note:
      "Measured operating figures are published only on the ledger, with reading dates and data states. Private verification belongs in the appropriate diligence stage.",
  },
  updatePolicy:
    "This document is static, version-controlled, and updated only when the operating model changes. It does not poll private systems in a visitor's browser.",
};

export function GET() {
  return NextResponse.json(brief, {
    headers: {
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
