import Header from './components/Header'
import Hero from './components/Hero'
import FlightSearch from './components/FlightSearch'
import DestinationCards from './components/DestinationCards'
import OffersSection from './components/OffersSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <FlightSearch />
        <DestinationCards />
        <OffersSection />
      </main>
      <Footer />
    </div>
  )
}
