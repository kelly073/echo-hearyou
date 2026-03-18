import Link from "next/link";
import { Nav } from "@/components/Nav";
import type { Reflection } from "@/lib/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { DeleteReflectionButton } from "@/components/DeleteReflectionButton";

async function loadReflections(): Promise<Reflection[]> {
  const supabase = createSupabaseServerClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return [];

  const { data, error } = await supabase
    .from("Reflections")
    .select("*")
    .eq("user_id", auth.user.id)
    .order("created_at", { ascending: false })
    .limit(50);

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []) as Reflection[];
}

export default async function ReflectionsPage() {
  const reflections = await loadReflections();

  return (
    <>
      <Nav />
      <main className="mirror-card space-y-6">
        <header className="space-y-2">
          <h1 className="mirror-heading">Past reflections.</h1>
          <p className="mirror-subtle">
            A gentle archive of what you&apos;ve been feeling and thinking.
          </p>
        </header>

        {reflections.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-sky-200 bg-sky-50/50 p-6 text-sm text-slate-500">
            You haven&apos;t saved any reflections yet (or you&apos;re not signed
            in).{" "}
            <Link
              href="/write"
              className="text-sky-600 underline underline-offset-2"
            >
              Start with one small moment.
            </Link>
          </div>
        ) : (
          <ul className="space-y-4">
            {reflections.map((r) => (
              <li
                key={r.id}
                className="rounded-2xl border border-sky-100 bg-white p-4 space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs text-slate-500">
                    {new Date(r.created_at).toLocaleString(undefined, {
                      dateStyle: "medium",
                      timeStyle: "short"
                    })}
                  </p>
                  <div className="flex items-center gap-2">
                    {r.ai_themes && r.ai_themes.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {r.ai_themes.map((t, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-sky-100 px-2.5 py-0.5 text-[11px] text-slate-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <DeleteReflectionButton id={r.id} />
                  </div>
                </div>
                {r.title && (
                  <p className="text-sm font-medium text-slate-800">
                    {r.title}
                  </p>
                )}
                <p className="text-sm text-slate-700 line-clamp-3 whitespace-pre-line">
                  {r.content}
                </p>
                {r.ai_summary && (
                  <p className="text-xs text-slate-600 bg-sky-50 border border-sky-100 rounded-xl px-3 py-2">
                    {r.ai_summary}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}

