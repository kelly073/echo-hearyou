## Echo – AI-assisted reflective journaling

Echo is a calm, minimal web app for reflective writing. Instead of
optimizing for content or an audience, it helps you write for yourself and
receive gentle AI reflections back.

### Stack

- **Frontend**: Next.js (App Router) + React + Tailwind
- **Backend**: Supabase (Auth + Postgres) with Row Level Security (RLS)
- **AI**: OpenAI API (chat completions)

### Core flows in this MVP

- **Home**: Intro to the concept (`/`)
- **Login**: Email magic-link sign-in (`/login`)
- **Write**: Quiet journaling space that saves a reflection and calls AI (`/write`)
- **Reflections**: Your past reflections (`/reflections`)
- **Insights**: Lightweight aggregation of your recurring themes (`/insights`)

### Environment variables

Create `.env.local` in the repo root (same folder as `package.json`):

```bash
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
OPENAI_API_KEY=...
```

### Database schema (Supabase SQL Editor)

Run:

```sql
create table if not exists "Reflections" (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now(),
  is_anonymous boolean not null default true,
  ai_summary text null,
  ai_questions text[] null,
  ai_themes text[] null
);

alter table "Reflections" enable row level security;

create policy "Users can read own reflections"
on "Reflections" for select
using (auth.uid() = user_id);

create policy "Users can insert own reflections"
on "Reflections" for insert
with check (auth.uid() = user_id);

create policy "Users can delete own reflections"
on "Reflections" for delete
using (auth.uid() = user_id);
```

### Run locally

```bash
npm install
npm run dev
```

Open the URL Next prints (usually `http://localhost:3000`).

### Notes

- **Psychological safety**: no likes, followers, or public metrics.
- **AI as an echo**: summarizing emotions, asking gentle questions, suggesting themes.
- **Anonymous mode**: reflections are still stored under your account for privacy and RLS, but the UI can treat them as “anonymous” via `is_anonymous`.

