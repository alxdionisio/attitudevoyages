import React, { useEffect, useMemo, useState } from "react";
import "./BookingWidget.css";

const MONTHS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];
const WEEKDAYS_FR = ["lun", "mar", "mer", "jeu", "ven", "sam", "dim"];

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

function isoDateLocal(d) {
  // YYYY-MM-DD en heure locale du browser (le calcul backend est en Europe/Paris,
  // ce qui correspond à la locale FR du client dans la quasi-totalité des cas)
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

const BookingWidget = () => {
  const [step, setStep] = useState(1); // 1=type, 2=slot, 3=form, 4=confirm
  const [types, setTypes] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const [days, setDays] = useState(null);          // array of { date, slots[] }
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
    website: "", // honeypot
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  // 1. Charger les types de consultation au mount
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
    return () => {
      cancelled = true;
    };
  }, []);

  // 2. Charger les créneaux dès qu'un type est choisi
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
    return () => {
      cancelled = true;
    };
  }, [selectedType]);

  // Dates avec au moins un créneau
  const availableDates = useMemo(() => {
    if (!days) return [];
    return days.filter((d) => d.slots.length > 0).map((d) => d.date);
  }, [days]);

  // Slots pour la date sélectionnée
  const slotsForSelectedDate = useMemo(() => {
    if (!days || !selectedDate) return [];
    const found = days.find((d) => d.date === selectedDate);
    return found?.slots ?? [];
  }, [days, selectedDate]);

  // Auto-sélection : première date dispo dès chargement
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

      // 409 = créneau pris entre temps → on raffraîchit les dispos et on revient au step 2
      if (res.status === 409 && selectedType) {
        setSubmitError(
          data.error ||
            "Ce créneau vient d'être réservé. On rafraîchit les disponibilités, choisissez-en un autre."
        );
        // Force le reload de la liste des créneaux
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

      {/* ─── Étape 1 : Type de consultation ─── */}
      {step === 1 && (
        <section className="bw-step" aria-labelledby="bw-step1-title">
          <h3 id="bw-step1-title" className="bw-step-title">
            Choisissez le type de rendez-vous
          </h3>
          {types === null && <p className="bw-loading">Chargement…</p>}
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
                    <span className="bw-type-name">{t.name}</span>
                    <span className="bw-type-duration">{t.duration_minutes} min · {t.price_label}</span>
                    {t.description && (
                      <span className="bw-type-desc">{t.description}</span>
                    )}
                    <span className="bw-type-arrow" aria-hidden>→</span>
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
            ← Modifier le type
          </button>
          <h3 id="bw-step2-title" className="bw-step-title">
            {selectedType.name} · {selectedType.duration_minutes} min
          </h3>

          {loadingSlots && <p className="bw-loading">Chargement des créneaux…</p>}
          {slotError && <p className="bw-error">{slotError}</p>}

          {!loadingSlots && !slotError && days && availableDates.length === 0 && (
            <div className="bw-empty">
              <p>
                Aucun créneau disponible dans les {days.length} prochains jours.
              </p>
              <p>
                Appelez-nous au <a href="tel:+33466374863">04&nbsp;66&nbsp;37&nbsp;48&nbsp;63</a>{" "}
                ou écrivez à{" "}
                <a href="mailto:contact@attitude-voyages.fr">
                  contact@attitude-voyages.fr
                </a>{" "}
                pour organiser un rendez-vous différé.
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
                  {selectedDate ? `Créneaux du ${formatLongDate(selectedDate)}` : "Choisissez une date"}
                </h4>
                {selectedDate && slotsForSelectedDate.length === 0 && (
                  <p className="bw-loading">Aucun créneau disponible ce jour.</p>
                )}
                {selectedDate && slotsForSelectedDate.length > 0 && (
                  <div className="bw-slots">
                    {slotsForSelectedDate.map((s) => (
                      <button
                        key={s.startAt}
                        type="button"
                        className="bw-slot"
                        onClick={() => handlePickSlot(s)}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
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
            ← Modifier le créneau
          </button>
          <h3 id="bw-step3-title" className="bw-step-title">Vos coordonnées</h3>
          <p className="bw-recap">
            <strong>{selectedType.name}</strong> · {formatLongDateTime(selectedSlot.startAt)} · {selectedType.duration_minutes} min
          </p>

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
              {submitting ? "Réservation en cours…" : "Confirmer le rendez-vous"}
            </button>
          </form>
        </section>
      )}

      {/* ─── Étape 4 : Confirmation ─── */}
      {step === 4 && confirmedBooking && (
        <section className="bw-step bw-confirm" aria-labelledby="bw-step4-title">
          <div className="bw-confirm-icon" aria-hidden>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h3 id="bw-step4-title" className="bw-step-title">Rendez-vous confirmé</h3>
          <p className="bw-confirm-text">
            Nous vous attendons le <strong>{formatLongDateTime(confirmedBooking.startAt)}</strong> pour
            votre <strong>{confirmedBooking.type}</strong>.
          </p>
          <p className="bw-confirm-text">
            Un email de confirmation vient de vous être envoyé. Si vous ne le recevez pas dans les
            prochaines minutes, vérifiez votre dossier spam ou appelez-nous au{" "}
            <a href="tel:+33466374863">04 66 37 48 63</a>.
          </p>
          <button type="button" className="bw-back" onClick={reset}>
            Réserver un autre rendez-vous
          </button>
        </section>
      )}
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
            <span className="bw-step-num" aria-hidden>{n}</span>
            <span className="bw-step-label">{label}</span>
          </li>
        );
      })}
    </ol>
  );
}

// ─── Mini calendrier (4 semaines glissantes) ─────────────────────────
function DatePicker({ days, selectedDate, onSelect }) {
  // Grouper par mois pour l'affichage
  const byMonth = useMemo(() => {
    const map = new Map();
    for (const d of days) {
      const month = d.date.slice(0, 7); // YYYY-MM
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
