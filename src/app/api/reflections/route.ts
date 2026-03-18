import { NextResponse } from "next/server";
import { analyzeReflection } from "@/lib/openaiReflection";
import type { Reflection } from "@/lib/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET() {
  try {
    const supabase = createSupabaseServerClient();
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }

    const { data, error } = await supabase
      .from("Reflections")
      .select("*")
      .eq("user_id", auth.user.id)
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Could not load reflections." },
        { status: 500 }
      );
    }

    return NextResponse.json(data as Reflection[]);
  } catch (err) {
    console.error("Unhandled error in GET /api/reflections:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const supabase = createSupabaseServerClient();
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) {
      return NextResponse.json({ error: "Not signed in." }, { status: 401 });
    }

    const body = await request.json().catch(() => null);
    const title = typeof body?.title === "string" ? body.title.trim() : "";
    const content =
      typeof body?.content === "string" ? body.content.trim() : "";
    const anonymous =
      typeof body?.anonymous === "boolean" ? body.anonymous : true;

    if (!content) {
      return NextResponse.json(
        { error: "Reflection content is required." },
        { status: 400 }
      );
    }

    // AI is optional: if it fails, we still save the reflection.
    const analysis = await analyzeReflection(content);

    const { data, error } = await supabase
      .from("Reflections")
      .insert({
        user_id: auth.user.id,
        title: title || null,
        content,
        is_anonymous: anonymous,
        ai_summary: analysis?.summary ?? null,
        ai_questions: analysis?.questions ?? null,
        ai_themes: analysis?.themes ?? null
      })
      .select("*")
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        {
          error:
            error.message ||
            "Could not save reflection (check RLS/policies and table name)."
        },
        { status: 500 }
      );
    }

    return NextResponse.json(data as Reflection, { status: 201 });
  } catch (err) {
    console.error("Unhandled error in POST /api/reflections:", err);
    return NextResponse.json(
      { error: "Server error while saving reflection." },
      { status: 500 }
    );
  }
}

