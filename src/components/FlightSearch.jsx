import { useMemo, useRef, useState } from 'react'
import airports from '../data/airports.json'

const TABS = [
  { id: 'book', label: 'Book flights' },
  { id: 'manage', label: 'Manage booking' },
  { id: 'checkin', label: 'Check-in' },
]

const TRIP_TYPES = [
  { id: 'return', label: 'Return' },
  { id: 'oneway', label: 'One way' },
  { id: 'multicity', label: 'Multi-city' },
]

const CABIN_CLASSES = [
  { id: 'economy', label: 'Euro Traveller' },
  { id: 'premium', label: 'World Traveller Plus' },
  { id: 'business', label: 'Club World' },
  { id: 'first', label: 'First' },
]

function todayISO() {
  return new Date().toISOString().slice(0, 10)
}

function plusDaysISO(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d.toISOString().slice(0, 10)
}

function AirportSelect({ id, label, value, onChange, excludeCode }) {
  const options = useMemo(
    () => airports.filter((a) => a.code !== excludeCode),
    [excludeCode],
  )
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}
      </label>
      <select
        id={id}
        className="input-field"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((a) => (
          <option key={a.code} value={a.code}>
            {a.city} ({a.code}) &mdash; {a.name}
          </option>
        ))}
      </select>
    </div>
  )
}

