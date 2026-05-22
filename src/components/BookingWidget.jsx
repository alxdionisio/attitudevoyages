import React, { useEffect, useMemo, useState } from "react";
import "./BookingWidget.css";

const MONTHS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];
const WEEKDAYS_FR = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];

// Icônes pour les 3 types de consultation (mapping par slug).
const TYPE_ICONS = {
  "premier-contact": (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  ),
  "devis-detaille": (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="9" y1="13" x2="15" y2="13" />
      <line x1="9" y1="17" x2="15" y2="17" />
    </svg>
  ),
  "bilan-retour-voyage": (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      <circle cx="12" cy="12" r="10" />
    </svg>
  ),
};

const FALLBACK_ICON = (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

function formatLongDate(iso) {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

function formatLongDateTime(iso) {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

const BookingWidget = () => {
  const [step, setStep] = useState(1);
  const [types, setTypes] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const [days, setDays] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [slotError, setSlotError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
    website: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // Chargement des types
  useEffect(() => {
    let cancelled = false;
    fetch("/api/consultation-types")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.ok) setTypes(data.types);
        else setTypes([]);
      })
      .catch(() => !cancelled && setTypes([]));
    return () => { cancelled = true; };
  }, []);

  // Chargement des créneaux quand le type change
  useEffect(() => {
    if (!selectedType) return;
    let cancelled = false;
    setLoadingSlots(true);
    setSlotError(null);
    setDays(null);
    fetch(`/api/availability?type=${encodeURIComponent(selectedType.id)}`)
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data.ok) setDays(data.days);
        else setSlotError(data.error || "Impossible de charger les créneaux.");
      })
      .catch(() => !cancelled && setSlotError("Erreur réseau."))
      .finally(() => !cancelled && setLoadingSlots(false));
    return () => { cancelled = true; };
  }, [selectedType]);

  const availableDates = useMemo(() => {
    if (!days) return [];
    return days.filter((d) => d.slots.length > 0).map((d) => d.date);
  }, [days]);

  const slotsForSelectedDate = useMemo(() => {
    if (!days || !selectedDate) return [];
    const found = days.find((d) => d.date === selectedDate);
    return found?.slots ?? [];
  }, [days, selectedDate]);

  // Groupe les créneaux matin / après-midi
  const groupedSlots = useMemo(() => {
    const morning = [];
    const afternoon = [];
    for (const s of slotsForSelectedDate) {
      const h = parseInt(s.label.slice(0, 2), 10);
      (h < 13 ? morning : afternoon).push(s);
    }
    return { morning, afternoon };
  }, [slotsForSelectedDate]);

  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0]);
    }
  }, [availableDates, selectedDate]);

  const handlePickType = (type) => {
    setSelectedType(type);
    setSelectedDate(null);
    setSelectedSlot(null);
    setStep(2);
  };

  const handlePickSlot = (slot) => {
    setSelectedSlot(slot);
    setStep(3);
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          consultationTypeId: selectedType.id,
          startAt: selectedSlot.startAt,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          message: form.message,
          consent: form.consent,
          website: form.website,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setConfirmedBooking(data.booking);
        setStep(4);
        return;
      }

      if (res.status === 429) {
        const mins = Math.max(1, Math.round((data.retryAfter || 600) / 60));
        setSubmitError(
          `Trop de tentatives. Réessayez dans ${mins} min ou appelez-nous au 04 66 37 48 63.`
        );
        return;
      }

      if (res.status === 409 && selectedType) {
        setSubmitError(
          data.error ||
            "Ce créneau vient d'être réservé. On rafraîchit les disponibilités, choisissez-en un autre."
        );
        setLoadingSlots(true);
        setDays(null);
        try {
          const av = await fetch(
            `/api/availability?type=${encodeURIComponent(selectedType.id)}`
          ).then((r) => r.json());
          if (av.ok) setDays(av.days);
        } catch {
          /* l'utilisateur peut retry depuis l'écran */
        } finally {
          setLoadingSlots(false);
        }
        setSelectedSlot(null);
        setStep(2);
        return;
      }

      setSubmitError(data.error || "La réservation a échoué.");
    } catch (err) {
      setSubmitError("Erreur réseau. Vérifiez votre connexion et réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setStep(1);
    setSelectedType(null);
    setSelectedDate(null);
    setSelectedSlot(null);
    setForm({ firstName: "", lastName: "", email: "", phone: "", message: "", consent: false, website: "" });
    setConfirmedBooking(null);
    setSubmitError(null);
  };

  return (
    <div className="bw" aria-label="Module de prise de rendez-vous">
      <Stepper step={step} />

      <div className="bw-content" key={`step-${step}`}>
        {/* ─── Étape 1 : Type de consultation ─── */}
        {step === 1 && (
          <section className="bw-step" aria-labelledby="bw-step1-title">
            <header className="bw-step-header">
              <h3 id="bw-step1-title" className="bw-step-title">
                Quel type de rendez-vous&nbsp;?
              </h3>
              <p className="bw-step-sub">
                Choisissez le format adapté à votre besoin.
              </p>
            </header>
            {types === null && (
              <div className="bw-skeleton-stack" aria-hidden="true">
                <span className="bw-skeleton bw-skeleton--card" />
                <span className="bw-skeleton bw-skeleton--card" />
                <span className="bw-skeleton bw-skeleton--card" />
              </div>
            )}
            {types && types.length === 0 && (
              <p className="bw-error">
                Aucun type de rendez-vous disponible. Contactez-nous au{" "}
                <a href="tel:+33466374863">04 66 37 48 63</a>.
              </p>
            )}
            {types && types.length > 0 && (
              <ul className="bw-types">
                {types.map((t) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      className="bw-type-card"
                      onClick={() => handlePickType(t)}
                    >
                      <span className="bw-type-icon">
                        {TYPE_ICONS[t.slug] || FALLBACK_ICON}
                      </span>
                      <span className="bw-type-info">
                        <span className="bw-type-name">{t.name}</span>
                        <span className="bw-type-duration">
                          {t.duration_minutes}&nbsp;min · {t.price_label}
                        </span>
                        {t.description && (
                          <span className="bw-type-desc">{t.description}</span>
                        )}
                      </span>
                      <span className="bw-type-arrow" aria-hidden>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}

        {/* ─── Étape 2 : Date + Créneau ─── */}
        {step === 2 && selectedType && (
          <section className="bw-step" aria-labelledby="bw-step2-title">
            <button type="button" onClick={() => setStep(1)} className="bw-back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Modifier le type
            </button>
            <header className="bw-step-header">
              <h3 id="bw-step2-title" className="bw-step-title">
                {selectedType.name}
              </h3>
              <p className="bw-step-sub">
                {selectedType.duration_minutes}&nbsp;min · {selectedType.price_label}
              </p>
            </header>

            {loadingSlots && (
              <div className="bw-skeleton-cal" aria-hidden="true">
                <span className="bw-skeleton bw-skeleton--row" />
                <span className="bw-skeleton bw-skeleton--row" />
                <span className="bw-skeleton bw-skeleton--row" />
              </div>
            )}
            {slotError && <p className="bw-error">{slotError}</p>}

            {!loadingSlots && !slotError && days && availableDates.length === 0 && (
              <div className="bw-empty">
                <div className="bw-empty-icon" aria-hidden="true">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <p>
                  Aucun créneau disponible dans les {days.length} prochains jours.
                </p>
                <p>
                  Appelez-nous au <a href="tel:+33466374863">04&nbsp;66&nbsp;37&nbsp;48&nbsp;63</a>{" "}
                  ou écrivez à{" "}
                  <a href="mailto:contact@attitude-voyages.fr">
                    contact@attitude-voyages.fr
                  </a>{" "}
                  pour un rendez-vous différé.
                </p>
              </div>
            )}

            {!loadingSlots && !slotError && days && availableDates.length > 0 && (
              <>
                <DatePicker
                  days={days}
                  selectedDate={selectedDate}
                  onSelect={setSelectedDate}
                />

                <div className="bw-slots-wrap">
                  <h4 className="bw-slots-title">
                    {selectedDate
                      ? `Horaires du ${formatLongDate(selectedDate)}`
                      : "Choisissez une date ci-dessus"}
                  </h4>
                  {selectedDate && slotsForSelectedDate.length === 0 && (
                    <p className="bw-loading">Aucun créneau disponible ce jour.</p>
                  )}
                  {selectedDate && groupedSlots.morning.length > 0 && (
                    <SlotGroup label="Matin" slots={groupedSlots.morning} onPick={handlePickSlot} />
                  )}
                  {selectedDate && groupedSlots.afternoon.length > 0 && (
                    <SlotGroup label="Après-midi" slots={groupedSlots.afternoon} onPick={handlePickSlot} />
                  )}
                </div>
              </>
            )}
          </section>
        )}

        {/* ─── Étape 3 : Formulaire ─── */}
        {step === 3 && selectedType && selectedSlot && (
          <section className="bw-step" aria-labelledby="bw-step3-title">
            <button type="button" onClick={() => setStep(2)} className="bw-back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Modifier le créneau
            </button>
            <header className="bw-step-header">
              <h3 id="bw-step3-title" className="bw-step-title">Vos coordonnées</h3>
              <p className="bw-step-sub">
                Quelques infos pour finaliser votre rendez-vous.
              </p>
            </header>
            <div className="bw-recap">
              <span className="bw-recap-icon" aria-hidden="true">
                {TYPE_ICONS[selectedType.slug] || FALLBACK_ICON}
              </span>
              <div>
                <strong>{selectedType.name}</strong>
                <span className="bw-recap-when">{formatLongDateTime(selectedSlot.startAt)} · {selectedType.duration_minutes}&nbsp;min</span>
              </div>
            </div>

            <form onSubmit={handleSubmitBooking} className="bw-form" noValidate>
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}
              />
              <div className="bw-form-row">
                <label>
                  <span className="bw-label">Prénom *</span>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={80}
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  />
                </label>
                <label>
                  <span className="bw-label">Nom *</span>
                  <input
                    type="text"
                    required
                    minLength={2}
                    maxLength={80}
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  />
                </label>
              </div>
              <label>
                <span className="bw-label">Email *</span>
                <input
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </label>
              <label>
                <span className="bw-label">Téléphone *</span>
                <input
                  type="tel"
                  required
                  autoComplete="tel"
                  pattern="^[+0-9 .()\-]{8,30}$"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </label>
              <label>
                <span className="bw-label">Message (optionnel)</span>
                <textarea
                  rows={4}
                  maxLength={2000}
                  placeholder="Destination envisagée, dates approximatives, nombre de voyageurs…"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </label>
              <label className="bw-consent">
                <input
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                />
                <span>
                  J'accepte que ces informations soient utilisées pour traiter ma
                  demande de rendez-vous.{" "}
                  <a href="/politique-confidentialite">Voir la politique de confidentialité</a>.
                </span>
              </label>

              {submitError && <p className="bw-error" role="alert">{submitError}</p>}

              <button type="submit" className="bw-submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <span className="bw-spinner" aria-hidden="true" />
                    Réservation en cours…
                  </>
                ) : (
                  <>Confirmer le rendez-vous</>
                )}
              </button>
            </form>
          </section>
        )}

        {/* ─── Étape 4 : Confirmation ─── */}
        {step === 4 && confirmedBooking && (
          <section className="bw-step bw-confirm" aria-labelledby="bw-step4-title">
            <div className="bw-confirm-icon" aria-hidden>
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h3 id="bw-step4-title" className="bw-step-title">Votre rendez-vous est confirmé</h3>
            <div className="bw-confirm-card">
              <span className="bw-confirm-when">
                {formatLongDateTime(confirmedBooking.startAt)}
              </span>
              <span className="bw-confirm-type">
                {confirmedBooking.type} · {confirmedBooking.durationMinutes}&nbsp;min
              </span>
            </div>
            <p className="bw-confirm-text">
              Un email de confirmation vient de vous être envoyé. Si vous ne le recevez pas
              dans les prochaines minutes, vérifiez votre dossier spam ou appelez-nous au{" "}
              <a href="tel:+33466374863">04&nbsp;66&nbsp;37&nbsp;48&nbsp;63</a>.
            </p>
            <button type="button" className="bw-back" onClick={reset}>
              Réserver un autre rendez-vous
            </button>
          </section>
        )}
      </div>
    </div>
  );
};

// ─── Stepper ──────────────────────────────────────────────────────────
function Stepper({ step }) {
  const labels = ["Type", "Créneau", "Coordonnées", "Confirmation"];
  return (
    <ol className="bw-stepper" aria-label="Étapes de réservation">
      {labels.map((label, i) => {
        const n = i + 1;
        const state = step > n ? "done" : step === n ? "active" : "todo";
        return (
          <li key={label} className={`bw-step-pill bw-step-pill--${state}`}>
            <span className="bw-step-num" aria-hidden>
              {state === "done" ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              ) : (
                n
              )}
            </span>
            <span className="bw-step-label">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

// ─── Groupage des créneaux (matin / après-midi) ──────────────────────
function SlotGroup({ label, slots, onPick }) {
  return (
    <div className="bw-slot-group">
      <h5 className="bw-slot-group-title">{label}</h5>
      <div className="bw-slots">
        {slots.map((s) => (
          <button
            key={s.startAt}
            type="button"
            className="bw-slot"
            onClick={() => onPick(s)}
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Mini calendrier en ruban ────────────────────────────────────────
function DatePicker({ days, selectedDate, onSelect }) {
  const byMonth = useMemo(() => {
    const map = new Map();
    for (const d of days) {
      const month = d.date.slice(0, 7);
      if (!map.has(month)) map.set(month, []);
      map.get(month).push(d);
    }
    return [...map.entries()];
  }, [days]);

  return (
    <div className="bw-calendar" role="group" aria-label="Choix de la date">
      {byMonth.map(([month, monthDays]) => (
        <div key={month} className="bw-month">
          <h5 className="bw-month-title">{formatMonthTitle(month)}</h5>
          <div className="bw-days">
            {monthDays.map((d) => {
              const dt = new Date(`${d.date}T12:00:00`);
              const isAvailable = d.slots.length > 0;
              const isSelected = d.date === selectedDate;
              const weekday = WEEKDAYS_FR[(dt.getDay() + 6) % 7];
              const dayNum = dt.getDate();
              return (
                <button
                  key={d.date}
                  type="button"
                  disabled={!isAvailable}
                  aria-pressed={isSelected}
                  onClick={() => isAvailable && onSelect(d.date)}
                  className={[
                    "bw-day",
                    isAvailable ? "bw-day--available" : "bw-day--off",
                    isSelected ? "bw-day--selected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span className="bw-day-weekday">{weekday}</span>
                  <span className="bw-day-num">{dayNum}</span>
                  {isAvailable && !isSelected && (
                    <span className="bw-day-dot" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

function formatMonthTitle(yyyyMm) {
  const [y, m] = yyyyMm.split("-").map(Number);
  return `${MONTHS_FR[m - 1]} ${y}`;
}

export default BookingWidget;
