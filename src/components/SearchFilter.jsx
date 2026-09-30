// src/components/SearchFilter.jsx
// Search input + category dropdown used on the Events page.
// Props:
//   search       — current search string (controlled)
//   category     — current selected category (controlled)
//   onSearch     — setter for search string
//   onCategory   — setter for category

const CATEGORIES = ["All", "Contest", "Hackathon", "Workshop", "Seminar", "Bootcamp"];

export default function SearchFilter({ search, category, onSearch, onCategory }) {
  return (
    <div className="search-filter">
      {/* Live search input */}
      <div className="search-filter__input-wrap">
        <span className="search-filter__icon" aria-hidden="true">🔍</span>
        <input
          id="event-search"
          type="search"
          className="search-filter__input"
          placeholder="Search events by name..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          aria-label="Search events by name"
        />
      </div>

      {/* Category filter dropdown */}
      <label htmlFor="category-filter" className="visually-hidden">
        Filter by category
      </label>
      <select
        id="category-filter"
        className="search-filter__select"
        value={category}
        onChange={(e) => onCategory(e.target.value)}
        aria-label="Filter events by category"
      >
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat === "All" ? "All Categories" : cat}
          </option>
        ))}
      </select>
    </div>
  );
}
