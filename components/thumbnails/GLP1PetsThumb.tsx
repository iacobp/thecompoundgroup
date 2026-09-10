/** Editorial replica of the live homepage, including its practical food tool. */
export function GLP1PetsThumb() {
  return (
    <div className="plate relative aspect-[4/3] w-full overflow-hidden rounded-[14px] bg-[#f7f4ed]">
      <div className="absolute inset-x-0 top-0 flex h-9 items-center gap-1.5 border-b border-[#cabfa9] bg-[#efeade] px-4">
        <span className="h-2 w-2 rounded-full bg-[#bfae90]" />
        <span className="h-2 w-2 rounded-full bg-[#bfae90]" />
        <span className="h-2 w-2 rounded-full bg-[#bfae90]" />
        <span className="mx-auto -translate-x-4 font-mono text-[10px] text-[#665d50]">glp1pets.com</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 top-9 flex flex-col items-start px-6 py-5 text-left">
        <p className="mb-3 font-mono text-[7px] uppercase tracking-[0.16em] text-[#92400e]">Cats first · Dogs next</p>
        <p className="max-w-[23ch] text-[18px] font-semibold leading-tight tracking-tight text-[#1a1613]">
          GLP-1 weight loss drugs for pets are in trials now.
        </p>
        <p className="mt-3 max-w-[38ch] text-[9px] font-semibold leading-relaxed text-[#1a1613]">No GLP-1 drug is FDA-approved for weight loss in dogs or cats.</p>
        <div className="mt-4 rounded-full bg-[#92400e] px-3 py-2 text-[8px] font-semibold text-white">Tell me when the status changes</div>
        <p className="mt-3 max-w-[38ch] text-[8px] font-semibold leading-relaxed text-[#92400e] underline underline-offset-2">Need help now? Work out your dog’s portions &amp; food cost</p>
        <p className="mt-auto pt-3 text-[7px] text-[#665d50]">Free tools · Trial status updates</p>
      </div>
    </div>
  );
}
