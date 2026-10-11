/** Editorial replica of the live homepage hero: the question, the answer and the four routes out. */
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
        <p className="mb-2 font-mono text-[7px] uppercase tracking-[0.16em] text-[#92400e]">Cats first · Dogs next</p>
        <p className="text-[19px] font-semibold leading-[1.08] tracking-tight text-[#1a1613]">
          Is there an Ozempic for pets? <span className="block italic text-[#b45309]">Not yet.</span>
        </p>
        <p className="mt-2 max-w-[40ch] text-[9px] leading-relaxed text-[#544f45]">No GLP-1 drug is FDA-approved for weight loss in cats or dogs. Ozempic is approved for people only.</p>
        <div className="mt-3 grid w-full max-w-[250px] grid-cols-2 gap-1.5">
          {["I have a cat", "I have a dog", "What will it cost?", "When will it be ready?"].map((route) => (
            <span key={route} className="rounded-md border border-[#d8c9ae] bg-[#fffdf8] px-2 py-1.5 text-[7.5px] font-semibold text-[#2a2620]">
              {route}
            </span>
          ))}
        </div>
        <div className="mt-3 rounded-full bg-[#b45309] px-3 py-2 text-[8px] font-semibold text-white">Join the update list</div>
        <p className="mt-auto pt-2 text-[7px] text-[#665d50]">Free tools · Trial status updates</p>
      </div>
    </div>
  );
}
