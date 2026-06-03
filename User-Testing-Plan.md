# Whop Tasks — User Testing Plan (n = 50)

> **Purpose:** Validate the product bet and v1 flows from [Tasks-Strategy.md](./Tasks-Strategy.md): *“Do this, get paid”* beats *“build an audience”* for first-dollar earners, while the **trust spine** and **feed loop** hold up in real use.

---

## 1. What we are trying to learn (research questions)

| # | Question | Strategy link |
|---|------------|---------------|
| R1 | Can someone who is **not** positioning as a creator find a task, understand it, and feel confident they will **not work for free**? | Doer journey: Discover → Decide; trust spine |
| R2 | Is **“done”** obvious before they start? (Brief clarity → fewer bad submissions / less anxiety.) | Design principle: clarity; owner pain on review |
| R3 | How fast does a new user reach **“I submitted”** and **“I believe I’ll get paid”**? | First dollar fast; time-to-first-payout (perceived) |
| R4 | Does **escrow / “funds locked”** (or equivalent) change willingness to start vs. a generic gig listing? | Trust spine |
| R5 | After submit, is status (**submitted → review → paid**) understandable, or does it feel like a black hole? | Doer emotional arc |
| R6 | Does **feed output** from completed tasks make earning feel social / discoverable, or is Tasks perceived as a siloed job board? | The loop; “every task feeds the feed” |
| R7 | (If owner flow is in scope) Can a business-minded participant **draft, fund, and imagine reviewing** a task without confusion? | Journey B |
| R8 | What **failure modes** show up: empty feed, distrust, “not for me,” unclear payout, format friction? | Risks section |

---

## 2. Participant mix (50 people)

Aim for **segments**, not 50 identical users. Suggested quotas (adjust if recruitment is hard):

| Segment | n (suggested) | Why |
|---------|----------------|-----|
| **Aspirational earner** — wants side income, little/no creator audience | 18 | Core bet: “not a creator” path |
| **Casual creator** — posts sometimes, inconsistent monetization | 12 | Bridge from content-rewards mental model |
| **Small business / community owner** (could post tasks) | 10 | Journey B + supply side |
| **Power user / gig-experienced** (Fiverr, MTurk, Discord mods, etc.) | 6 | Benchmark trust & clarity vs. competitors |
| **Whop-curious / new to Whop** (if you can recruit) | 4 | Cold comprehension |

**Screening (minimum):**
- Age / region as required by legal & product.
- “Have you earned money online before?” (Y/N — stratify analysis.)
- “Do you consider yourself a creator?” (Y/N — aligns to strategy.)

**Exclusion (only if needed for this study):** employees/partners who designed the prototype (avoid biasing qualitative themes; they can do a separate dogfood session).

---

## 3. Study format

| Element | Recommendation |
|---------|------------------|
| **Mode** | Moderated remote (Zoom + screen share) **or** in-lab; 30–45 min per session |
| **Artifact** | Current prototype / build (e.g. discover → qualify → task list → detail → submit → done + feed) |
| **Tasks for the participant** | 1 **think-aloud** walkthrough of **doer** path + optional short **owner** scenario (script below) |
| **Data** | Session recording (with consent), notes, optional **post-task survey** (5–7 min) |

**Why 50?**  
- Qualitative: ~40–50 sessions usually **saturate** major usability themes for a single flow family (diminishing returns on “new” issues).  
- Quantitative: 50 is enough for **directional** survey scores (e.g. SEQ, trust Likert); not a substitute for analytics at scale, but useful for comparing variants A/B later.

---

## 4. Key things to test (moderator checklist)

Use this as a **live checklist** during each session. Tick what you observed; add timestamps.

### 4.1 Discovery (Criterion 1 — “Is finding a task easy?”)

- [ ] User finds the **Tasks / earn** entry without leading (“Where would you go to make money here?”).
- [ ] User understands **what a task is** vs. feed post vs. reward clip (terminology).
- [ ] **Payout, time, difficulty** (or proxies) are noticed **before** opening a task, if shown on cards.
- [ ] Empty or sparse list: reaction and **next step** (bounce vs. filter vs. search).

### 4.2 Decide / trust (Never work for free)

