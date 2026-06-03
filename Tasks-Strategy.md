# Whop Tasks — Strategy & Structure

> **The bet in one line:** Most people who join Whop to "make money" never do — because the only paths (clipping, content rewards) assume you're a creator. **Tasks** gives everyone a low-skill, paid thing to do, pays out the business by getting real work done, and routes the output back into the feed so it fuels discovery. One feature, three wins.

---

## 1. Why now / the problem

Whop's promise is "come here and make money." For a creator that's true. For everyone else, the funnel looks like:

> join → look around → no obvious way to earn → never earn → churn

That broken first dollar is the real problem. It's not a content problem — it's an **"I don't know what to do and I'm not a creator" problem.** People don't need another content tool; they need an assignment with a clear payout.

**Tasks reframes earning from "build an audience" to "do this, get paid."** That's the lowest-barrier first dollar Whop can offer.

---

## 2. Who we're actually serving (3 actors, not 2)

| Actor | Wants | Their definition of "it worked" |
|---|---|---|
| **Task-doer** (the earner) | A clear thing to do, fair pay, fast payout, no risk of doing work for free | "I found a task I could do, did it, got paid — fast." |
| **Business owner** (the poster) | Real work / output / reach, without managing freelancers | "I posted once, got quality submissions, paid only for good ones." |
| **Whop / the platform** (the third, silent actor) | Output that feeds the feed → discovery → more users → more GMV | "Every completed task left something behind that pulls the next person in." |

> The third actor is the one most people forget. If a task gets done but leaves nothing on the feed, you've built a freelancer marketplace, not a **loop**. The loop is the whole point.

---

## 3. The loop (the strategic core)

```
  Business owner posts a task ($)
            │
            ▼
   Task-doer discovers it ──────────┐
            │                       │  (easy discovery = more doers)
            ▼                       │
   Task-doer completes + submits    │
            │                       │
            ▼                       │
   Owner approves → doer paid ($)   │
            │                       │
            ▼                       │
   Output posts to the feed ────────┘
            │
            ▼
   Feed pulls in NEW users ──► some become doers ──► some become owners
            │
            ▼
        GMV up ──► owners fund more tasks ──► loop tightens
```

**Read the loop as a flywheel, not a funnel.** Every completed task should do two jobs: pay someone *and* leave an artifact on the feed that recruits the next person. Design decisions that break the second job (private tasks, no shareable output) leak the flywheel.

---

## 4. Design principles (the lens for every decision)

1. **First dollar fast.** A new user should reach "task submitted" in minutes, not after building a profile or audience. Time-to-first-payout is the metric that matters most.
2. **Never work for free.** The #1 trust killer in any task market is "I did it and got ghosted." Money is escrowed up front; rules for approval are visible before you start.
3. **Clarity is the product.** A task is only as good as its brief. If the doer can't tell what "done" means, the system breaks on both sides (bad submissions, angry owners).
4. **Every task feeds the feed.** Default tasks toward shareable output. Private/no-output tasks are allowed but de-prioritized — they don't earn the platform anything.
5. **Pay for outcomes, not effort.** Owners approve/reject submissions. This keeps quality high and is the trust contract that makes them post again.

---

## 5. The key upstream decision: a task taxonomy

Before any screens, decide **what a "task" even is** — because it determines discovery, verification, and payout. I'd define 3 tiers:

| Tier | Example | Verification | Feeds the feed? |
|---|---|---|---|
| **Micro** (instant) | Leave a review, follow + engage, test a flow, fill a survey | Auto / proof-link | Sometimes |
| **Creative** (UGC) | Make a clip, a testimonial, a meme, a short | Owner approves | **Yes — primary loop fuel** |
| **Skilled** (gig) | Design, research, moderation, data entry | Owner approves + rating | Rarely |

> **Recommendation for v1: lead with Creative/UGC tasks.** They're the bridge from today's content-rewards system, they produce feed artifacts (the loop), and they have the widest pool of doers. Micro tasks are the "first dollar in 5 minutes" on-ramp. Skilled is later.

