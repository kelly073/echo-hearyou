import Link from "next/link";
import { Suspense } from "react";

function NavLinks() {
  return (
    <nav className="flex items-center justify-between w-full max-w-3xl mb-6">
      <Link href="/" className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-2xl bg-sky-400/90 flex items-center justify-center text-slate-950 text-sm font-semibold shadow-md shadow-sky-500/40">
          M
        </div>
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-semibold text-slate-100">Mirror</span>
          <span className="text-[11px] text-slate-400">
            a quiet space to understand yourself
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
      </div>
    </nav>
  );
}

export function Nav() {
  return (
    <Suspense fallback={<div className="h-10" />}>
      <NavLinks />
    </Suspense>
  );
}