- [ ] User articulates **what they get paid** and **when** (before starting).
- [ ] **Approval rules** are found and interpreted (pass/fail: can they repeat them back?).
- [ ] **Escrow / funds secured** signal (if present): noticed, ignored, or confusing.
- [ ] **Slots / scarcity** (# left): helps urgency vs. creates anxiety.

### 4.3 Do + submit (Criterion 2 — “Can they do + submit easily?”)

- [ ] Brief + examples: enough to produce a **plausible** submission in-session (or they state what they’d upload).
- [ ] **Format** expectations clear (link vs. file vs. text).
- [ ] Friction points: back navigation, losing state, too many steps, jargon.
- [ ] **Submit** action discoverable; confirmation of **“under review”** understood.

### 4.4 Post-submit + payout perception

- [ ] User can describe **next state** (who acts, how long, what if rejected).
- [ ] **Rejection + reason + resubmit** (if shown): fair vs. punitive framing.

### 4.5 Feed + loop (Criterion 4 — “Does it feed discovery?”)

- [ ] User notices **task output** on the feed (if in build).
- [ ] Does completed output increase **interest to try** a task? (1–5 or open response.)

### 4.6 Owner path (if in prototype — Criterion 3)

- [ ] **Template** selection makes sense vs. blank slate.
- [ ] **Budget / escrow** step: understandable commitment.
- [ ] User imagines **review queue** (approve/reject) without despair (“too much work”).

---

## 5. Session script (high level)

**Intro (3 min)**  
Purpose, think-aloud (“say everything you’re thinking”), right to stop, recording consent.

**Context (2 min)**  
“You heard you can make money on Whop without building a big following. You opened the app today to try.”

**Scenario 1 — Doer (15–22 min)**  
1. “Show me how you’d **find something to do** to get paid.”  
2. Pick **one** task (or assign one if list is thin). “Read this as if you’re about to do it tonight. **What would ‘done’ look like?**”  
3. “Go as far as you can to **submit**.” (Use fake assets if needed.)  
4. “**What happens next?** Who has your money?”  
5. Probe: “Anything that would make you **not** start?” / “What would make you **trust** this?”

**Scenario 2 — Owner (8–12 min, optional)**  
“You run a small brand and want **10 short testimonials**. Walk me through how you’d **set that up** and what you’d worry about.”

**Debrief (5–8 min)**  
- One thing that felt **clearest** / **most confusing**.  
- 0–10: “How likely are you to **try a real task** this week?” (custom intent)  
- Comparison: “How is this different from **Instagram / Fiverr / Discord** for earning?”

---

## 6. What to evaluate (rubrics & signals)

### 6.1 Per-session usability (quick scoring)

After each session, score **1–5** (or pass/fail) where 5 = no issue:

| Dimension | Definition |
|-----------|------------|
| **Findability** | Found earning/tasks path quickly |
| **Comprehension** | Correct mental model of task, payout, approval |
| **Confidence** | Expressed trust they’d get paid if they did quality work |
| **Efficiency** | Few errors / backtracks to complete flow |
| **Satisfaction** | Would recommend or return (from behavior + verbatim) |

**Red-flag behavior (count across 50):** gave up, “scam” language, couldn’t state payout, couldn’t state what “done” means, silent confusion >20s on money/approval.

### 6.2 Strategy-aligned outcomes (aggregate from 50)

Map findings to the **North Star** and **four criteria** from the strategy doc:

| Strategy metric / criterion | User-test proxy (what you measure in UT) |
|-----------------------------|--------------------------------------------|
| **North Star** (first $ via Tasks / week — product analytics) | Intent: “Likely to try a task this week” + qualitative “I’d come back for another” |
| **C1 Discovery** | Time to **first meaningful task card** opened; # of misclicks; quotes on “nothing for me” |
| **C2 Completion** | Task list → detail → submit **completion rate** in test; friction tags |
| **C3 Supply (owners)** | Owner scenario **completion**; confusion on escrow/templates |
| **C4 Loop** | Noticed feed artifacts; stated **discovery** value of others’ payouts |

### 6.3 Optional standardized scales (post-session survey)

Pick 1–2 to keep surveys short:

- **SEQ (Single Ease Question):** “Overall, this task was easy to complete” — 1–7.  
- **Trust (3 items, 1–5):** “I understood how I would get paid” / “I felt the platform would protect me from doing unpaid work” / “The rules for approval were clear.”

---

## 7. Analysis plan (after 50 sessions)

1. **Affinity map** of issues (navigation, copy, trust, brief clarity, submit, status).  
2. **Severity:** critical (blocks earning / trust) → high → medium → low.  
3. **Segment cuts:** creator vs non-creator; prior online earnings Y/N; owner vs non-owner.  
4. **Theme saturation:** stop adding new codes when last ~5 sessions add no new **critical** themes (document anyway).  
5. **Recommendations:** tie each fix to strategy principle (#1 first dollar, #2 never free, #3 clarity, #4 feed loop, #5 pay for outcomes).

---

## 8. Counter-metrics to watch in sessions (strategy §10)

Track **counts** or **% of sessions** where these appear:

| Counter-metric | Example signal |
|----------------|----------------|
| “Didn’t get paid” / scam fear | Verbatim |
| Rejection feels unfair | Reaction to reject copy or scenario |
| “Empty” / nothing relevant | Empty state behavior |
| Bot / too-easy game | User jokes they’d spam low effort |

---

## 9. Deliverables

- **Top 10 findings** ranked by severity + frequency.  
- **Clip reel** (optional) of 8–12 trust / clarity moments for stakeholders.  
- **One-pager** mapping findings → v1 scope (prototype list in strategy §12).  
- **Appendix:** screening counts, segment table, raw survey CSV.

---

## 10. Ethics & logistics

- **Consent:** record, how data is stored, incentive disclosure.  
- **Incentives:** align to study length (e.g. gift card); avoid paying **only** in product credits if that biases “trust” answers—disclose if mixed.  
- **Accessibility:** offer alternative input if participants cannot screen share.

---

*This plan is aligned with [Tasks-Strategy.md](./Tasks-Strategy.md) (doer/owner journeys, trust spine, loop, success metrics, and v1 prototype scope). Update Section 4 when the build adds owner tools, real escrow, or woven feed cards.*