This taxonomy is the backbone — discovery filters by it, verification differs by it, payout speed differs by it.

---

## 6. Journey A — The Task-doer (discover → do → submit → paid)

| Stage | The job | Where it breaks | Design answer |
|---|---|---|---|
| **Discover** | Find a task I can do *and want to* | Endless list, unclear payout, "am I qualified?" | Feed of tasks ranked by payout + ease + fit. Every card shows **payout, time estimate, difficulty, what 'done' means** at a glance. Filter by tier/skill. |
| **Decide** | "Is this worth my time and will I get paid?" | Hidden rules, fear of rejection | Up-front: payout, approval criteria, # of slots left, escrow badge ("funds locked"). No surprises. |
| **Do** | Complete the work | Leaving the app, unclear deliverable | In-context brief + examples of good submissions. For creative tasks, link to the content tools Whop already has. |
| **Submit** | Hand it in | Friction, wrong format | One-tap submit (upload / paste link / proof). Status = "Under review" with expected response time. |
| **Get paid** | Receive money | Slow, opaque, thresholds | Instant on approval, into Whop balance. Clear status: Submitted → Approved → Paid. Rejections come with a reason + (where fair) one fix-and-resubmit. |

**Doer's emotional arc to protect:** *Can I do this? → Will I get paid? → Did I get paid?* Every screen answers the live question.

---

## 7. Journey B — The Business owner (create → distribute → review → pay)

