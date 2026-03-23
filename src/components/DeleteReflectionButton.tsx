"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteReflectionButton({ id }: { id: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function onDelete() {
    const ok = window.confirm(
      "Delete this reflection? This can’t be undone."
    );
    if (!ok) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/reflections/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Could not delete.");
      }
      router.refresh();
    } catch (e) {
      const message = e instanceof Error ? e.message : "Could not delete.";
      window.alert(message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <button
      type="button"
      className="mirror-button-ghost text-[11px] px-2 py-1 hover:bg-red-50 hover:text-red-700"
      onClick={onDelete}
      disabled={isDeleting}
      aria-label="Delete reflection"
    >
      {isDeleting ? "Deleting…" : "Delete"}
    </button>
  );
}

