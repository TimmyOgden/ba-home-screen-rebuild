import destinations from '../data/destinations.json'

function DestinationCard({ destination }) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover">
      <div className="relative h-44 overflow-hidden">
        <img
          src={destination.image}
          alt={`${destination.city}, ${destination.country}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {destination.tag && (
          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-ba-navy shadow-sm">
            {destination.tag}
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="text-lg font-bold text-ba-navy-darker">{destination.city}</h3>
          <span className="text-xs font-semibold text-slate-400">{destination.airportCode}</span>
        </div>
        <p className="text-sm text-slate-500">{destination.country}</p>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-xs text-slate-500">Return flights from</p>
            <p className="text-xl font-bold text-ba-navy">
              &pound;{destination.priceFrom}
            </p>
          </div>
          <a
            href="#book"
            className="rounded-full border border-ba-navy px-4 py-2 text-xs font-semibold text-ba-navy transition-colors hover:bg-ba-navy hover:text-white"
          >
            Select
          </a>
        </div>
      </div>
    </article>
  )
}

export default function DestinationCards() {
  return (
    <section id="offers" className="container-page py-14 sm:py-20">
      <div className="mb-8 flex flex-col gap-2 sm:mb-10">
        <p className="text-sm font-semibold uppercase tracking-widest text-ba-red">Inspiration</p>
        <h2 className="text-2xl font-bold text-ba-navy-darker sm:text-3xl">
          Popular destinations
        </h2>
        <p className="max-w-2xl text-sm text-slate-500 sm:text-base">
          Handpicked fares across our network, updated regularly. Prices shown are return, per
          person, including taxes and charges.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </section>
  )
}
