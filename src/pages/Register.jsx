// src/pages/Register.jsx
// Event registration form with:
//  - Query-param pre-selection (?event=ID)
//  - Full client-side validation with inline error messages
//  - Duplicate registration check (same email + event)
//  - localStorage save via helpers
//  - Success banner after submit

import { useRef, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import events from "../data/events";
import { formatDate, saveRegistration, isDuplicateRegistration } from "../utils/helpers";

// ── Validation rules ──────────────────────────────────────────
function validate(fields) {
  const errors = {};

  // Name: required, ≥3 chars, letters + spaces only
  if (!fields.name.trim()) {
    errors.name = "Name is required.";
  } else if (fields.name.trim().length < 3) {
    errors.name = "Name must be at least 3 characters.";
  } else if (!/^[a-zA-Z ]+$/.test(fields.name.trim())) {
    errors.name = "Name can only contain letters and spaces.";
  }

  // Email: required, valid format
  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  // College: required
  if (!fields.college.trim()) {
    errors.college = "College name is required.";
  }

  // Year: required (must be a non-empty selection)
  if (!fields.year) {
    errors.year = "Please select your year.";
  }

  // Phone: required, exactly 10 digits, starts with 6/7/8/9
  if (!fields.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^[6-9]\d{9}$/.test(fields.phone.trim())) {
    errors.phone = "Enter a valid 10-digit Indian mobile number (starts with 6–9).";
  }

  // Event: required
  if (!fields.eventId) {
    errors.eventId = "Please select an event.";
  }

  // CodeChef Handle: optional — if filled, 3–20 chars, alphanumeric + underscore
  if (fields.handle.trim() && !/^[a-zA-Z0-9_]{3,20}$/.test(fields.handle.trim())) {
    errors.handle =
      "Handle must be 3–20 characters (letters, numbers, underscore).";
  }

  return errors;
}

// ── Empty form state ──────────────────────────────────────────
const EMPTY_FORM = {
  name: "",
  email: "",
  college: "",
  year: "",
  phone: "",
  eventId: "",
  handle: "",
};

const FIELD_ORDER = ["eventId", "name", "email", "college", "year", "phone", "handle"];

export default function Register() {
  const [searchParams] = useSearchParams();

  // Pre-select event from ?event=ID query param on first render
  const initialEventId = (() => {
    const paramId = searchParams.get("event");
    if (paramId) {
      const match = events.find((e) => String(e.id) === String(paramId));
      if (match) return String(match.id);
    }
    return "";
  })();

  // Form field values — all controlled inputs
  const [fields, setFields] = useState({ ...EMPTY_FORM, eventId: initialEventId });
  // Field-level validation error messages
  const [errors, setErrors] = useState({});
  // Submission states
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [duplicateMsg, setDuplicateMsg] = useState("");
  const [saveErrorMsg, setSaveErrorMsg] = useState("");
  const fieldRefs = useRef({});

  // The currently selected event object (for the info card above the form)
  const selectedEvent = events.find((e) => String(e.id) === String(fields.eventId));

  // Update a single field; clear its error and any duplicate message
  function handleChange(e) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setDuplicateMsg("");
    setSaveErrorMsg("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setDuplicateMsg("");
    setSaveErrorMsg("");

    // 1. Validate all fields
    const newErrors = validate(fields);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      requestAnimationFrame(() => {
        const firstInvalidField = FIELD_ORDER.find((fieldName) => newErrors[fieldName]);
        const targetField = firstInvalidField ? fieldRefs.current[firstInvalidField] : null;

        if (targetField) {
          targetField.scrollIntoView({ behavior: "smooth", block: "center" });
          targetField.focus({ preventScroll: true });
        }
      });
      return;
    }

    // 2. Check for duplicate (same email + same event)
    if (isDuplicateRegistration(fields.email, fields.eventId)) {
      setDuplicateMsg(
        "⚠️ You have already registered for this event with this email address."
      );
      return;
    }

    // 3. Show "Submitting..." to prevent double submit
    setSubmitting(true);

    // Brief simulated delay to mimic network latency
    await new Promise((r) => setTimeout(r, 700));

    // 4. Save to localStorage
    const isSaved = saveRegistration({
      ...fields,
      eventName: selectedEvent?.name || "",
      registeredAt: new Date().toISOString(),
    });

    if (!isSaved) {
      setSubmitting(false);
      setSaveErrorMsg(
        "We could not save your registration on this device. Please check browser storage settings and try again."
      );
      return;
    }

    setSubmitting(false);
    setSuccess(true);

    // 5. Reset form
    setFields({ ...EMPTY_FORM, eventId: initialEventId });
    setErrors({});
  }

  return (
    <main>
      {/* ── Page header ──────────────────────────────────── */}
      <div className="register-page__header">
        <div className="container">
          <p className="section-label">// join_us</p>
          <h1 className="section-title">Event Registration</h1>
        </div>
      </div>

      <div className="register-page">
        <div className="container register-page__inner">

          {/* ── Left column: selected event info + context ── */}
          <div className="register-page__info">
            {/* Show selected event card when an event is chosen */}
            {selectedEvent ? (
              <div className="register-event-info">
                <div className="register-event-info__label">// registering_for</div>
                <div className="register-event-info__name">{selectedEvent.name}</div>
                <div className="register-event-info__meta">
                  <span><span aria-hidden="true">📅</span> {formatDate(selectedEvent.date)}</span>
                  <span><span aria-hidden="true">🕐</span> {selectedEvent.time}</span>
                  <span><span aria-hidden="true">📍</span> {selectedEvent.venue}</span>
                </div>
              </div>
            ) : (
              <div className="register-event-info">
                <div className="register-event-info__label">// select_event</div>
                <div className="register-event-info__name register-event-info__name--muted">
                  No event selected yet
                </div>
                <div className="register-event-info__meta register-event-info__meta--muted">
                  Choose an event from the dropdown to see its details here.
                </div>
              </div>
            )}

            {/* Help context blurb */}
            <div
              style={{
                background: "var(--clr-brand-light)",
                border: "1px solid var(--clr-border)",
                borderRadius: "var(--radius-md)",
                padding: "1.25rem",
                fontSize: "0.85rem",
                color: "var(--clr-text-muted)",
                lineHeight: "1.65",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--clr-brand)",
                  marginBottom: "0.4rem",
                  fontSize: "0.75rem",
                }}
              >
                // need_help?
              </p>
              <p>
                Having trouble registering? Reach out to any club representative.
              </p>
              <p style={{ marginTop: "0.6rem" }}>
                Browse{" "}
                <Link
                  to="/events"
                  style={{ color: "var(--clr-brand)", fontWeight: 600 }}
                >
                  all events
                </Link>{" "}
                to find the one that's right for you.
              </p>
            </div>
          </div>

          {/* ── Right column: registration form ────────────── */}
          <div>
            {/* Success banner — shown after successful submit */}
            {success && (
              <div className="success-banner" role="status">
                <div className="success-banner__icon">✅</div>
                <div className="success-banner__title">
                  Registration Successful!
                </div>
                <div className="success-banner__desc">
                  You're registered. See you there! 🎉
                  <br />
                  Check your email for confirmation details.
                </div>
                <button
                  className="btn btn-outline"
                  onClick={() => setSuccess(false)}
                  style={{
                    marginTop: "1rem",
                    borderColor: "#10b981",
                    color: "#065f46",
                  }}
                >
                  Register for Another Event
                </button>
              </div>
            )}

            {/* The form — hidden after success */}
            {!success && (
              <div className="register-form-card">
                <div className="register-form-card__title">
                  &lt;/&gt; Fill in your details
                </div>

                {/* Duplicate registration warning */}
                {duplicateMsg && (
                  <div className="duplicate-banner" role="alert">
                    {duplicateMsg}
                  </div>
                )}
                {saveErrorMsg && (
                  <div className="error-banner" role="alert">
                    ⚠️ {saveErrorMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>

                  {/* Event selection — dropdown */}
                  <div className="form-group">
                    <label htmlFor="reg-event">Event</label>
                    <select
                      ref={(node) => { fieldRefs.current.eventId = node; }}
                      id="reg-event"
                      name="eventId"
                      value={fields.eventId}
                      onChange={handleChange}
                      className={`${errors.eventId ? "error " : ""}${!fields.eventId ? "is-placeholder" : ""}`.trim()}
                      aria-describedby={errors.eventId ? "reg-event-error" : undefined}
                      aria-invalid={Boolean(errors.eventId)}
                    >
                      <option value="">Select an event</option>
                      {events.map((ev) => (
                        <option key={ev.id} value={String(ev.id)}>
                          {ev.name} — {formatDate(ev.date)}
                        </option>
                      ))}
                    </select>
                    {errors.eventId && (
                      <span id="reg-event-error" className="field-error" role="alert">
                        ⚠ {errors.eventId}
                      </span>
                    )}
                  </div>

                  {/* Full Name */}
                  <div className="form-group">
                    <label htmlFor="reg-name">Full Name</label>
                    <input
                      ref={(node) => { fieldRefs.current.name = node; }}
                      id="reg-name"
                      type="text"
                      name="name"
                      value={fields.name}
                      onChange={handleChange}
                      placeholder="e.g. Arjun Sharma"
                      className={errors.name ? "error" : ""}
                      aria-describedby={errors.name ? "reg-name-error" : undefined}
                      aria-invalid={Boolean(errors.name)}
                    />
                    {errors.name && (
                      <span id="reg-name-error" className="field-error" role="alert">
                        ⚠ {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <label htmlFor="reg-email">Email Address</label>
                    <input
                      ref={(node) => { fieldRefs.current.email = node; }}
                      id="reg-email"
                      type="email"
                      name="email"
                      value={fields.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={errors.email ? "error" : ""}
                      aria-describedby={errors.email ? "reg-email-error" : undefined}
                      aria-invalid={Boolean(errors.email)}
                    />
                    {errors.email && (
                      <span id="reg-email-error" className="field-error" role="alert">
                        ⚠ {errors.email}
                      </span>
                    )}
                  </div>

                  {/* College */}
                  <div className="form-group">
                    <label htmlFor="reg-college">College Name</label>
                    <input
                      ref={(node) => { fieldRefs.current.college = node; }}
                      id="reg-college"
                      type="text"
                      name="college"
                      value={fields.college}
                      onChange={handleChange}
                      placeholder="e.g. ABES Engineering College"
                      className={errors.college ? "error" : ""}
                      aria-describedby={errors.college ? "reg-college-error" : undefined}
                      aria-invalid={Boolean(errors.college)}
                    />
                    {errors.college && (
                      <span id="reg-college-error" className="field-error" role="alert">
                        ⚠ {errors.college}
                      </span>
                    )}
                  </div>

                  {/* Year — dropdown */}
                  <div className="form-group">
                    <label htmlFor="reg-year">Year of Study</label>
                    <select
                      ref={(node) => { fieldRefs.current.year = node; }}
                      id="reg-year"
                      name="year"
                      value={fields.year}
                      onChange={handleChange}
                      className={`${errors.year ? "error " : ""}${!fields.year ? "is-placeholder" : ""}`.trim()}
                      aria-describedby={errors.year ? "reg-year-error" : undefined}
                      aria-invalid={Boolean(errors.year)}
                    >
                      <option value="">Select year</option>
                      <option value="1st">1st Year</option>
                      <option value="2nd">2nd Year</option>
                      <option value="3rd">3rd Year</option>
                      <option value="4th">4th Year</option>
                    </select>
                    {errors.year && (
                      <span id="reg-year-error" className="field-error" role="alert">
                        ⚠ {errors.year}
                      </span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="form-group">
                    <label htmlFor="reg-phone">Phone Number</label>
                    <input
                      ref={(node) => { fieldRefs.current.phone = node; }}
                      id="reg-phone"
                      type="tel"
                      name="phone"
                      value={fields.phone}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className={errors.phone ? "error" : ""}
                      aria-describedby={errors.phone ? "reg-phone-error" : undefined}
                      aria-invalid={Boolean(errors.phone)}
                    />
                    {errors.phone && (
                      <span id="reg-phone-error" className="field-error" role="alert">
                        ⚠ {errors.phone}
                      </span>
                    )}
                  </div>

                  {/* CodeChef Handle — clearly labelled optional */}
                  <div className="form-group">
                    <label htmlFor="reg-handle">
                      CodeChef Handle
                      <span className="optional-label">(optional)</span>
                    </label>
                    <input
                      ref={(node) => { fieldRefs.current.handle = node; }}
                      id="reg-handle"
                      type="text"
                      name="handle"
                      value={fields.handle}
                      onChange={handleChange}
                      placeholder="e.g. arjun_codes"
                      className={errors.handle ? "error" : ""}
                      aria-describedby={errors.handle ? "reg-handle-error" : undefined}
                      aria-invalid={Boolean(errors.handle)}
                    />
                    {errors.handle && (
                      <span id="reg-handle-error" className="field-error" role="alert">
                        ⚠ {errors.handle}
                      </span>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={submitting}
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      marginTop: "0.5rem",
                    }}
                  >
                    {submitting ? "Submitting..." : "⚡ Register"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