| Stage | The job | Where it breaks | Design answer |
|---|---|---|---|
| **Create** | Define the task | Bad brief → bad submissions | Guided composer: pick a **template** by tier, set payout, set # of slots / total budget, define approval criteria, attach examples. Templates do the heavy lifting. |
| **Fund** | Put money behind it | Trust / commitment | Escrow the budget up front (this is also the doer's trust signal). Show projected reach/output. |
| **Distribute** | Get it in front of doers | Cold start, no doers | Auto-listed in the Tasks feed + pushed to relevant doers + optionally to the owner's existing members. |
| **Review** | Judge submissions | Volume, slow, unfair | A review queue: approve/reject/request-changes, bulk actions, side-by-side. Reject requires a reason (keeps the market fair). |
| **Pay & measure** | Pay for good work, see ROI | "Did this work?" | Pay-on-approve auto-releases escrow. Dashboard: submissions, approval rate, cost per output, reach generated, GMV attributed. |

**Owner's reason to come back:** they posted once, got usable output, paid only for what they approved, and can *see the ROI.* That last part (measurement) is what turns one task into a habit.

---

## 8. The trust spine (cross-cutting — the thing that makes or breaks it)

A task marketplace lives or dies on trust. Three mechanisms carry it:

- **Escrow up front** — owner's money is locked before the task is live. Doers see "funds secured." Removes the #1 fear on both sides.
- **Visible rules of approval** — what "done" means is shown *before* you start. Reduces disputes to near-zero and makes rejections feel fair.
- **Two-way reputation** — doers build a track record (approval rate, # done); owners build one too (approval rate, avg response time, % of budget actually paid out). Bad actors on either side get filtered by ranking, not bans.

> Without this spine, you get the two death spirals: doers who work for free and leave, or owners who get spammed with junk and stop posting. Design the spine first; it's invisible but load-bearing.

---

## 9. Key design decisions & tradeoffs (where the real thinking is)

| Decision | Options | My call | Why |
|---|---|---|---|
| **Payout model** | Pay-per-task (slots) vs. pay-per-result (rewards-style) | **Slots for v1** | Predictable budget for owners, predictable payout for doers, easier to reason about. Rewards-style (top clips win) already exists — Tasks is the *guaranteed* path. |
| **Approval** | Auto-approve vs. owner-reviews | **Owner reviews creative/skilled; auto for micro** | Quality + trust for owners; speed for the on-ramp tier. |
| **Cold start** | Wait for organic vs. seed | **Seed supply** — Whop/early owners post starter tasks so doers always see a full feed | An empty feed kills the doer side instantly. Supply must lead. |
| **Discovery ranking** | Newest vs. payout vs. fit | **Fit + payout + ease blend, payout visible** | Doers chase clear money; the system should match them to tasks they'll actually complete (raises completion rate = the metric owners care about). |
| **Feed integration** | Tasks as separate tab vs. woven into main feed | **Both — own tab for intent, woven cards for discovery** | The tab serves people who came to earn; woven cards convert browsers into doers (this is the loop). |
| **Rejection UX** | Silent reject vs. reason + resubmit | **Reason always; one resubmit where fair** | Protects the trust spine; turns a churned doer into a retained one. |

---

## 10. Success metrics — how we measure (mapped to your criteria)

**North Star: # of users who earn their first dollar via Tasks each week.** It's the literal fix for the core problem and it's two-sided (requires supply *and* demand *and* a working payout).

Then a funnel + counter-metrics, organized by your four criteria:

**Criterion 1 — Is finding a task easy? (Discovery)**
- Task feed view → task opened rate
- Search/filter usage; "no tasks for me" / empty-state rate
- Time-to-first-task-started for a new user

**Criterion 2 — Can they do + submit easily? (Completion)**
- Task started → submitted rate (the drop-off here = friction in doing)
- Submission → approval rate (low = brief unclear or matching bad)
- **Time-to-first-payout** (the headline UX metric)
- Doer repeat rate (did they come back for a 2nd task?)

**Criterion 3 — Can business owners post easily? (Supply)**
- Task create-started → published rate
- Time-to-publish a task
- Owner repeat-post rate (the real signal — did the first one work for them?)
- % of escrowed budget actually paid out (high = quality submissions matched supply)

**Criterion 4 — Does it grow revenue + feed the loop? (Outcome)**
- GMV flowing through Tasks (payouts processed)
- Feed artifacts created per completed task → impressions → **new users attributed to task output** (the loop, measured)
- Owner ROI: cost per output / cost per reach
- % of new earners who later become creators or owners (the upgrade path)

**Counter-metrics (watch for the failure modes):**
- Dispute / "didn't get paid" rate
- Rejection rate without reason
- Fraud / bot-submission rate
- Empty-feed rate for doers (cold-start health)

---

## 11. Risks / failure modes (and the guardrail)

| Risk | Guardrail |
|---|---|
| **Cold start** — no tasks → no doers → no tasks | Seed supply; never show an empty feed; recruit launch owners. |
| **Worked-for-free** churn | Escrow + visible rules + reason-on-reject. |
| **Junk submissions** swamp owners | Templates + clear briefs + reputation ranking + bulk review. |
| **Fraud / bots** | Proof requirements, rate limits, reputation, manual approval on creative tier. |
| **Race to the bottom** on payout | Surface fair-rate guidance; rank quality, not just cheapest. |
| **Loop leak** — tasks done but nothing reaches the feed | Default tasks to shareable output; de-prioritize private tasks. |

---

## 12. What I'd prototype first (v1 scope)

Smallest thing that proves the loop:

1. **One tier: Creative/UGC tasks** (bridges from content rewards, produces feed fuel).
2. **Doer flow:** task feed → task detail (payout, rules, escrow badge) → submit → status → paid.
3. **Owner flow:** templated composer → fund/escrow → review queue (approve/reject + reason) → ROI summary.
4. **The trust spine:** escrow badge, visible approval rules, basic two-way reputation.
5. **Measurement baked in:** instrument the North Star + the four-criteria funnels from day one.

Everything else (micro on-ramp, skilled gigs, advanced ranking, woven feed cards) is fast-follow once the loop turns.

---

*Open questions to pressure-test next: How do tasks relate to the existing content-rewards system — merge or separate? Who seeds the first tasks at launch? What's the minimum payout, and does Whop take a cut of the task budget or charge owners a fee?*
