import OpenAI from "openai";

const openaiApiKey = process.env.OPENAI_API_KEY;
const client = openaiApiKey ? new OpenAI({ apiKey: openaiApiKey }) : null;

export type ReflectionAnalysis = {
  summary: string;
  questions: string[];
  themes: string[];
};

export async function analyzeReflection(
  content: string
): Promise<ReflectionAnalysis | null> {
  if (!client) return null;

  let responseContent = "";
  try {
    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      temperature: 0.5,
      messages: [
        {
          role: "system",
          content:
            "You are a calm, psychologically safe reflection companion. You do not give advice, diagnose, or judge. You mirror emotions and ask open questions."
        },
        {
          role: "user",
          content: [
            "Return JSON only with this shape:",
            '{ "summary": string, "questions": string[], "themes": string[] }',
            "",
            "Guidelines:",
            "- summary: 1–2 validating sentences about emotional tone (no advice)",
            "- questions: 2–3 open reflection questions",
            "- themes: 1–3 soft themes, 1–3 words each",
            "",
            "Reflection:",
            content
          ].join("\n")
        }
      ],
      response_format: { type: "json_object" }
    });

    responseContent = response.choices[0]?.message?.content ?? "";
  } catch (err) {
    console.error("OpenAI reflection analysis failed:", err);
    return null;
  }

  try {
    const parsed = JSON.parse(responseContent) as ReflectionAnalysis;
    return {
      summary: typeof parsed.summary === "string" ? parsed.summary : "",
      questions: Array.isArray(parsed.questions) ? parsed.questions : [],
      themes: Array.isArray(parsed.themes) ? parsed.themes : []
    };
  } catch {
    return null;
  }
}

