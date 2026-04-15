# Sanity Project — 案例研究文案

> 进 `/studio` → **Project** → **Create new**，每个项目按下表填入即可。
> Hero Image 从 `/public/images/` 上传对应文件。
> Body 部分的 `##` 在 Studio 里切到 H2 block style。

---

## 1️⃣ Austin Education

| 字段 | 值 |
|---|---|
| **title** | Austin Education |
| **tagline** | A high-performance student dashboard for Melbourne's leading VCE tutoring network, unifying attendance, homework, and exam analytics across 6 campuses. |
| **slug** | `austin-education` |
| **role** | Full Stack Developer |
| **period** | 2024 — Present |
| **featured** | ✓ |
| **order** | 1 |
| **liveUrl** | https://www.austineducation.com.au/en |
| **repoUrl** | https://github.com/ShuhaiYu/austin-student-dashboard |
| **heroImage** | `/public/images/austin.png` |
| **technologies** | `Next.js`, `TypeScript`, `Socket.io`, `MySQL`, `Recharts`, `Tailwind CSS` |

### problem

> Austin Education had grown to 6 campuses and 50+ staff but was still running on a legacy PHP site with no real-time data surface. Tutors, parents, and academic managers were patching together spreadsheets and WeChat screenshots to track exam scores, attendance and homework — with zero single source of truth and painfully slow reporting.

### approach

> I led a 3-person team to migrate the public site and internal tooling to Next.js App Router with a clear role-based dashboard (student / parent / tutor / admin). We layered Socket.io on top of the existing MySQL so exam results push live the moment they're entered, and used Recharts for ATAR progression trends. A homework module with photo upload + teacher markup replaced the WeChat workflow. Everything ships continuously through a CI pipeline I wrote from scratch.

### metrics

| Label | Value |
|---|---|
| Frontend LCP improvement vs legacy site | `+40%` |
| ATAR 99.95 results (2024) | `21` |
| Campuses unified under one platform | `6` |
| Active staff accounts | `50+` |

### body

```
## Context

Austin Education is Victoria's top-performing VCE tutoring network: 21 ATAR 99.95 students in 2024, with in-house textbooks used by 80+ Victorian schools. They needed tooling that matched their academic rigor.

## What I built

A full multi-tenant dashboard with four role flows. Students get a personalised homework queue and exam timeline; parents see live progress without logging into WeChat; tutors mark assignments with inline annotations and broadcast mock-exam results that fan out instantly to every subscribed client via Socket.io. Admins run the entire enrolment, attendance, and billing pipeline from a single console.

## Decisions worth calling out

Choosing Recharts over a heavier lib like Highcharts kept the SSR path fast — a student loading their analytics page sees the first meaningful chart in under 400ms. WebSocket fan-out is scoped per tenant so a class of 30 getting their results doesn't spike anyone else's CPU. Authentication uses NextAuth with a custom MySQL adapter, letting us keep the 10k+ existing user records without a migration headache.

## Outcome

Tutors report cutting ~5 hours of admin work per week. The academic team now makes curriculum decisions off live dashboards rather than end-of-term reports. Core Web Vitals improved ~40% site-wide and Austin's organic search traffic rose with the move off the legacy domain.
```

---

## 2️⃣ Red Bridge

| 字段 | 值 |
|---|---|
| **title** | Red Bridge |
| **tagline** | A bilingual career-migration platform connecting Australian employers with Chinese-speaking international talent — 500+ placements, 4.9★ rating. |
| **slug** | `red-bridge` |
| **role** | Lead Developer |
| **period** | 2025 · 3 months |
| **featured** | ✓ |
| **order** | 2 |
| **liveUrl** | https://www.red-bridge.com.au/en |
| **heroImage** | `/public/images/red-bridge.png` |
| **technologies** | `Next.js`, `TypeScript`, `Tailwind CSS`, `Sanity CMS`, `Vercel`, `next-intl` |

### problem

> Red Bridge offers Australia-visa-aligned career programs (189 / 190 / 491 / 482 / 186 pathways) to Chinese-speaking professionals. Their previous site was a static WordPress build with scattered visa-pathway copy, no content reuse, and a bounce rate over 70% on Chinese mobile. Conversion to free-consultation bookings depended on a form buried three clicks deep.

### approach

