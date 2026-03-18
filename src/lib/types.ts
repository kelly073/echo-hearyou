export type Reflection = {
  id: string;
  user_id: string | null;
  title?: string | null;
  content: string;
  created_at: string;
  is_anonymous?: boolean | null;
  ai_summary: string | null;
  ai_questions: string[] | null;
  ai_themes: string[] | null;
};

