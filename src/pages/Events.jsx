// src/pages/Events.jsx
// Events listing page with live search and category filter.

import { useState, useMemo } from "react";
import events from "../data/events";
import EventCard from "../components/EventCard";
import SearchFilter from "../components/SearchFilter";

export default function Events() {
  // Controlled state for search text and selected category
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  // Filter events based on current search + category — recomputed only when inputs change
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return events.filter((e) => {
      const matchesSearch = q === "" || e.name.toLowerCase().includes(q);
      const matchesCategory = category === "All" || e.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  function clearFilters() {
    setSearch("");
    setCategory("All");
  }

  const hasFilters = search !== "" || category !== "All";

  return (
    <main>
      {/* ── Page header ──────────────────────────────────── */}
      <div className="events-page__header">
        <div className="container">
          <p className="section-label">// all_events</p>
          <h1 className="section-title">Events & Activities</h1>
          <p className="section-subtitle">
            Contests, workshops, hackathons and more — find what excites you and
            jump in.
          </p>
        </div>
      </div>

      {/* ── Search + filter + grid ────────────────────────── */}
      <section className="section" style={{ paddingTop: "2rem" }}>
        <div className="container">
          <SearchFilter
            search={search}
            category={category}
            onSearch={setSearch}
            onCategory={setCategory}
          />

          {/* Results count */}
          <p
            style={{
              fontSize: "0.82rem",
              color: "var(--clr-text-muted)",
              marginBottom: "1.25rem",
              fontFamily: "var(--font-mono)",
            }}
          >
            {/* "// showing N events" comment style */}
            {`// showing ${filtered.length} of ${events.length} event${events.length !== 1 ? "s" : ""}`}
          </p>

          {/* Event cards grid */}
          <div className="events-all-grid">
            {filtered.length > 0 ? (
              filtered.map((event) => <EventCard key={event.id} event={event} />)
            ) : (
              /* Empty state — friendly message with clear filters */
              <div className="empty-state">
                <div className="empty-state__icon">🔎</div>
                <h2 className="empty-state__title">No events found</h2>
                <p className="empty-state__desc">
                  {hasFilters
                    ? `No events match "${search || category}". Try a different search or category.`
                    : "There are no events to show right now. Check back soon!"}
                </p>
                {hasFilters && (
                  <button className="btn btn-outline" onClick={clearFilters}>
                    ✕ Clear Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
