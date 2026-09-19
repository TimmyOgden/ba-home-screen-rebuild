import { useEffect, useState } from 'react'

const SLIDES = [
  {
    id: 'slide-1',
    eyebrow: 'Summer sale',
    headline: 'Your next adventure starts here',
    subcopy: 'Discover new routes and seasonal fares across our global network.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1600&q=80',
    cta: 'Explore offers',
  },
  {
    id: 'slide-2',
    eyebrow: 'New route',
    headline: 'Fly non-stop to Singapore',
    subcopy: 'Direct flights now departing from London Heathrow, five times a week.',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80',
    cta: 'Book now',
  },
  {
    id: 'slide-3',
    eyebrow: 'Club World',
    headline: 'Redefine how you fly',
    subcopy: 'Lie-flat seats, award-winning dining and dedicated lounges.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80',
    cta: 'Discover Club World',
  },
]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const goTo = (i) => setIndex(i)
  const prev = () => setIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length)
  const next = () => setIndex((current) => (current + 1) % SLIDES.length)

  return (
    <section className="relative isolate overflow-hidden bg-ba-navy-darker text-white">
      <div className="relative h-[460px] sm:h-[520px] lg:h-[600px]">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === index ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            aria-hidden={i !== index}
          >
            <img
              src={slide.image}
              alt=""
              className="h-full w-full object-cover"
              loading={i === 0 ? 'eager' : 'lazy'}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ba-navy-darker via-ba-navy-darker/40 to-ba-navy-darker/10" />
          </div>
        ))}

        <div className="container-page relative flex h-full flex-col justify-end pb-16 sm:pb-20 lg:justify-center lg:pb-0">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-ba-red">
              {SLIDES[index].eyebrow}
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {SLIDES[index].headline}
            </h1>
            <p className="mt-4 text-base text-white/85 sm:text-lg">
              {SLIDES[index].subcopy}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#book" className="btn-primary">
                {SLIDES[index].cta}
              </a>
              <a href="#offers" className="btn-secondary">
                See all destinations
              </a>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/15 p-2 backdrop-blur transition-colors hover:bg-white/30 sm:flex"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/15 p-2 backdrop-blur transition-colors hover:bg-white/30 sm:flex"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2">
          {SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === index ? 'w-6 bg-white' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
