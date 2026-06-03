// Seed data for business owner dashboard (prototype).

export const SEED_OWNER_PROGRAMS = [
  {
    id: 'prog-ugc-may',
    title: '30s UGC testimonials',
    brief: 'Film a quick vertical clip sharing an honest take on our paid community.',
    payoutPer: 20,
    slotsTotal: 10,
    slotsRemaining: 4,
    criteria: 'Face on camera · mention brand · vertical 9:16 · clear audio',
    status: 'live',
    createdLabel: 'May 18',
    metrics: {
      submissions7d: [2, 3, 2, 5, 6, 4, 7],
      pendingReview: 2,
      approved: 4,
      rejected: 0,
      paidOut: 80,
      escrowBudget: 200,
      feedImpressions: 12400,
      reachFromTask: 8200,
      approvalRate: 1,
    },
  },
  {
    id: 'prog-meme',
    title: 'Meme drop for launch week',
    brief: 'Original meme about our product; post publicly and tag us.',
    payoutPer: 15,
    slotsTotal: 25,
    slotsRemaining: 9,
    criteria: 'Original · on-brand · public post',
    status: 'live',
    createdLabel: 'May 2',
    metrics: {
      submissions7d: [8, 6, 9, 11, 7, 5, 10],
      pendingReview: 5,
      approved: 11,
      rejected: 3,
      paidOut: 165,
      escrowBudget: 375,
      feedImpressions: 28400,
      reachFromTask: 19200,
      approvalRate: 0.79,
    },
  },
]

export function emptyMetrics() {
  return {
    submissions7d: [0, 0, 0, 0, 0, 0, 0],
    pendingReview: 0,
    approved: 0,
    rejected: 0,
    paidOut: 0,
    escrowBudget: 0,
    feedImpressions: 0,
    reachFromTask: 0,
    approvalRate: 0,
  }
}