function PassengerCabinPicker({ passengers, setPassengers, cabinClass, setCabinClass }) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  const total = passengers.adults + passengers.children + passengers.infants
  const cabinLabel = CABIN_CLASSES.find((c) => c.id === cabinClass)?.label

  const updateCount = (key, delta, min) => {
    setPassengers((prev) => ({
      ...prev,
      [key]: Math.max(min, Math.min(9, prev[key] + delta)),
    }))
  }

  return (
    <div className="relative" ref={containerRef}>
      <label className="field-label">Travellers &amp; cabin</label>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="input-field flex items-center justify-between text-left"
        aria-expanded={open}
      >
        <span>
          {total} traveller{total !== 1 ? 's' : ''} &middot; {cabinLabel}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-80 max-w-[90vw] rounded-xl border border-slate-200 bg-white p-4 shadow-card-hover">
          {[
            { key: 'adults', label: 'Adults', hint: '16+ years', min: 1 },
            { key: 'children', label: 'Children', hint: '2-15 years', min: 0 },
            { key: 'infants', label: 'Infants', hint: 'Under 2 years', min: 0 },
          ].map((row) => (
            <div key={row.key} className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium text-ba-navy-darker">{row.label}</p>
                <p className="text-xs text-slate-500">{row.hint}</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateCount(row.key, -1, row.min)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-ba-navy transition-colors hover:bg-slate-100 disabled:opacity-30"
                  disabled={passengers[row.key] <= row.min}
                  aria-label={`Decrease ${row.label}`}
                >
                  &minus;
                </button>
                <span className="w-5 text-center text-sm font-semibold">{passengers[row.key]}</span>
                <button
                  type="button"
                  onClick={() => updateCount(row.key, 1, row.min)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 text-ba-navy transition-colors hover:bg-slate-100 disabled:opacity-30"
                  disabled={total >= 9}
                  aria-label={`Increase ${row.label}`}
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="mt-3 border-t border-slate-200 pt-3">
            <p className="field-label">Cabin class</p>
            <div className="grid grid-cols-2 gap-2">
              {CABIN_CLASSES.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCabinClass(c.id)}
                  className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                    cabinClass === c.id
                      ? 'border-ba-navy bg-ba-navy text-white'
                      : 'border-slate-300 text-ba-navy-darker hover:bg-slate-50'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="mt-4 w-full rounded-lg bg-ba-navy py-2 text-sm font-semibold text-white transition-colors hover:bg-ba-navy-dark"
          >
            Done
          </button>
        </div>
      )}
    </div>
  )
}

function BookFlightsForm() {
  const [tripType, setTripType] = useState('return')
  const [from, setFrom] = useState('LHR')
  const [to, setTo] = useState('JFK')
  const [departDate, setDepartDate] = useState(plusDaysISO(14))
  const [returnDate, setReturnDate] = useState(plusDaysISO(21))
  const [passengers, setPassengers] = useState({ adults: 1, children: 0, infants: 0 })
  const [cabinClass, setCabinClass] = useState('economy')
  const [submitted, setSubmitted] = useState(null)

  const swapAirports = () => {
    setFrom(to)
    setTo(from)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted({
      tripType,
      from,
      to,
      departDate,
      returnDate: tripType === 'return' ? returnDate : null,
      passengers,
      cabinClass,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-5 flex flex-wrap gap-2" role="radiogroup" aria-label="Trip type">
        {TRIP_TYPES.map((t) => (
          <button
            key={t.id}
            type="button"
            role="radio"
            aria-checked={tripType === t.id}
            onClick={() => setTripType(t.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              tripType === t.id
                ? 'bg-ba-navy text-white'
                : 'bg-slate-100 text-ba-navy-darker hover:bg-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-3 relative">
          <AirportSelect id="from" label="From" value={from} onChange={setFrom} excludeCode={to} />
        </div>

        <div className="hidden lg:col-span-1 lg:flex lg:justify-center lg:pb-2.5">
          <button
            type="button"
            onClick={swapAirports}
            aria-label="Swap origin and destination"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-300 text-ba-navy transition-colors hover:bg-slate-100"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M7 7h11l-3-3M17 17H6l3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="lg:col-span-3">
          <AirportSelect id="to" label="To" value={to} onChange={setTo} excludeCode={from} />
        </div>

        <div className={tripType === 'return' ? 'lg:col-span-2' : 'lg:col-span-2'}>
          <label htmlFor="depart" className="field-label">
            Depart
          </label>
          <input
            id="depart"
            type="date"
            className="input-field"
            min={todayISO()}
            value={departDate}
            onChange={(e) => setDepartDate(e.target.value)}
          />
        </div>

        {tripType === 'return' && (
          <div className="lg:col-span-2">
            <label htmlFor="return" className="field-label">
              Return
            </label>
            <input
              id="return"
              type="date"
              className="input-field"
              min={departDate || todayISO()}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
            />
          </div>
        )}

        <div className={tripType === 'return' ? 'lg:col-span-3' : 'lg:col-span-5'}>
          <PassengerCabinPicker
            passengers={passengers}
            setPassengers={setPassengers}
            cabinClass={cabinClass}
            setCabinClass={setCabinClass}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-ba-navy focus:ring-ba-navy" />
          Use my Avios
        </label>
        <button type="submit" className="btn-primary w-full sm:w-auto">
          Search flights
        </button>
      </div>

      {submitted && (
        <p className="mt-4 rounded-lg bg-ba-navy/5 px-4 py-3 text-sm text-ba-navy-darker" role="status">
          Searching {submitted.tripType === 'oneway' ? 'one-way' : submitted.tripType} flights from{' '}
          <strong>{submitted.from}</strong> to <strong>{submitted.to}</strong>, departing{' '}
          <strong>{submitted.departDate}</strong>
          {submitted.returnDate ? (
            <>
              {' '}
              and returning <strong>{submitted.returnDate}</strong>
            </>
          ) : null}{' '}
          for {submitted.passengers.adults + submitted.passengers.children + submitted.passengers.infants}{' '}
          traveller(s) in {CABIN_CLASSES.find((c) => c.id === submitted.cabinClass)?.label}. (Demo only &mdash; no
          real search performed.)
        </p>
      )}
    </form>
  )
}

function ManageBookingForm() {
  const [reference, setReference] = useState('')
  const [lastName, setLastName] = useState('')

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end"
    >
      <div className="lg:col-span-2">
        <label htmlFor="booking-ref" className="field-label">
          Booking reference
        </label>
        <input
          id="booking-ref"
          type="text"
          placeholder="e.g. AB12CD"
          className="input-field uppercase"
          maxLength={6}
          value={reference}
          onChange={(e) => setReference(e.target.value.toUpperCase())}
        />
      </div>
      <div className="lg:col-span-1">
        <label htmlFor="manage-lastname" className="field-label">
          Last name
        </label>
        <input
          id="manage-lastname"
          type="text"
          placeholder="Surname"
          className="input-field"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="lg:col-span-1">
        <button type="submit" className="btn-primary w-full">
          Manage booking
        </button>
      </div>
    </form>
  )
}

function CheckInForm() {
  const [reference, setReference] = useState('')
  const [lastName, setLastName] = useState('')

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-end"
    >
      <div className="lg:col-span-2">
        <label htmlFor="checkin-ref" className="field-label">
          Booking reference or e-ticket number
        </label>
        <input
          id="checkin-ref"
          type="text"
          placeholder="e.g. AB12CD"
          className="input-field uppercase"
          maxLength={6}
          value={reference}
          onChange={(e) => setReference(e.target.value.toUpperCase())}
        />
      </div>
      <div className="lg:col-span-1">
        <label htmlFor="checkin-lastname" className="field-label">
          Last name
        </label>
        <input
          id="checkin-lastname"
          type="text"
          placeholder="Surname"
          className="input-field"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>
      <div className="lg:col-span-1">
        <button type="submit" className="btn-primary w-full">
          Check in
        </button>
      </div>
    </form>
  )
}

export default function FlightSearch() {
  const [activeTab, setActiveTab] = useState('book')

  return (
    <section id="book" className="relative z-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto -mt-16 w-full max-w-6xl rounded-2xl bg-white shadow-card-hover sm:-mt-20 lg:-mt-24">
        <div className="flex overflow-x-auto rounded-t-2xl border-b border-slate-200" role="tablist" aria-label="Flight services">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 whitespace-nowrap px-6 py-4 text-sm font-semibold transition-colors sm:text-base ${
                activeTab === tab.id
                  ? 'text-ba-navy'
                  : 'text-slate-500 hover:text-ba-navy-darker'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute inset-x-0 bottom-0 h-1 rounded-t-full bg-ba-red" />
              )}
            </button>
          ))}
        </div>

        <div className="p-5 sm:p-8">
          {activeTab === 'book' && <BookFlightsForm />}
          {activeTab === 'manage' && <ManageBookingForm />}
          {activeTab === 'checkin' && <CheckInForm />}
        </div>
      </div>
    </section>
  )
}
