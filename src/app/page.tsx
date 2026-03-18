import Link from "next/link";
import { Nav } from "@/components/Nav";

export default function HomePage() {
  return (
    <>
      <Nav />
      <main className="mirror-card space-y-6">
        <section className="space-y-3">
          <h1 className="mirror-heading">A quiet place to hear yourself.</h1>
          <p className="mirror-subtle max-w-xl">
            Mirror is an AI-assisted reflective journaling space. It helps you
            slow down, notice what you feel, and see gentle patterns in your
            inner life — without pressure to perform or share.
          </p>
        </section>

        <section className="flex flex-wrap gap-3">
          <Link href="/write" className="mirror-button-primary">
            Start a reflection
          </Link>
          <Link href="/reflections" className="mirror-button-ghost">
            Browse past reflections
          </Link>
          <Link href="/insights" className="mirror-button-ghost">
            See gentle insights
          </Link>
        </section>

        <section className="grid gap-4 md:grid-cols-3 pt-4 border-t border-sky-100">
          <div className="space-y-1">
            <h2 className="text-sm font-medium text-slate-800">
              Write for yourself
            </h2>
            <p className="mirror-subtle">
              A calm, private space to put your thoughts into words — with no
              likes, followers, or pressure to be polished.
            </p>
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-medium text-slate-800">
              A gentle mirror
            </h2>
            <p className="mirror-subtle">
              After you write, Mirror reflects back emotional tones, asks a few
              thoughtful questions, and notices recurring themes.
            </p>
          </div>
          <div className="space-y-1">
            <h2 className="text-sm font-medium text-slate-800">
              Anonymous by default
            </h2>
            <p className="mirror-subtle">
              Write with your name or anonymously. Your reflections are for your
              own understanding first.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}

