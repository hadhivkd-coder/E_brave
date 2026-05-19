# E-Brave Operating System (EOS) — Operational Control Center

E-Brave EOS is a modern, lightweight, startup-focused internal operational system and AI-powered admin control center integrated directly into the E-Brave educational and career guidance ecosystem.

## 🚀 Key Features
- **Operational Intelligence Dashboard:** Core metrics, real-time funnel analytics, task boards, and counseling calendars.
- **Supabase Real-Time Sync:** Fully integrated authentication and PostgreSQL database syncing via WebSockets.
- **Asymmetric Fallback Mode:** Dual-mode state machine that automatically runs offline/mock mode via `localStorage` if local environment variables are unconfigured.
- **Secure AI Edge Functions:** Secure OpenAI GPT-4o-mini integration hosted on Supabase Edge Functions without exposing API keys on the client.
- **Website Analytics Integration:** Built-in dynamic integration for Google Analytics (GA4), Microsoft Clarity, and Meta Pixel.

---

## 🛠️ Tech Stack & Architecture
- **Frontend:** React, Vite, Vanilla CSS (curated high-contrast dark dashboard aesthetics).
- **Backend:** PostgreSQL, Supabase (Auth, Realtime, Edge Functions).
- **AI Model:** OpenAI GPT-4o-mini via secure Edge Functions.

---

## ⚙️ Setting Up Environment Variables

Rename `.env.example` to `.env.local` (or create `.env`) in the root directory:

```env
# Supabase Integration
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key

# WhatsApp Client Link redirects
VITE_WA_NUMBER=919544547861

# Analytics & Marketing Tracking
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_CLARITY_PROJECT_ID=xxxxxxxxxx
VITE_META_PIXEL_ID=xxxxxxxxxxxxxxx
```

---

## 💾 Supabase Setup

### 1. Database Migration
Execute the schema in the Supabase Dashboard SQL Editor:
1. Open your Supabase Project.
2. Go to **SQL Editor** -> **New Query**.
3. Copy the contents of the migration file: `supabase/migrations/20260520_init_schema.sql` and run it.
4. This will create:
   - `profiles` (rbac roles for team members)
   - `leads` (student lead tracking)
   - `students` (enrolled students)
   - `counseling_sessions` (counseling history and scheduling)
   - `webinars` (live event scheduling & conversions)
   - `content` (social media pipelines and metrics)
   - `transactions` (accounts bookkeeping)
   - `tasks` (team operational sprint board)
   - `activity_logs` (security & operations trail)
   - `notifications` (system and AI alerts)

### 2. Edge Function Deployment (EOS AI Engine)
To deploy the secure OpenAI agent route to Supabase:
1. Install the Supabase CLI:
   ```bash
   npm install -g supabase
   ```
2. Log in and link your project:
   ```bash
   supabase login
   supabase link --project-ref your-project-ref
   ```
3. Set your OpenAI API Key securely in the Supabase secrets:
   ```bash
   supabase secrets set OPENAI_API_KEY=your-openai-api-key
   ```
4. Deploy the `eos-ai` function:
   ```bash
   supabase functions deploy eos-ai
   ```

---

## 💻 Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

---

## 🔒 Security Practices
- **Never expose secrets:** Frontend contains zero API keys. All keys (OpenAI, database service roles) are stored server-side in Supabase Secrets or Edge environments.
- **Strict CSP:** Built-in Content Security Policy checks block arbitrary script execution, allowing only verified CDNs for analytics.
- **Row-Level Security (RLS):** All tables are shielded using Postgres policies, restricting read/write access based on authentication state. Hardened in `supabase/migrations/20260521_harden_rls.sql` to isolate financial records to Super Admin/Ops roles, leads/sessions to counselors, and verify that offline users cannot execute actions.
- **Failed Login Lockout:** Accounts are temporarily locked out on the client after 3 consecutive failed authentication attempts, with telemetry alerts logging the client's User-Agent and IP to console/audit streams.
- **Administrative Audit Logging:** Destructive actions (such as lead deletions or rule removals) require typing confirmation values in a unified glassmorphism safety dialog and are recorded in the central `activity_logs` table detailing the actor, action type, entity, and previous states.
- **Prioritized AI Memory (Token Budgets):** Implements dynamic session weights in `EOSMemory.js` to rank and budget relevant context inputs, capping query sizes under a 1,400-character ceiling to control execution costs.
- **Quick Answer Mode:** Supported via a frontend interface toggle, instructing the `eos-ai` Edge Function to bypass verbose multi-section Markdown summaries in favor of direct, token-efficient responses.
