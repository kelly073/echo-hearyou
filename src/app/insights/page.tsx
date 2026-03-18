import { Nav } from "@/components/Nav";
import type { Reflection } from "@/lib/types";

export const dynamic = "force-dynamic";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function loadReflections(): Promise<Reflection[]> {
  const supabase = createSupabaseServerClient();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) return [];

  const { data, error } = await supabase
    .from("Reflections")
    .select("*")
    .eq("user_id", auth.user.id)
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) {
    console.error(error);
    return [];
  }

  return (data ?? []) as Reflection[];
}

export default async function InsightsPage() {
  const reflections = await loadReflections();
  const themeCounts = new Map<string, number>();

  for (const r of reflections) {
    for (const t of r.ai_themes ?? []) {
      const key = t.trim();
      if (!key) continue;
      themeCounts.set(key, (themeCounts.get(key) ?? 0) + 1);
    }
  }

  const themes = Array.from(themeCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 12)
    .map(([label, occurrences]) => ({ label, occurrences }));

  return (
    <>
      <Nav />
      <main className="mirror-card space-y-6">
        <header className="space-y-2">
          <h1 className="mirror-heading">Gentle patterns over time.</h1>
          <p className="mirror-subtle">
            These themes are not diagnoses or labels. They&apos;re soft hints
            about what your inner life has been circling around lately.
          </p>
        </header>

        {themes.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-sky-200 bg-sky-50/50 p-6 text-sm text-slate-500">
            As you write more reflections, Mirror will quietly notice recurring
            themes and surface them here.
          </div>
        ) : (
          <section className="space-y-4">
            <p className="text-xs text-slate-500">
              Based on {reflections.length} saved reflections.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {themes.map((t) => (
                <div
                  key={t.label}
                  className="rounded-2xl border border-sky-100 bg-white px-4 py-3 flex items-center justify-between shadow-sm"
                >
                  <span className="text-sm text-slate-800">{t.label}</span>
                  <span className="text-xs text-slate-500">
                    {t.occurrences} reflection
                    {t.occurrences === 1 ? "" : "s"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}

