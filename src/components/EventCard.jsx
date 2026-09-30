// src/components/EventCard.jsx
// Reusable event card used on both the Home and Events pages.
// Props:
//   event  — one event object from events.js

import { Link } from "react-router-dom";
import { formatDate } from "../utils/helpers";

// Each category maps to an emoji and a CSS class for the colour strip
const CATEGORY_META = {
  Contest:   { emoji: "🏆", stripClass: "strip-contest",   badgeClass: "badge-contest"   },
  Hackathon: { emoji: "⚡", stripClass: "strip-hackathon", badgeClass: "badge-hackathon" },
  Workshop:  { emoji: "🛠️", stripClass: "strip-workshop",  badgeClass: "badge-workshop"  },
  Seminar:   { emoji: "🎤", stripClass: "strip-seminar",   badgeClass: "badge-seminar"   },
  Bootcamp:  { emoji: "🚀", stripClass: "strip-bootcamp",  badgeClass: "badge-bootcamp"  },
};

export default function EventCard({ event }) {
  const meta = CATEGORY_META[event.category] || {
    emoji: "📅",
    stripClass: "strip-contest",
    badgeClass: "badge-contest",
  };

  return (
    <article className="event-card">
      {/* Colour strip at top — category-specific colour */}
      <div className={`event-card__strip ${meta.stripClass}`} aria-hidden="true" />

      <div className="event-card__body">
        {/* Header: name + badge */}
        <div className="event-card__header">
          <h3 className="event-card__name">{event.name}</h3>
          <span className={`badge ${meta.badgeClass}`}>{event.category}</span>
        </div>

        {/* Date, time, venue */}
        <div className="event-card__meta">
          <span><span aria-hidden="true">📅</span> {formatDate(event.date)}</span>
          <span><span aria-hidden="true">🕐</span> {event.time}</span>
          <span><span aria-hidden="true">📍</span> {event.venue}</span>
        </div>

        {/* Short description — clamped to 3 lines in CSS */}
        <p className="event-card__desc">{event.description}</p>
      </div>

      {/* Footer with Register button */}
      <div className="event-card__footer">
        <Link to={`/register?event=${event.id}`} className="btn btn-primary">
          {meta.emoji} Register
        </Link>
      </div>
    </article>
  );
}