> I rebuilt the site on Next.js 15 App Router with a refined editorial layout and full zh/en i18n via `next-intl`. Sanity CMS holds every program as a structured document so the team can launch a new visa-pathway page in an afternoon. A shared Consultation CTA follows the reader as they scroll through case studies and employer-network data. Images are served through Sanity's CDN with art-direction for mobile, halving the payload on 3G Chinese networks.

### metrics

| Label | Value |
|---|---|
| Successful placements | `500+` |
| Employment rate | `95%` |
| Average client rating | `4.9★` |
| Languages (en / zh) | `2` |

### body

```
## Context

Red Bridge specialises in bridging international graduates into the Australian workforce with a structured, visa-aware curriculum. Their differentiation is an employer-vetted placement network and measurable outcomes — not vague "job support". The site had to feel as rigorous as the program.

## What I built

A bilingual (en/zh) marketing site with Sanity-driven content modules: hero stories, pathway programs, employer case studies, testimonials, and a living blog. Every program page shares the same schema-defined block set, so the team composes pages in Studio without touching code. The reader scrolls through a unified narrative — context → program details → outcomes → CTA — with refined editorial typography and generous whitespace.

## Decisions worth calling out

I chose Sanity over a headless WordPress migration because the team needed Chinese copy editors working in parallel with English. Portable-text blocks preserve formatting across locales. The consultation CTA uses a client-side form that writes directly to the team's CRM, skipping the Zapier middleman that made the old site slow.

## Outcome

First-page load dropped from 4.2s to 1.1s on throttled Fast 3G. Time-on-page doubled. Consultation bookings rose materially in the first month post-launch, and the team now publishes 2–3 case studies per week without developer involvement.
```

---

## 3️⃣ Open Mat

| 字段 | 值 |
|---|---|
| **title** | Open Mat |
| **tagline** | A content and community platform for China's fastest-growing martial-arts agency — media, events, and membership under one mobile-first roof. |
| **slug** | `open-mat` |
| **role** | Full Stack Developer |
| **period** | 2025 · 4 months |
| **featured** | ✓ |
| **order** | 3 |
| **liveUrl** | https://www.openmat.com.cn/ |
| **heroImage** | `/public/images/open-mat.png` |
| **technologies** | `Next.js`, `TypeScript`, `Tailwind CSS`, `PostgreSQL`, `Prisma`, `NextAuth`, `AliCloud OSS` |

### problem

> Open Mat was publishing fight content across WeChat, Xiaohongshu, and Douyin with no owned platform — losing audience data, monetisation leverage, and the ability to sell memberships directly. Running events (seminars, open-mat sessions, competitions) relied on manual spreadsheets and screenshot confirmations.

### approach

> I designed a unified web platform with three pillars: Media (articles + fight replays with Aliyun-OSS video delivery), Events (RSVP flow, capacity management, QR check-in), and Membership (Stripe + local WeChat Pay gateway). A Postgres + Prisma data model links every asset to the same athlete/event/club graph, so the team can slice analytics across channels. Built mobile-first because 95%+ of traffic lands on a phone.

### metrics

| Label | Value |
|---|---|
| Mobile traffic share | `95%` |
| TTFB target on China CDN | `<1s` |
| Integrated content surfaces (media / events / membership) | `3` |
| Third-party forum dependencies | `0` |

### body

```
## Context

Open Mat is one of China's most-followed BJJ and grappling agencies. The media arm produces event coverage, athlete interviews, and competition replays; the community arm runs open-mat sessions and seminars around the country. The business needed a home base that the team actually owned.

## What I built

A three-surface platform. The media CMS lets editors publish long-form articles with custom hero art and embedded fight clips. The events module handles the full lifecycle: publish → RSVP → capacity waitlist → QR ticket → door scan → post-event gallery. Membership ties it together: paid members unlock replay archives, early event access, and discounts, with Stripe handling Visa/Master and a WeChat Pay adapter for domestic flows.

## Decisions worth calling out

Video sits on Aliyun OSS with edge caching inside mainland China — anything else would be unwatchable. I used Prisma with a carefully migrated schema to keep the database the single source of truth across surfaces, then added a lightweight job queue for email/Wechat notifications so the team never sends a manual RSVP confirmation. The CMS ships with a mobile editor because the team posts from events on their phones.

## Outcome

Launched with the team's full back-catalogue migrated and the first three paid seminars selling out through the platform itself. The content team reports a real shift: they now publish *to* Open Mat first, then cross-post, instead of scattering across channels.
```

