# United Contractors Organisation (UCO) — Website

A full-stack Next.js website for UCO: public content pages, three membership
registration flows with Razorpay payment, a member login/dashboard, and a
custom admin panel for managing members, payments, content, and reports.

Built entirely with free/open-source tools. No paid subscriptions required —
the only recurring cost is Razorpay's standard per-transaction fee (there is
no way to accept online payments without this, regardless of provider).

---

## 1. Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (via Supabase or Neon — both free tier)
- **ORM:** Prisma
- **Auth:** NextAuth.js (credentials-based member login)
- **Payments:** Razorpay
- **Hosting:** Vercel (free tier)

---

## 2. Accounts You Need to Create

| Service | Purpose | Link |
|---|---|---|
| GitHub | Code hosting, connects to Vercel | github.com |
| Vercel | Website hosting | vercel.com |
| Supabase (or Neon) | Free PostgreSQL database | supabase.com |
| Razorpay | Payment gateway (requires business KYC) | razorpay.com |

---

## 3. Local Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy the environment template and fill in real values
cp .env.example .env

# 3. Push the database schema to your Postgres instance
npx prisma db push

# 4. Generate the Prisma client
npx prisma generate

# 5. Run the dev server
npm run dev
```

Visit `http://localhost:3000`.

---

## 4. Environment Variables (`.env`)

See `.env.example` for the full list. You'll need to fill in:

- `DATABASE_URL` — from your Supabase/Neon project settings
- `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
- `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` — from Razorpay Dashboard > Settings > API Keys
- `RAZORPAY_WEBHOOK_SECRET` — set this when you configure the webhook (step 6 below)

---

## 5. Making Your First Admin Account

There's no public "sign up as admin" — this is intentional for security.
After you register as a member once through the site (e.g. via "Become a
Member"), promote yourself to admin directly in the database:

```sql
UPDATE "Member" SET "isAdmin" = true WHERE email = 'your-email@example.com';
```

Run this in Supabase's SQL editor (Table Editor > SQL). You can then log in
at `/login` and access `/admin`.

---

## 6. Configuring the Razorpay Webhook

1. Deploy the site first (see step 7) so you have a live URL.
2. In Razorpay Dashboard → Settings → Webhooks → Add New Webhook.
3. URL: `https://yourdomain.com/api/payment-webhook`
4. Active events: `payment.captured`, `payment.failed`
5. Copy the "Webhook Secret" shown there into `RAZORPAY_WEBHOOK_SECRET` in
   your Vercel environment variables (see step 7).

Without this step, payments will process in Razorpay but member status won't
automatically update to "Active" — the webhook is what closes that loop.

---

## 7. Deploying to Vercel

1. Push this project to a GitHub repository.
2. Go to vercel.com → New Project → import your GitHub repo.
3. Add all variables from `.env` into Vercel's Environment Variables settings.
4. Deploy.
5. In your Hostinger domain dashboard, update DNS:
   - Add an `A` record pointing `@` to Vercel's IP (Vercel shows this after
     you add your domain in Project Settings → Domains), or
   - Add a `CNAME` record pointing `www` to `cname.vercel-dns.com`
6. Add your domain in Vercel's Project Settings → Domains and follow their
   verification steps.

---

## 8. What's Placeholder vs. Real Content

**Real content already in place** (from your brochure): About UCO text,
Vision & Mission, Core Values, Why UCO, Membership tiers, HQ address and
contact details.

**Placeholder — replace via `/admin`:**
- NEC members (currently "To Be Updated" placeholders)
- State/Regional chapter list
- Membership fee amounts (currently ₹5,000 / ₹7,500 / ₹25,000 — edit in
  `app/become-member/page.js`, `app/contractor-registration/page.js`,
  `app/corporate-membership/page.js`)
- Gallery images (currently stock placeholder photos)
- News, Notifications, Training, Conference posts (empty until added)
- Downloads (empty until added)

---

## 9. Project Structure

```
app/                    → pages (routes) and API routes
  admin/                → protected admin panel (members, payments, reports, content)
  api/                  → registration, payment, auth, support-request endpoints
components/             → shared UI components
lib/
  prisma.js             → Prisma client singleton
  admin-actions.js       → server actions used by admin panel forms
prisma/
  schema.prisma          → full database schema
public/images/           → logo and static images
```

---

## 10. Known Limitations / Next Steps

- Image/file uploads currently expect a URL (paste a link after uploading to
  Supabase Storage manually). A direct upload widget can be added later.
- Email confirmations (registration receipt, payment receipt) are not yet
  wired up — can be added with Resend's free tier.
- The Contact Us form currently doesn't send anywhere — needs an API route
  + email service to actually deliver messages.
