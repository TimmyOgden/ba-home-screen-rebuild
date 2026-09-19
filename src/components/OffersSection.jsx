import offers from '../data/offers.json'

export default function OffersSection() {
  return (
    <section className="bg-slate-50 py-14 sm:py-20">
      <div className="container-page">
        <div className="mb-8 flex flex-col gap-2 sm:mb-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-ba-red">Offers</p>
          <h2 className="text-2xl font-bold text-ba-navy-darker sm:text-3xl">
            Deals and Executive Club news
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {offers.map((offer) => (
            <article
              key={offer.id}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
            >
              <div className="relative h-40 overflow-hidden">
                <img
                  src={offer.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute left-3 top-3 rounded-full bg-ba-red px-3 py-1 text-xs font-semibold text-white">
                  {offer.badge}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-ba-navy/70">
                  {offer.title}
                </p>
                <h3 className="mt-1 text-lg font-bold text-ba-navy-darker">{offer.headline}</h3>
                <p className="mt-2 flex-1 text-sm text-slate-500">{offer.description}</p>
                <a
                  href="#book"
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ba-navy transition-colors hover:text-ba-red"
                >
                  {offer.cta}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
