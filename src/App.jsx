import { useState, useEffect } from 'react'
import { TASKS } from './tasks'
import { SEED_OWNER_PROGRAMS, emptyMetrics } from './ownerPrograms'
import { Icon } from './icons'
import { AnimatedDoneCheck } from './CompletionEffects'

export default function App() {
  const [tab, setTab] = useState('home')       // bottom nav: home (feed) | discover
  const [flow, setFlow] = useState(null)          // null | qualify | tasks | detail | submit | done | ownerHome | ownerCreate | ownerPublished | ownerProgram
  const [active, setActive] = useState(null)      // selected task (earner) OR selected owner program id
  /** Seed submissions so Completed / Stats show realistic earnings in the prototype. */
  const [completed, setCompleted] = useState(() => ['palo-alto', 'whop-meme', 'story-share', 'google-review'])
  const [ownerPrograms, setOwnerPrograms] = useState(() => [...SEED_OWNER_PROGRAMS])
  /** 'qualify' = back to role picker; 'feed' = back out to home feed */
  const [ownerEntry, setOwnerEntry] = useState(null)

  const openTask = (t) => { setActive(t); setFlow('detail') }
  const submitTask = () => {
    setCompleted((c) => (c.includes(active.id) ? c : [...c, active.id]))
    setFlow('done')
  }
  const resetToTasks = () => setFlow('tasks')
  const closeFlow = () => { setFlow(null); setActive(null); setOwnerEntry(null) }

  const flowBack = () => {
    if (flow === 'qualify') return closeFlow
    if (flow === 'tasks') return () => setFlow('qualify')
    if (flow === 'detail') return resetToTasks
    if (flow === 'submit') return () => setFlow('detail')
    if (flow === 'ownerHome') return () => (ownerEntry === 'qualify' ? setFlow('qualify') : closeFlow())
    if (flow === 'ownerCreate') return () => setFlow('ownerHome')
    if (flow === 'ownerPublished') return () => setFlow('ownerHome')
    if (flow === 'ownerProgram') return () => { setActive(null); setFlow('ownerHome') }
    return closeFlow
  }

  const flowTitle = () => {
    if (flow === 'qualify') return 'Tasks'
    if (flow === 'tasks') return 'Earn'
    if (flow === 'detail' || flow === 'submit' || flow === 'done') return 'Task'
    if (flow === 'ownerHome') return 'Programs'
    if (flow === 'ownerCreate') return 'New program'
    if (flow === 'ownerPublished') return 'Published'
    if (flow === 'ownerProgram') {
      const p = ownerPrograms.find((x) => x.id === active)
      return p ? p.title.slice(0, 22) + (p.title.length > 22 ? '…' : '') : 'Program'
    }
    return 'Tasks'
  }

  const publishOwnerProgram = (payload) => {
    const id = `prog-${Date.now()}`
    const escrowBudget = payload.payoutPer * payload.slotsTotal
    const program = {
      id,
      title: payload.title.trim(),
      brief: payload.brief.trim(),
      payoutPer: payload.payoutPer,
      slotsTotal: payload.slotsTotal,
      slotsRemaining: payload.slotsTotal,
      criteria: payload.criteria.trim(),
      status: 'live',
      createdLabel: 'Just now',
      metrics: { ...emptyMetrics(), escrowBudget, paidOut: 0 },
    }
    setOwnerPrograms((list) => [program, ...list])
    setActive(id)
    setFlow('ownerPublished')
  }

  const selectedProgram = active && typeof active === 'string' ? ownerPrograms.find((p) => p.id === active) : null

  return (
    <div className="device-mockup">
      <div className="device-chrome" data-mockup-chrome>
        <div className="device-screen-shell">
          <div className="device-notch" aria-hidden />
          <div className="phone">
            <UrlBar />

            {flow ? (
              <div className="flow" key={flow}>
                <FlowHeader title={flowTitle()} onBack={flowBack()} onClose={closeFlow} />

                {flow === 'qualify' && (
                  <Qualify
                    onPick={(role) => {
                      if (role === 'earner') {
                        setOwnerEntry(null)
                        setFlow('tasks')
                      } else {
                        setOwnerEntry('qualify')
                        setFlow('ownerHome')
                      }
                    }}
                  />
                )}
                {flow === 'tasks' && <TaskList tasks={TASKS} completed={completed} onOpen={openTask} />}
                {flow === 'detail' && active && (
                  <TaskDetail task={active} done={completed.includes(active.id)} onStart={() => setFlow('submit')} />
                )}
                {flow === 'submit' && active && <SubmitTask task={active} onSubmit={submitTask} />}
                {flow === 'done' && active && <Done task={active} onMore={resetToTasks} onClose={closeFlow} />}
                {flow === 'ownerHome' && (
                  <OwnerHome
                    programs={ownerPrograms}
                    onPostNew={() => setFlow('ownerCreate')}
                    onOpenProgram={(id) => { setActive(id); setFlow('ownerProgram') }}
                  />
                )}
                {flow === 'ownerCreate' && (
                  <OwnerCreateForm onCancel={() => setFlow('ownerHome')} onPublish={publishOwnerProgram} />
                )}
                {flow === 'ownerPublished' && selectedProgram && (
                  <OwnerPublished program={selectedProgram} onOpenTracker={() => setFlow('ownerProgram')} onHome={() => setFlow('ownerHome')} />
                )}
                {flow === 'ownerProgram' && selectedProgram && (
                  <OwnerProgramTracker program={selectedProgram} />
                )}
              </div>
            ) : (
              <div className="page" key={tab}>
                {tab === 'home' ? (
                  <FeedHome
                    onEarn={() => setFlow('qualify')}
                    onPostProgram={() => {
                      setOwnerEntry('feed')
                      setFlow('ownerHome')
                    }}
                  />
                ) : (
                  <DiscoverHome onStart={() => setFlow('qualify')} />
                )}
              </div>
            )}

            <BottomNav
              tab={tab}
              setTab={(t) => {
                setTab(t)
                if (flow) closeFlow()
              }}
            />
          </div>
        </div>
        <div className="device-bottom-cap" aria-hidden>
          <div className="device-home-indicator" />
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
function getBrowserDisplayUrl() {
  if (typeof window === 'undefined') return ''
  const { host, pathname, search } = window.location
  const path = pathname === '/' && !search ? '/' : `${pathname}${search}`
  return `${host}${path}`
}

function UrlBar() {
  const [displayUrl, setDisplayUrl] = useState(getBrowserDisplayUrl)

  useEffect(() => {
    setDisplayUrl(getBrowserDisplayUrl())
  }, [])

  return (
    <div className="urlbar">
      <span className="url-icon"><Icon name="aa" size={15} /></span>
      <span className="url-text" title={displayUrl || undefined}>
        {displayUrl || 'Loading…'}
      </span>
      <span className="url-share"><Icon name="share" size={15} /></span>
    </div>
  )
}

function BottomNav({ tab, setTab }) {
  return (
    <nav className="bottomnav">
      <button className={tab === 'home' ? 'nav-item active' : 'nav-item'} onClick={() => setTab('home')}><Icon name="home" /></button>
      <button className="nav-item"><Icon name="grid" /></button>
      <button className="nav-item"><Icon name="chat" /></button>
      <button className={tab === 'discover' ? 'nav-item active' : 'nav-item'} onClick={() => setTab('discover')}><Icon name="compass" /></button>
      <button className="nav-avatar">JR</button>
    </nav>
  )
}

/* ------------------------------------------------------------------ */
/* HOME = mixed community feed + task completions + Tasks entry         */
/* ------------------------------------------------------------------ */
const MIXED_FEED = [
  {
    kind: 'tasks_promo',
    id: 'promo-1',
  },
  {
    kind: 'discussion',
    id: 'd1',
    forum: 'Public forum',
    community: 'Trade Academy',
    name: 'Torres kross',
    handle: '@baserlag67',
    when: '2m',
    pinned: false,
    text: 'Anyone else scaling small accounts first before going full size? Curious what risk rules you use.',
    likes: 41,
    comments: 12,
    reposts: 3,
    views: 104,
    image: '/feed/d1-trade-academy.png',
  },
  {
    kind: 'task_complete',
    id: 't1',
    forum: 'Public forum',
    community: 'Whop',
    name: 'Maya',
    handle: '@maya',
    when: '8m',
    avatar: 'M',
    task: 'Rep Whop in Palo Alto',
    media: '🎥',
    caption: '“Whop is an awesome company” the easiest $25 I ever made',
    likes: 128,
    comments: 24,
    reposts: 9,
    views: 892,
    pay: 25,
    image: '/feed/t1-maya-palo-alto.png',
  },
  {
    kind: 'link',
    id: 'l1',
    forum: 'Public forum',
    community: 'Trapline vault',
    name: 'Trapline',
    handle: '@traplinevault',
    when: '14m',
    pinned: true,
    text: 'Y’all wondering where it’s posted, link below.',
    linkLabel: 't.me/traplinevault',
    likes: 56,
    comments: 31,
    reposts: 14,
    views: 176,
    image: '/feed/l1-trapline.png',
  },
  {
    kind: 'discussion',
    id: 'd2',
    forum: 'Public forum',
    community: 'KISS AI',
    name: 'Usharab',
    handle: '@usharab',
    when: '22m',
    pinned: false,
    text: 'Dropped my whop.com link in the bio — conversions actually picked up after I started posting wins daily.',
    likes: 92,
    comments: 18,
    reposts: 5,
    views: 192,
    image: '/feed/d2-kiss-ai.png',
  },
  {
    kind: 'task_complete',
    id: 't2',
    forum: 'Public forum',
    community: 'Whop',
    name: 'Aria',
    handle: '@aria',
    when: '34m',
    avatar: 'A',
    task: 'Make a meme about Whop',
    media: '😂',
    caption: 'they literally paid me $15 to be funny lol',
    likes: 89,
    comments: 15,
    reposts: 6,
    views: 540,
    pay: 15,
    image: '/feed/t2-aria-meme.png',
  },
  {
    kind: 'discussion',
    id: 'd3',
    forum: 'Public forum',
    community: 'Remarkable Picks',
    name: 'Remarkable picks',
    handle: '@remarkablepi…',
    when: '1h',
    pinned: false,
    text: 'MORE WINNINGS COMING. Posting slips in the thread, who’s tailing today?',
    likes: 203,
    comments: 44,
    reposts: 22,
    views: 1204,
    hasMediaStrip: true,
    image: '/feed/d3-remarkable-picks.png',
  },
  {
    kind: 'task_complete',
    id: 't3',
    forum: 'Public forum',
    community: 'Whop',
    name: 'Leo',
    handle: '@leo',
    when: '2h',
    avatar: 'L',
    task: 'Share Whop on your story',
    media: '📲',
    caption: 'posted it to my story, $12 hit my balance in minutes',
    likes: 54,
    comments: 9,
    reposts: 2,
    views: 310,
    pay: 12,
    image: '/feed/t3-leo-story.png',
  },
]

function FeedPostImage({ src, alt, className, fallback }) {
  const [failed, setFailed] = useState(false)
  if (!src || failed) {
    return <div className={className}>{fallback ?? null}</div>
  }
  return (
    <div className={`${className} post-media-has-img`}>
      <img
        src={src}
        alt={alt || ''}
        className="post-media-img"
        onError={() => setFailed(true)}
        decoding="async"
        loading="lazy"
      />
    </div>
  )
}

function FeedHome({ onEarn, onPostProgram }) {
  const [feedTab, setFeedTab] = useState('all')

  return (
    <>
      <header className="home-top">
        <span className="home-avatar stagger" style={{ animationDelay: '0ms' }}>
          JR
        </span>
        <h1 className="home-title stagger" style={{ animationDelay: '45ms' }}>
          Home
        </h1>
        <span className="home-balance stagger" style={{ animationDelay: '45ms' }}>
          $0.00
        </span>
      </header>

      <div className="home-tabs stagger" style={{ animationDelay: '95ms' }}>
        {['all', 'following', 'joined'].map((id) => (
          <button
            key={id}
            type="button"
            className={`home-tab ${feedTab === id ? 'active' : ''}`}
            onClick={() => setFeedTab(id)}
          >
            {id === 'all' ? 'All' : id === 'following' ? 'Following' : 'Joined'}
          </button>
        ))}
      </div>

      <div className="feed feed-mixed">
        {MIXED_FEED.map((item, i) => {
          if (item.kind === 'tasks_promo') {
            return (
              <div key={item.id} className="feed-tasks-card stagger" style={{ animationDelay: `${i * 45}ms` }}>
                <div className="ftc-head">
                  <span className="ftc-badge">Tasks</span>
                  <span className="ftc-live">Live on Whop</span>
                </div>
                <p className="ftc-title">Get paid without an audience</p>
                <p className="ftc-copy">Do quick tasks for brands, or post your own program and buy real output.</p>
                <div className="ftc-actions">
                  <button type="button" className="ftc-btn primary" onClick={onEarn}>Earn from tasks</button>
                  <button type="button" className="ftc-btn secondary" onClick={onPostProgram}>Post a task program</button>
                </div>
              </div>
            )
          }

          if (item.kind === 'task_complete') {
            return (
              <article key={item.id} className="post post-forum post-task stagger" style={{ animationDelay: `${i * 45}ms` }}>
                <div className="post-forum-line">{item.forum} · {item.community}</div>
                <div className="post-head">
                  <span className="post-avatar">{item.avatar}</span>
                  <div className="post-id">
                    <span className="post-name">{item.name}</span>
                    <span className="post-meta">{item.handle} · {item.when}{item.pinned ? ' · Pinned' : ''}</span>
                  </div>
                </div>
                <div className="post-task-row">
                  <div className="post-task-badge">Completed task · {item.task}</div>
                  {item.pay != null && <span className="post-pay-inline">+${item.pay}</span>}
                </div>
                <p className="post-caption">{item.caption}</p>
                <FeedPostImage
                  src={item.image}
                  alt=""
                  className="post-media post-media-sm"
                  fallback={(
                    <span className="post-media-fallback">
                      {item.media ? <span className="post-media-emoji">{item.media}</span> : <Icon name="play" size={26} />}
                    </span>
                  )}
                />
                <div className="post-actions post-actions-row">
                  <span><Icon name="chat" size={15} /> {item.comments}</span>
                  <span><Icon name="repost" size={15} /> {item.reposts}</span>
                  <span><Icon name="eye" size={15} /> {item.views}</span>
                  <span><Icon name="share" size={15} /></span>
                </div>
              </article>
            )
          }

          if (item.kind === 'link') {
            return (
              <article key={item.id} className="post post-forum stagger" style={{ animationDelay: `${i * 45}ms` }}>
                <div className="post-forum-line">{item.forum} · {item.community}</div>
                <div className="post-head">
                  <span className="post-avatar ph">{item.name[0]}</span>
                  <div className="post-id">
                    <span className="post-name">{item.name}</span>
                    <span className="post-meta">{item.handle} · {item.when}{item.pinned ? ' · Pinned' : ''}</span>
                  </div>
                </div>
                <p className="post-caption">{item.text}</p>
                <FeedPostImage
                  src={item.image}
                  alt=""
                  className="post-media post-media-sm"
                  fallback={<div className="post-media-placeholder" aria-hidden />}
                />
                <div className="post-link-pill">{item.linkLabel}</div>
                <div className="post-actions post-actions-row">
                  <span><Icon name="chat" size={15} /> {item.comments}</span>
                  <span><Icon name="repost" size={15} /> {item.reposts}</span>
                  <span><Icon name="eye" size={15} /> {item.views}</span>
                  <span><Icon name="share" size={15} /></span>
                </div>
              </article>
            )
          }

          return (
            <article key={item.id} className="post post-forum stagger" style={{ animationDelay: `${i * 45}ms` }}>
              <div className="post-forum-line">{item.forum} · {item.community}</div>
              <div className="post-head">
                <span className="post-avatar ph">{item.name[0]}</span>
                <div className="post-id">
                  <span className="post-name">{item.name}</span>
                  <span className="post-meta">{item.handle} · {item.when}{item.pinned ? ' · Pinned' : ''}</span>
                </div>
              </div>
              <p className="post-caption">{item.text}</p>
              {item.image ? (
                <FeedPostImage
                  src={item.image}
                  alt=""
                  className="post-media post-media-sm"
                  fallback={
                    item.hasMediaStrip ? (
                      <div className="post-media-strip">Slips attached · 3 picks</div>
                    ) : (
                      <div className="post-media-placeholder" aria-hidden />
                    )
                  }
                />
              ) : item.hasMediaStrip ? (
                <div className="post-media-strip">Slips attached · 3 picks</div>
              ) : null}
              <div className="post-actions post-actions-row">
                <span><Icon name="chat" size={15} /> {item.comments}</span>
                <span><Icon name="repost" size={15} /> {item.reposts}</span>
                <span><Icon name="eye" size={15} /> {item.views}</span>
                <span><Icon name="share" size={15} /></span>
              </div>
            </article>
          )
        })}
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
/* DISCOVER = the shared screen + the Tasks card                       */
/* ------------------------------------------------------------------ */
function DiscoverHome({ onStart }) {
  return (
    <>
      <div className="discover-top">
        <div className="toggle stagger" style={{ animationDelay: '0ms' }}>
          <button className="seg">Launch</button>
          <button className="seg active">Discover</button>
        </div>

        <h1 className="hero stagger" style={{ animationDelay: '50ms' }}>
          Where the internet<br />does business.
        </h1>
        <p className="subhero stagger" style={{ animationDelay: '100ms' }}>
          Build your business and get discovered by over 21M+ customers on Whop.
        </p>
      </div>

      <div className="prompt stagger" style={{ animationDelay: '150ms' }}>
        <div className="prompt-text">Create a meal prep subscription..</div>
        <div className="prompt-row">
          <button className="prompt-plus">+</button>
          <div className="prompt-actions">
            <button type="button" className="prompt-send">↑</button>
          </div>
        </div>
      </div>

      <h2 className="section-title stagger" style={{ animationDelay: '200ms' }}>
        Getting started
      </h2>

      {/* NEW — the Tasks card with the static gradient glow */}
      <button className="tasks-intro stagger" style={{ animationDelay: '250ms' }} onClick={onStart}>
        <span className="glow" />
        <span className="intro-inner">
          <span className="intro-row">
            <span className="pill-new">NEW</span>
          </span>
          <span className="intro-title">Tasks</span>
          <span className="intro-copy">
            Not a creator? No problem. Do quick paid tasks for real brands.
            No audience, no setup needed.
          </span>
          <span className="intro-cta">Start doing tasks →</span>
        </span>
      </button>

      <div className="reward-card stagger" style={{ animationDelay: '310ms' }}>
        <div className="reward-top">
          <span className="reward-badge">◉ Clipping</span>
          <span className="reward-arrow">★→★</span>
          <span className="reward-heading">Content<br />Rewards</span>
        </div>
        <p className="reward-sub">Get paid to create content for top brands</p>
      </div>
    </>
  )
}

/* ------------------------------------------------------------------ */
function FlowHeader({ title, onBack, onClose }) {
  return (
    <div className="flow-header">
      <button type="button" className="fh-btn" onClick={onBack}>←</button>
      <span className="fh-title">{title}</span>
      <button type="button" className="fh-btn" onClick={onClose}>✕</button>
    </div>
  )
}

function Qualify({ onPick }) {
  return (
    <div className="screen">
      <h2 className="screen-h1">First, what brings you here?</h2>
      <p className="screen-sub">We’ll tailor this flow to you.</p>

      <button type="button" className="choice stagger" style={{ animationDelay: '40ms' }} onClick={() => onPick('earner')}>
        <div className="choice-emoji"><Icon name="coins" size={22} /></div>
        <div className="choice-body">
          <h3>I want to earn</h3>
          <p>Browse paid tasks from brands. Get paid on approval.</p>
        </div>
        <span className="choice-arrow">→</span>
      </button>

      <button type="button" className="choice stagger" style={{ animationDelay: '120ms' }} onClick={() => onPick('owner')}>
        <div className="choice-emoji"><Icon name="store" size={22} /></div>
        <div className="choice-body">
          <h3>I’m a business owner</h3>
          <p>Post a task program, fund escrow, and track submissions & ROI.</p>
        </div>
        <span className="choice-arrow">→</span>
      </button>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* OWNER — post programs, tracker, metrics                              */
/* ------------------------------------------------------------------ */
const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

function OwnerSubmissionBars({ values, accent }) {
  const maxBar = Math.max(1, ...values)
  return (
    <div className="owner-bars" role="img" aria-label="Submissions per day">
      {values.map((v, i) => {
        const pct = (v / maxBar) * 100
        return (
          <div key={`${DAY_LABELS[i]}-${i}`} className="owner-bar-wrap">
            <div
              className={`owner-bar owner-bar-anim${accent ? ' accent' : ''}`}
              style={{ '--h': `${pct}%`, animationDelay: `${i * 0.055}s` }}
              title={`${v} submissions`}
            />
            <span className="owner-bar-lbl">{DAY_LABELS[i]}</span>
          </div>
        )
      })}
    </div>
  )
}

function OwnerHome({ programs, onPostNew, onOpenProgram }) {
  const totals = programs.reduce(
    (acc, p) => {
      acc.active += p.status === 'live' ? 1 : 0
      acc.submissions += p.metrics.approved + p.metrics.pendingReview + p.metrics.rejected
      acc.paid += p.metrics.paidOut
      acc.impressions += p.metrics.feedImpressions
      return acc
    },
    { active: 0, submissions: 0, paid: 0, impressions: 0 }
  )
  const merged7d = DAY_LABELS.map((_, i) =>
    programs.reduce((sum, p) => sum + (p.metrics.submissions7d[i] || 0), 0)
  )

  return (
    <div className="screen owner-screen">
      <h2 className="screen-h1">Task programs</h2>
      <p className="screen-sub">Post work and get real output from creators. Start by posting a task.</p>

      {/* Lead with the action — post a task */}
      <button type="button" className="owner-cta-card stagger" style={{ animationDelay: '40ms' }} onClick={onPostNew}>
        <span className="occ-text">
          <span className="occ-title">Post a task program</span>
          <span className="occ-sub">Define the work, fund escrow, only pay for approved submissions.</span>
        </span>
        <span className="occ-plus"><Icon name="plus" size={22} /></span>
      </button>

      {/* Ongoing tasks */}
      <div className="owner-section-head">
        <h3 className="owner-h3">Ongoing tasks</h3>
        <span className="owner-count">{totals.active} live</span>
      </div>

      {programs.length === 0 ? (
        <p className="owner-empty">No tasks yet. Post your first program to start collecting submissions.</p>
      ) : (
        <div className="owner-program-list">
          {programs.map((p, i) => (
            <button
              key={p.id}
              type="button"
              className="owner-program-card stagger"
              style={{ animationDelay: `${100 + i * 50}ms` }}
              onClick={() => onOpenProgram(p.id)}
            >
              <div className="opc-top">
                <span className={`opc-status opc-${p.status}`}>{p.status}</span>
                <span className="opc-date">{p.createdLabel}</span>
              </div>
              <h4 className="opc-title">{p.title}</h4>
              <p className="opc-meta">${p.payoutPer} · {p.slotsTotal - p.slotsRemaining}/{p.slotsTotal} filled · {p.metrics.pendingReview} in review</p>
              <div className="opc-foot">
                <span className="opc-pill">${p.metrics.paidOut} paid</span>
                <span className="opc-pill dim">{(p.metrics.feedImpressions / 1000).toFixed(1)}k views</span>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Performance — demoted below the action + ongoing tasks */}
      <h3 className="owner-h3 owner-perf-h">Performance</h3>
      <div className="owner-kpis">
        <div className="owner-kpi"><span className="owner-kpi-val">{totals.active}</span><span className="owner-kpi-lbl">live programs</span></div>
        <div className="owner-kpi"><span className="owner-kpi-val">{totals.submissions}</span><span className="owner-kpi-lbl">submissions</span></div>
        <div className="owner-kpi"><span className="owner-kpi-val">${totals.paid}</span><span className="owner-kpi-lbl">paid out</span></div>
        <div className="owner-kpi"><span className="owner-kpi-val">{(totals.impressions / 1000).toFixed(1)}k</span><span className="owner-kpi-lbl">feed impressions</span></div>
      </div>

      <div className="owner-chart-card">
        <div className="owner-chart-head">
          <span className="owner-chart-title">Submissions (last 7 days)</span>
          <span className="owner-chart-hint">all programs</span>
        </div>
        <OwnerSubmissionBars values={merged7d} accent={false} />
      </div>

      <div className="sticky-cta">
        <button type="button" className="primary-btn" onClick={onPostNew}>Post a new task program</button>
      </div>
    </div>
  )
}

function OwnerCreateForm({ onCancel, onPublish }) {
  const [template, setTemplate] = useState('ugc')
  const [title, setTitle] = useState('')
  const [brief, setBrief] = useState('')
  const [payoutPer, setPayoutPer] = useState(15)
  const [slotsTotal, setSlotsTotal] = useState(10)
  const [criteria, setCriteria] = useState('')

  const escrow = payoutPer * slotsTotal
  const canPublish = title.trim().length > 2 && brief.trim().length > 10 && criteria.trim().length > 5 && payoutPer > 0 && slotsTotal > 0

  const applyTemplate = (t) => {
    setTemplate(t)
    if (t === 'ugc') {
      setTitle('30s testimonial clips')
      setBrief('Creators film a short vertical clip with their honest reaction to our product. Post publicly and paste the link.')
      setCriteria('Face on camera · say our name once · vertical 9:16 · good lighting')
      setPayoutPer(20)
      setSlotsTotal(10)
    } else if (t === 'meme') {
      setTitle('Launch week memes')
      setBrief('Original meme about our launch; must be funny, on-brand, and posted to X or IG with our tag.')
      setCriteria('Original art · tag @brand · public · no slurs')
      setPayoutPer(12)
      setSlotsTotal(20)
    } else {
      setTitle('')
      setBrief('')
      setCriteria('')
    }
  }

  return (
    <div className="screen owner-screen">
      <h2 className="screen-h1">Define your task</h2>
      <p className="screen-sub">Clear briefs get better submissions. Budget is escrowed up front.</p>

      <label className="field-label">Template</label>
      <div className="owner-template-row">
        <button type="button" className={`owner-chip ${template === 'ugc' ? 'on' : ''}`} onClick={() => applyTemplate('ugc')}>UGC clip</button>
        <button type="button" className={`owner-chip ${template === 'meme' ? 'on' : ''}`} onClick={() => applyTemplate('meme')}>Meme</button>
        <button type="button" className={`owner-chip ${template === 'custom' ? 'on' : ''}`} onClick={() => applyTemplate('custom')}>Custom</button>
      </div>

      <label className="field-label">Program title</label>
      <input className="field" placeholder="e.g. 30s testimonials for May drop" value={title} onChange={(e) => setTitle(e.target.value)} />

      <label className="field-label">What you need done</label>
      <textarea
        className="field owner-textarea"
        rows={4}
        placeholder="Describe the deliverable, platforms, length, tone…"
        value={brief}
        onChange={(e) => setBrief(e.target.value)}
      />

      <div className="owner-row2">
        <div>
          <label className="field-label">Pay per approval ($)</label>
          <input
            className="field"
            type="number"
            min={1}
            value={payoutPer}
            onChange={(e) => setPayoutPer(Number(e.target.value) || 0)}
          />
        </div>
        <div>
          <label className="field-label"># of slots</label>
          <input
            className="field"
            type="number"
            min={1}
            value={slotsTotal}
            onChange={(e) => setSlotsTotal(Number(e.target.value) || 0)}
          />
        </div>
      </div>

      <label className="field-label">Approval criteria (shown to doers before they start)</label>
      <textarea
        className="field owner-textarea"
        rows={3}
        placeholder="Bullet-style is OK: vertical video, mention brand, no watermarks…"
        value={criteria}
        onChange={(e) => setCriteria(e.target.value)}
      />

      <div className="owner-escrow">
        <strong>Escrow summary</strong>
        <p>${payoutPer} × {slotsTotal} slots = <span className="owner-escrow-total">${escrow}</span> locked when you publish</p>
      </div>

      <div className="sticky-cta owner-create-cta">
        <button type="button" className="ghost-btn" onClick={onCancel}>Cancel</button>
        <button
          type="button"
          className="primary-btn"
          disabled={!canPublish}
          onClick={() => onPublish({ title, brief, payoutPer, slotsTotal, criteria })}
        >
          {canPublish ? `Publish · escrow $${escrow}` : 'Fill in title, brief & criteria'}
        </button>
      </div>
    </div>
  )
}

function OwnerPublished({ program, onOpenTracker, onHome }) {
  return (
    <div className="screen done-screen owner-screen">
      <AnimatedDoneCheck label="Program published" />
      <h2 className="done-h">Program is live</h2>
      <p className="done-sub">
        <strong>{program.title}</strong> is accepting submissions. <strong>${program.metrics.escrowBudget}</strong> is earmarked in escrow; you only pay for approvals.
      </p>
      <div className="owner-mini-track">
        <span className="owner-pipe on">Live</span>
        <span className="owner-pipe dim">Submissions</span>
        <span className="owner-pipe dim">Review</span>
        <span className="owner-pipe dim">Paid</span>
      </div>
      <div className="sticky-cta col">
        <button type="button" className="primary-btn" onClick={onOpenTracker}>Open status & metrics</button>
        <button type="button" className="ghost-btn" onClick={onHome}>Back to all programs</button>
      </div>
    </div>
  )
}

function OwnerProgramTracker({ program }) {
  const m = program.metrics
  const totalDecided = (m.approved + m.rejected) || 1
  const apprPct = Math.round((m.approved / totalDecided) * 100)
  const slotsUsed = program.slotsTotal - program.slotsRemaining
  const fillPct = Math.min(100, Math.round((slotsUsed / program.slotsTotal) * 100))
  const cpo = m.approved > 0 ? (m.paidOut / m.approved).toFixed(0) : '—'

  return (
    <div className="screen owner-screen">
      <div className="owner-track-hero">
        <span className={`opc-status opc-${program.status}`}>{program.status}</span>
        <h2 className="screen-h1 owner-track-title">{program.title}</h2>
        <p className="screen-sub tight">${program.payoutPer} per approval · {program.slotsTotal} slots · {program.createdLabel}</p>
      </div>

      <div className="owner-funnel">
        <span className="owner-funnel-label">Pipeline</span>
        <div className="owner-funnel-row">
          <div className="owner-funnel-step done"><span className="ofs-dot" />Posted</div>
          <div className="owner-funnel-line" />
          <div className="owner-funnel-step live"><span className="ofs-dot" />Collecting</div>
          <div className="owner-funnel-line dim" />
          <div className="owner-funnel-step"><span className="ofs-dot dim" />Review</div>
          <div className="owner-funnel-line dim" />
          <div className="owner-funnel-step"><span className="ofs-dot dim" />Paid</div>
        </div>
      </div>

      <div className="owner-kpis owner-kpis-tight">
        <div className="owner-kpi"><span className="owner-kpi-val">{m.pendingReview}</span><span className="owner-kpi-lbl">in review</span></div>
        <div className="owner-kpi"><span className="owner-kpi-val">{m.approved}</span><span className="owner-kpi-lbl">approved</span></div>
        <div className="owner-kpi"><span className="owner-kpi-val">{apprPct}%</span><span className="owner-kpi-lbl">approval rate</span></div>
        <div className="owner-kpi"><span className="owner-kpi-val">${cpo}</span><span className="owner-kpi-lbl">cost / output</span></div>
      </div>

      <div className="owner-chart-card">
        <div className="owner-chart-head">
          <span className="owner-chart-title">This program — submissions / day</span>
        </div>
        <OwnerSubmissionBars values={m.submissions7d} accent />
      </div>

      <div className="owner-donut-row">
        <div className="owner-donut-card">
          <span className="owner-donut-title">Outcomes</span>
          <div className="owner-stacked" role="img" aria-label="Approved versus rejected">
            <div className="os-approved" style={{ flex: m.approved || 0.1 }} title={`${m.approved} approved`} />
            <div className="os-pending" style={{ flex: m.pendingReview || 0.1 }} title={`${m.pendingReview} pending`} />
            <div className="os-reject" style={{ flex: m.rejected || 0.1 }} title={`${m.rejected} rejected`} />
          </div>
          <div className="owner-legend">
            <span><i className="lg a" />Approved {m.approved}</span>
            <span><i className="lg p" />Review {m.pendingReview}</span>
            <span><i className="lg r" />Rejected {m.rejected}</span>
          </div>
        </div>
        <div className="owner-donut-card">
          <span className="owner-donut-title">Slot fill</span>
          <div className="owner-progress">
            <div className="owner-progress-fill" style={{ width: `${fillPct}%` }} />
          </div>
          <p className="owner-progress-copy">{slotsUsed} / {program.slotsTotal} slots · {program.slotsRemaining} left</p>
          <span className="owner-donut-title sub">Budget</span>
          <p className="owner-budget-lines"><span>${m.paidOut} paid</span><span className="dim"> / ${m.escrowBudget} escrow</span></p>
        </div>
      </div>

      <div className="owner-reach-grid">
        <div className="owner-reach">
          <span className="owner-reach-k">{(m.feedImpressions / 1000).toFixed(1)}k</span>
          <span className="owner-reach-l">feed impressions</span>
        </div>
        <div className="owner-reach">
          <span className="owner-reach-k">{(m.reachFromTask / 1000).toFixed(1)}k</span>
          <span className="owner-reach-l">reach from task posts</span>
        </div>
      </div>

      <h3 className="detail-h">Brief &amp; rules (doers saw)</h3>
      <p className="owner-brief">{program.brief}</p>
      <div className="rules">
        {program.criteria.split('·').map((r) => r.trim()).filter(Boolean).map((r, i) => (
          <span key={`${r}-${i}`} className="rule">✓ {r}</span>
        ))}
      </div>

      <div className="sticky-cta">
        <button type="button" className="primary-btn" disabled>Open review queue (prototype)</button>
      </div>
    </div>
  )
}

const EARN_STAT_DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S']

/** Demo weekly activity shape for the Stats chart (relative units, not dollars). */
const EARN_WEEK_ACTIVITY_DEMO = [2, 4, 3, 7, 12, 9, 11]

function EarnWeekBars({ values }) {
  const maxBar = Math.max(1, ...values)
  return (
    <div className="earn-chart-card">
      <div className="earn-chart-head">
        <span className="earn-chart-title">Activity (last 7 days)</span>
        <span className="earn-chart-hint">demo</span>
      </div>
      <div className="earn-bars" role="img" aria-label="Relative activity by day">
        {values.map((v, i) => {
          const pct = (v / maxBar) * 100
          return (
            <div key={`${EARN_STAT_DAYS[i]}-${i}`} className="earn-bar-wrap">
              <div
                className="earn-bar earn-bar-anim"
                style={{ '--h': `${pct}%`, animationDelay: `${i * 0.055}s` }}
                title={`${EARN_STAT_DAYS[i]} · ${v}`}
              />
              <span className="earn-bar-lbl">{EARN_STAT_DAYS[i]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function TaskList({ tasks, completed, onOpen }) {
  const [earnTab, setEarnTab] = useState('browse')

  const completedTasks = tasks.filter((t) => completed.includes(t.id))
  const openTasks = tasks.filter((t) => !completed.includes(t.id))
  const totalPending = completedTasks.reduce((sum, t) => sum + t.payout, 0)
  const avgPayout = completedTasks.length ? Math.round(totalPending / completedTasks.length) : 0
  const sortedByPayout = completedTasks.slice().sort((a, b) => b.payout - a.payout)
  /** Matches Completed tab: highest-payout submission is treated as already paid (prototype). */
  const paidToBalance = sortedByPayout[0]?.payout ?? 0
  const inReviewValue = Math.max(0, totalPending - paidToBalance)
  const creativeDone = completedTasks.filter((t) => t.tier === 'Creative').length
  const microDone = completedTasks.filter((t) => t.tier === 'Micro').length
  const powerUserPct = Math.min(100, completedTasks.length * 25)
  const weekActivity =
    completedTasks.length === 0 ? [0, 0, 0, 0, 0, 0, 0] : EARN_WEEK_ACTIVITY_DEMO

  const recommended = (() => {
    if (openTasks.length === 0) return []
    const byPay = [...openTasks].sort((a, b) => b.payout - a.payout)
    const micro = [...openTasks].filter((t) => t.tier === 'Micro').sort((a, b) => a.payout - b.payout)
    const picks = []
    if (byPay[0]) picks.push({ task: byPay[0], reason: 'Highest payout on the board' })
    const second = micro.find((t) => t.id !== byPay[0]?.id) || openTasks.find((t) => t.id !== byPay[0]?.id)
    if (second) picks.push({ task: second, reason: second.tier === 'Micro' ? 'Fast Micro · build momentum' : 'Solid next step after your last win' })
    return picks.slice(0, 2)
  })()

  const tip =
    completed.length === 0
      ? 'Start with a Micro task to get your first approval faster — then chase Creative payouts.'
      : completedTasks.some((t) => t.tier === 'Creative')
        ? 'You’re already doing Creative work. Mix in a Micro task this week to keep approvals flowing.'
        : 'Ready for more per task? Try a Creative tier when you have ~20 minutes.'

  return (
    <div className="screen earn-screen">
      <h2 className="screen-h1">Tasks for you</h2>
      <p className="screen-sub earn-sub">
        {earnTab === 'browse' && `${openTasks.length} open · ${completedTasks.length} submitted`}
        {earnTab === 'completed' && `${completedTasks.length} in your history`}
        {earnTab === 'stats' && 'Your earning snapshot'}
      </p>

      <div className="earn-tabs" role="tablist" aria-label="Task views">
        {[
          { id: 'browse', label: 'Browse' },
          { id: 'completed', label: 'Completed' },
          { id: 'stats', label: 'Stats' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={earnTab === tab.id}
            className={`earn-tab ${earnTab === tab.id ? 'active' : ''}`}
            onClick={() => setEarnTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {earnTab === 'browse' && (
        <>
          {recommended.length > 0 && (
            <section className="earn-section">
              <h3 className="earn-h3">Recommended</h3>
              <p className="earn-hint">Picked from payout, time, and what you haven’t done yet.</p>
              <div className="earn-rec-list">
                {recommended.map(({ task: t, reason }) => (
                  <button key={t.id} type="button" className="earn-rec-card" onClick={() => onOpen(t)}>
                    <div className="earn-rec-top">
                      <span className="earn-rec-title">{t.title}</span>
                      <span className="earn-rec-pay">${t.payout}</span>
                    </div>
                    <p className="earn-rec-reason">{reason}</p>
                    <div className="earn-rec-meta">
                      <span className={`tier tier-${t.tier.toLowerCase()}`}>{t.tier}</span>
                      <span>{t.time}</span>
                    </div>
                  </button>
                ))}
              </div>
            </section>
          )}

          <section className="earn-section">
            <h3 className="earn-h3">All tasks</h3>
            <div className="task-list">
              {tasks.map((t, i) => {
                const done = completed.includes(t.id)
                return (
                  <button key={t.id} className="task-card stagger" style={{ animationDelay: `${i * 50}ms` }} onClick={() => onOpen(t)}>
                    <div className="tc-body">
                      <div className="tc-top">
                        <span className="tc-title">{t.title}</span>
                        <span className="tc-pay">${t.payout}</span>
                      </div>
                      <p className="tc-blurb">{t.blurb}</p>
                      <div className="tc-meta">
                        <span className={`tier tier-${t.tier.toLowerCase()}`}>{t.tier}</span>
                        <span>{t.time}</span>
                        <span>· {t.slots} slots</span>
                        {done && <span className="tc-done">Submitted</span>}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </section>
        </>
      )}

      {earnTab === 'completed' && (
        <div className="earn-panel">
          <div className="earn-summary">
            <div className="earn-summary-main">
              <span className="earn-summary-label">Value submitted</span>
              <span className="earn-summary-val">${totalPending}</span>
              <span className="earn-summary-note">Paid to your balance when each task is approved.</span>
            </div>
            <div className="earn-summary-side">
              <span className="earn-summary-num">{completedTasks.length}</span>
              <span className="earn-summary-subl">submissions</span>
            </div>
          </div>

          {completedTasks.length === 0 ? (
            <div className="earn-empty">
              <p className="earn-empty-title">No completed tasks yet</p>
              <p className="earn-empty-copy">Finish one on the Browse tab — your payouts show up here to keep you motivated.</p>
            </div>
          ) : (
            <ul className="earn-completed-list">
              {completedTasks
                .slice()
                .sort((a, b) => b.payout - a.payout)
                .map((t, i) => (
                <li key={t.id} className="earn-completed-row">
                  <div>
                    <p className="earn-completed-title">{t.title}</p>
                    <p className="earn-completed-status">
                      {i === 0 ? 'Approved · paid to your balance' : 'In review · funds release on approval'}
                    </p>
                  </div>
                  <span className="earn-completed-pay">+${t.payout}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {earnTab === 'stats' && (
        <div className="earn-panel earn-stats">
          <div className="earn-stat-grid">
            <div className="earn-stat-card">
              <span className="earn-stat-k">Submitted value</span>
              <span className="earn-stat-v earn-stat-money">${totalPending}</span>
              <span className="earn-stat-d">Total you’ve put in for approval</span>
            </div>
            <div className="earn-stat-card">
              <span className="earn-stat-k">Tasks done</span>
              <span className="earn-stat-v">{completedTasks.length}</span>
              <span className="earn-stat-d">All-time submissions</span>
            </div>
            <div className="earn-stat-card">
              <span className="earn-stat-k">Avg / task</span>
              <span className="earn-stat-v earn-stat-money">{completedTasks.length ? `$${avgPayout}` : '—'}</span>
              <span className="earn-stat-d">Based on submitted</span>
            </div>
            <div className="earn-stat-card">
              <span className="earn-stat-k">Still open</span>
              <span className="earn-stat-v">{openTasks.length}</span>
              <span className="earn-stat-d">You can earn more</span>
            </div>
          </div>

          <div className="earn-stats-split">
            <div className="earn-stats-split-cell">
              <span className="earn-split-k">Paid to balance</span>
              <span className="earn-split-v">${paidToBalance}</span>
              <span className="earn-split-d">Approved & released</span>
            </div>
            <div className="earn-stats-split-cell">
              <span className="earn-split-k">In review</span>
              <span className="earn-split-v earn-split-v-dim">${inReviewValue}</span>
              <span className="earn-split-d">Pending approval</span>
            </div>
          </div>

          {completedTasks.length > 0 && (
            <p className="earn-stats-mix">
              Mix: <strong>{creativeDone}</strong> Creative · <strong>{microDone}</strong> Micro
            </p>
          )}

          <EarnWeekBars values={weekActivity} />

          <div className="earn-progress-block">
            <div className="earn-progress-head">
              <span>Progress to “power user”</span>
              <span className="earn-progress-pct">{powerUserPct}%</span>
            </div>
            <div className="earn-progress-bar">
              <div className="earn-progress-track" style={{ width: `${powerUserPct}%` }}>
                <div className="earn-progress-fill earn-progress-fill-anim" />
              </div>
            </div>
            <p className="earn-progress-copy">Every approved task levels this up — Whop uses it later for better matches (prototype).</p>
          </div>

          <div className="earn-tip">
            <span className="earn-tip-label">Recommendation</span>
            <p className="earn-tip-text">{tip}</p>
          </div>
        </div>
      )}
    </div>
  )
}

function TaskDetail({ task, done, onStart }) {
  return (
    <div className="screen">
      <div className="detail-hero">
        <div>
          <h2 className="dh-title">{task.title}</h2>
          <span className="dh-brand">by {task.brand}</span>
        </div>
      </div>

      <div className="detail-stats">
        <div className="stat"><span className="stat-num">${task.payout}</span><span className="stat-lbl">payout</span></div>
        <div className="stat"><span className="stat-num">{task.time}</span><span className="stat-lbl">est. time</span></div>
        <div className="stat"><span className="stat-num">{task.slots}</span><span className="stat-lbl">slots left</span></div>
      </div>

      <div className="escrow"><Icon name="lock" size={15} /> Funds secured. ${task.payout} is locked in escrow for this task.</div>

      <h3 className="detail-h">What to do</h3>
      <ol className="steps">
        {task.steps.map((s, i) => (
          <li key={i}><span className="step-n">{i + 1}</span>{s}</li>
        ))}
      </ol>

      <h3 className="detail-h">Approval rules</h3>
      <div className="rules">
        {task.rules.map((r) => <span key={r} className="rule">✓ {r}</span>)}
      </div>

      <div className="sticky-cta">
        <button className="primary-btn" onClick={onStart}>
          {done ? 'Submit again' : `Start task · earn $${task.payout}`}
        </button>
      </div>
    </div>
  )
}

function SubmitTask({ task, onSubmit }) {
  const [link, setLink] = useState('')
  const [toFeed, setToFeed] = useState(true)
  const ready = link.trim().length > 4

  return (
    <div className="screen">
      <h2 className="screen-h1">Submit your proof</h2>
      <p className="screen-sub">Drop the link or upload a screenshot.</p>

      <label className="field-label">Post link</label>
      <input
        className="field"
        placeholder="https://tiktok.com/@you/video/…"
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />

      <button className="upload"><Icon name="upload" size={16} /> or upload a screenshot / video</button>

      <button className={`feed-toggle ${toFeed ? 'on' : ''}`} onClick={() => setToFeed((v) => !v)}>
        <span className="ft-body">
          <strong>Post to the Whop feed</strong>
          <small>Your submission shows on the feed and helps others discover Whop</small>
        </span>
        <span className="ft-switch"><span className="knob" /></span>
      </button>

      <div className="sticky-cta">
        <button className="primary-btn" disabled={!ready} onClick={onSubmit}>
          {ready ? `Post & submit · $${task.payout}` : 'Add a link to continue'}
        </button>
      </div>
    </div>
  )
}

function Done({ task, onMore, onClose }) {
  return (
    <div className="screen done-screen">
      <AnimatedDoneCheck label="Task submitted" />
      <h2 className="done-h">Posted to the feed!</h2>
      <p className="done-sub">Your submission is in review. You’ll be paid <strong>${task.payout}</strong> the moment it’s approved.</p>

      <div className="feed-post feed-post--done-preview stagger" style={{ animationDelay: '90ms' }}>
        <div className="fp-head">
          <span className="fp-avatar">JR</span>
          <div>
            <span className="fp-name">John R.</span>
            <span className="fp-task">{task.title}</span>
          </div>
          <span className="fp-pay">+${task.payout}</span>
        </div>
        <div className="fp-media fp-media--submission">
          <Icon name="play" size={20} />
          <span>Your submission</span>
        </div>
        <ul className="done-steps" aria-label="Payout status">
          <li className="done-steps__item done-steps__item--complete">
            <span className="done-steps__bullet" aria-hidden />
            <div>
              <span className="done-steps__title">Submitted</span>
              <span className="done-steps__meta">Proof sent · visible on your feed</span>
            </div>
          </li>
          <li className="done-steps__item done-steps__item--current">
            <span className="done-steps__bullet" aria-hidden />
            <div>
              <span className="done-steps__title">Under review</span>
              <span className="done-steps__meta">Brand checks quality · usually under 48h</span>
            </div>
          </li>
          <li className="done-steps__item">
            <span className="done-steps__bullet" aria-hidden />
            <div>
              <span className="done-steps__title">Paid</span>
              <span className="done-steps__meta">${task.payout} releases to your balance on approval</span>
            </div>
          </li>
        </ul>
      </div>

      <div className="sticky-cta col">
        <button className="primary-btn" onClick={onMore}>Do another task</button>
        <button className="ghost-btn" onClick={onClose}>Back to Discover</button>
      </div>
    </div>
  )
}
