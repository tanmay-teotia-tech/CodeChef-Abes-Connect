// src/pages/Home.jsx
// Landing page: Hero → About → Stats → Upcoming Events → Featured Event

import { Link } from "react-router-dom";
import events from "../data/events";
import EventCard from "../components/EventCard";
import { getUpcomingEvents, formatDate } from "../utils/helpers";

// ── Stats — edit these numbers to keep them up to date ──────
const STATS = [
  { number: "350+",  label: "Club Members"     },
  { number: "40+",   label: "Events Held"      },
  { number: "15+",   label: "Workshops Run"    },
  { number: "12,000+", label: "Problems Solved" },
];

// ── Three pillars of the club ────────────────────────────────
const PILLARS = [
  {
    icon: "📚",
    title: "Learn",
    desc: "DSA bootcamps, workshops and peer-learning sessions for every level.",
  },
  {
    icon: "🏆",
    title: "Compete",
    desc: "Monthly contests, mock rounds and hackathons with real prizes.",
  },
  {
    icon: "🛠️",
    title: "Build",
    desc: "Hack on real projects, ship portfolios and grow as a developer.",
  },
];

export default function Home() {
  // Next 3 upcoming events (fallback to first 3 if none are upcoming)
  const upcomingEvents = getUpcomingEvents(events, 3);

  // The one event marked featured: true
  const featuredEvent = events.find((e) => e.featured);

  return (
    <main>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero__inner">
          {/* Left: text content */}
          <div className="hero__content">
            <p className="hero__eyebrow">// ABES Engineering College, Ghaziabad</p>
            <h1 id="hero-title" className="hero__title">
              &lt;/&gt; CodeChef<br />Chapter
            </h1>
            <p className="hero__tagline">Code. Compete. Create.</p>
            <p className="hero__desc">
              Your college's competitive programming and tech community — where
              coders, hackers and builders come together to grow, compete and ship
              things that matter.
            </p>
            <div className="hero__actions">
              <Link to="/events" className="btn btn-primary">
                📅 View Events
              </Link>
              <Link to="/register" className="btn btn-outline-inv">
                Register Now →
              </Link>
            </div>
          </div>

          {/* Right: fake code editor window */}
          <div aria-hidden="true">
            <div className="code-window">
              <div className="code-window__bar">
                <span className="code-window__dot dot-red"></span>
                <span className="code-window__dot dot-yellow"></span>
                <span className="code-window__dot dot-green"></span>
                <span className="code-window__filename">solution.cpp</span>
              </div>
              <div className="code-window__body">
                <div>
                  <span className="c-comment">// CodeChef ABES — Monthly Contest</span>
                </div>
                <div>
                  <span className="c-keyword">#include</span>
                  <span className="c-str"> &lt;bits/stdc++.h&gt;</span>
                </div>
                <div>
                  <span className="c-keyword">using namespace</span>
                  <span className="c-plain"> std;</span>
                </div>
                <br />
                <div>
                  <span className="c-keyword">int</span>
                  <span className="c-fn"> solve</span>
                  <span className="c-plain">(</span>
                  <span className="c-keyword">int</span>
                  <span className="c-plain"> n) {"{"}</span>
                </div>
                <div>
                  <span className="c-plain">&nbsp;&nbsp;</span>
                  <span className="c-keyword">if</span>
                  <span className="c-plain"> (n == </span>
                  <span className="c-num">0</span>
                  <span className="c-plain">) </span>
                  <span className="c-keyword">return</span>
                  <span className="c-num"> 1</span>
                  <span className="c-plain">;</span>
                </div>
                <div>
                  <span className="c-plain">&nbsp;&nbsp;</span>
                  <span className="c-keyword">return</span>
                  <span className="c-plain"> n * </span>
                  <span className="c-fn">solve</span>
                  <span className="c-plain">(n - </span>
                  <span className="c-num">1</span>
                  <span className="c-plain">);</span>
                </div>
                <div>
                  <span className="c-plain">{"}"}</span>
                </div>
                <br />
                <div>
                  <span className="c-comment">// AC ✓ — 0ms, 3.8MB</span>
                </div>
                <div>
                  <span className="c-orange">█</span>
                  <span className="c-comment"> &nbsp;// your turn →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT / PILLARS ────────────────────────────────── */}
      <section className="section about-section" aria-labelledby="about-title">
        <div className="container about__grid">
          <div className="about__text">
            <p className="section-label">// about_us</p>
            <h2 id="about-title" className="section-title">Who We Are</h2>
            <p>
              CodeChef Chapter at ABES Engineering College is the go-to community
              for students who love problem-solving, competitive programming and
              building cool things with code.
            </p>
            <p>
              We run coding contests, hackathons, DSA bootcamps, workshops and
              expert talks — creating a space where juniors and seniors learn from
              each other and grow together.
            </p>
            <p>
              Whether you're a complete beginner trying your first "Hello World"
              or a seasoned coder aiming for top ranks — there's a place for you
              here.
            </p>
          </div>

          {/* 3-pillar cards */}
          <div>
            <div className="pillars">
              {PILLARS.map((p) => (
                <div className="pillar-card" key={p.title}>
                  <div className="pillar-card__icon">{p.icon}</div>
                  <div className="pillar-card__title">{p.title}</div>
                  <div className="pillar-card__desc">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ──────────────────────────────────────────── */}
      <section className="stats-section" aria-label="Club statistics">
        <div className="container">
          <div className="stats-grid">
            {STATS.map((s) => (
              <div className="stat-card" key={s.label}>
                <div className="stat-card__number">{s.number}</div>
                <div className="stat-card__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ────────────────────────────────── */}
      <section className="section upcoming-section" aria-labelledby="upcoming-title">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="section-label">// upcoming_events</p>
              <h2 id="upcoming-title" className="section-title">What's Coming Up</h2>
            </div>
            <Link to="/events" className="btn btn-outline">
              View All Events →
            </Link>
          </div>

          <div className="events-grid">
            {upcomingEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED EVENT ─────────────────────────────────── */}
      {featuredEvent && (
        <section className="section featured-section" aria-labelledby="featured-title">
          <div className="container">
            <p className="section-label">// featured_event</p>
            <h2 className="section-title" style={{ marginBottom: "1.25rem" }}>
              Don't Miss This One
            </h2>

            <div className="featured-banner">
              <div className="featured-banner__content">
                <div className="featured-banner__eyebrow">
                  ⭐ FEATURED · {featuredEvent.category.toUpperCase()}
                </div>
                <h3 id="featured-title" className="featured-banner__title">
                  {featuredEvent.name}
                </h3>
                <div className="featured-banner__meta">
                  <span>📅 {formatDate(featuredEvent.date)}</span>
                  <span>🕐 {featuredEvent.time}</span>
                  <span>📍 {featuredEvent.venue}</span>
                </div>
                <p className="featured-banner__desc">{featuredEvent.description}</p>
                <div style={{ marginTop: "1.25rem" }}>
                  <Link
                    to={`/register?event=${featuredEvent.id}`}
                    className="btn btn-primary"
                  >
                    ⚡ Register Now
                  </Link>
                </div>
              </div>

              <div className="featured-banner__side" aria-hidden="true">
                <div className="featured-banner__emoji">⚡</div>
              </div>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
