import Link from "next/link";

export function Nav() {
  return (
    <nav className="flex items-center justify-between w-full max-w-3xl mb-6">
      <Link href="/" className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-2xl bg-sky-500 flex items-center justify-center text-white text-sm font-semibold shadow-md">
          E
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-stone-800">Echo</span>
          <span className="text-[11px] text-stone-500">
            a safe space for your feelings
          </span>
        </div>
      </Link>
      <div className="flex items-center gap-2 text-sm">
        <Link href="/write" className="mirror-button-ghost">
          New reflection
        </Link>
        <Link href="/reflections" className="mirror-button-ghost">
          Past reflections
        </Link>
        <Link href="/insights" className="mirror-button-ghost">
          Insights
        </Link>
      </div>
    </nav>
  );
}