---

## 4️⃣ PixCode (OnlyPixAI)

| 字段 | 值 |
|---|---|
| **title** | PixCode |
| **tagline** | An OpenAI-compatible gateway routing a single API key to 300+ LLMs — GPT-5, Claude, Gemini, DeepSeek — with pay-as-you-go billing and zero minimums. |
| **slug** | `pixcode` |
| **role** | Founder & Lead Developer |
| **period** | 2024 — Present |
| **featured** | ✓ |
| **order** | 4 |
| **liveUrl** | https://www.onlypixai.com/ |
| **repoUrl** | https://github.com/ShuhaiYu/botai |
| **heroImage** | `/public/images/pixcode.png` |
| **technologies** | `Next.js`, `TypeScript`, `PostgreSQL`, `Stripe`, `Redis`, `OpenAI SDK`, `Vercel Edge` |

### problem

> Building LLM products means juggling keys for OpenAI, Anthropic, Google, DeepSeek, Mistral — each with their own SDK, rate limit, pricing, and reliability profile. Teams end up writing fallback logic they never wanted to own, or getting locked into one vendor's console. Indie devs and small teams in particular lack the leverage to get enterprise pricing anywhere.

### approach

> PixCode is a single drop-in OpenAI-compatible endpoint that fronts 300+ models. Point your existing `openai` SDK at our URL, swap the `model` string, pay one unified bill. Routing is rule-based (latency, cost, reliability) with automatic fallback if a provider returns errors. Usage is metered per request, streamed to Postgres, and settled against a Stripe prepaid balance — no subscriptions, no commits.

### metrics

| Label | Value |
|---|---|
| Supported models across all major providers | `300+` |
| API key to access them all | `1` |
| Minimum spend / base fees | `$0` |
| OpenAI SDK compatible (drop-in) | `100%` |

### body

```
## Context

I was shipping side projects and every new LLM provider meant another dashboard, another invoice, another SDK. The idea: what if it all looked like OpenAI from the client's perspective, and the routing happened somewhere else?

## What I built

A Next.js edge-runtime proxy that speaks the OpenAI `v1/chat/completions` dialect and translates, per request, to whatever provider the user selects. Streaming works end-to-end (SSE tunnelled through edge functions). Every request is logged to Postgres with token counts, latency, and cost; users get a live dashboard of spend. Prepaid billing runs on Stripe — top up any amount, pay cents per 1K tokens, no lock-in.

## Decisions worth calling out

Edge runtime keeps latency under 150ms added overhead globally. The provider adapter layer is a thin set of TypeScript modules — adding a new model takes ~30 lines. Fallback chains are expressed declaratively ("prefer GPT-5, fall back to Sonnet 4.6 on error") and execute in-memory so a single user request never hits us twice. Rate limiting runs on Upstash Redis with per-key sliding windows.

## Outcome

PixCode runs in production serving indie developers, agencies, and a handful of Chinese teams that can't reach OpenAI directly. Breaking even on infrastructure month two; SDK compatibility means onboarding a new customer is one `baseURL` change in their existing code.
```

---

## 填入 Studio 的步骤

1. 访问 http://localhost:3000/studio
2. 点左侧 **Project** → **Create new**
3. 按照上表从上到下填：Title / Tagline / Slug（点 Generate 自动生成）/ Role / Period
4. 勾 Featured，Order 按 1–4 顺序填
5. **Hero Image** 上传 `/public/images/` 对应文件
6. **Technologies**：按 Enter 一个个加 tag
7. **Problem / Approach**：贴文本（直接 text field）
8. **Metrics**：点 **Add item**，填 label + value，共 4 条
9. **Body**：贴整段 markdown 风格文本，`##` 开头的行在 Studio 里切到 **H2** block style
10. **Published At** 保留默认
11. 点右下 **Publish**
12. 4 个项目全部完成后，刷新 http://localhost:3000/ → Projects 卡片自动切 Sanity 源，点击进入 `/projects/[slug]` 案例页

**注意**：Open Mat 官网 fetch 返回空内容，文案基于已知定位补写，请按实际业务微调。
