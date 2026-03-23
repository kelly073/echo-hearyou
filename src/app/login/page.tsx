"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/Nav";
import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function sendLink() {
    setIsSending(true);
    setError(null);
    setMessage(null);
    try {
      const supabase = createSupabaseBrowserClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/write`
        }
      });
      if (error) throw error;
      setMessage("Check your email for a sign-in link.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not send link.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <Nav />
      <main className="mirror-card space-y-6">
        <header className="space-y-2">
          <h1 className="mirror-heading">Welcome back.</h1>
          <p className="mirror-subtle">
            Mirror is private by default. Sign in to keep reflections securely
            tied to you — even if you write anonymously inside the app.
          </p>
        </header>

        <section className="space-y-3">
          <input
            className="mirror-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            inputMode="email"
            autoComplete="email"
          />
          <div className="flex flex-wrap gap-2">
            <button
              className="mirror-button-primary"
              onClick={sendLink}
              disabled={!email.trim() || isSending}
              type="button"
            >
              {isSending ? "Sending…" : "Send sign-in link"}
            </button>
            <button
              className="mirror-button-ghost"
              type="button"
              onClick={() => router.push("/")}
            >
              Back
            </button>
          </div>

          {message && (
            <p className="text-xs text-stone-600 bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-2">
              {message}
            </p>
          )}
          {error && (
            <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
              {error}
            </p>
          )}
        </section>
      </main>
    </>
  );
}

