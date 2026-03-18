"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/Nav";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

type ReflectionResponse = {
  id: string;
  title?: string | null;
  ai_summary: string | null;
  ai_questions: string[] | null;
  ai_themes: string[] | null;
};

export default function WritePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reflection, setReflection] = useState<ReflectionResponse | null>(null);
  const [isAuthed, setIsAuthed] = useState<boolean | null>(null);

  // lightweight auth check (keeps UX simple for MVP)
  if (isAuthed === null) {
    Promise.resolve()
      .then(async () => {
        const supabase = createSupabaseBrowserClient();
        const { data } = await supabase.auth.getUser();
        setIsAuthed(!!data.user);
      })
      .catch(() => setIsAuthed(false));
  }

  async function handleSave() {
    if (!isAuthed) {
      router.push("/login");
      return;
    }
    setIsSaving(true);
    setError(null);
    setReflection(null);

    try {
      const res = await fetch("/api/reflections", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          anonymous: isAnonymous
        })
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong.");
      }

      const json = (await res.json()) as ReflectionResponse;
      setReflection(json);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Could not save reflection.";
      setError(message);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
      <Nav />
      <main className="mirror-card space-y-6">
        <header className="space-y-2">
          <h1 className="mirror-heading">Write what feels true today.</h1>
          <p className="mirror-subtle">
            This space is just for you. There is no right way to write — you
            can ramble, be specific, or simply notice how you feel.
          </p>
        </header>

        <section className="space-y-3">
          {isAuthed === false && (
            <div className="rounded-2xl border border-sky-100 bg-sky-50/50 p-4 text-sm text-slate-600">
              To save reflections privately, please{" "}
              <button
                type="button"
                className="text-sky-600 underline underline-offset-2"
                onClick={() => router.push("/login")}
              >
                sign in
              </button>
              .
            </div>
          )}
          <input
            className="mirror-input"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={120}
          />
          <textarea
            className="mirror-textarea min-h-[220px]"
            placeholder='Start wherever you are. For example: "Lately I’ve been noticing..."'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <button
                type="button"
                onClick={() => setIsAnonymous((v) => !v)}
                className="mirror-button-ghost px-2 py-1 text-[11px]"
              >
                {isAnonymous ? "Anonymous mode on" : "Anonymous mode off"}
              </button>
              <span className="text-[11px] text-slate-500">
                Anonymous mode avoids linking reflections to an identity.
              </span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="mirror-button-ghost"
                onClick={() => router.push("/")}
              >
                Cancel
              </button>
              <button
                type="button"
                className="mirror-button-primary"
                onClick={handleSave}
                disabled={!content.trim() || isSaving || isAuthed === false}
              >
                {isSaving ? "Saving..." : "Save & reflect"}
              </button>
            </div>
          </div>
          {error && (
            <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2">
              {error}
            </p>
          )}
        </section>

        {reflection && (
          <section className="mt-4 space-y-4 rounded-2xl border border-sky-100 bg-sky-50/70 px-4 py-4">
            <h2 className="text-sm font-medium text-slate-800">
              A gentle reflection
            </h2>
            {reflection.title && (
              <p className="text-sm font-medium text-slate-800">
                {reflection.title}
              </p>
            )}
            {reflection.ai_summary && (
              <p className="text-sm text-slate-700">
                {reflection.ai_summary}
              </p>
            )}
            {reflection.ai_questions && reflection.ai_questions.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Questions to sit with
                </p>
                <ul className="space-y-1.5">
                  {reflection.ai_questions.map((q, i) => (
                    <li
                      key={i}
                      className="text-sm text-slate-700 flex gap-2 items-start"
                    >
                      <span className="mt-[5px] h-1.5 w-1.5 rounded-full bg-sky-500" />
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {reflection.ai_themes && reflection.ai_themes.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Themes that appear here
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {reflection.ai_themes.map((t, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-sky-100 px-3 py-1 text-[11px] text-slate-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </>
  );
}

