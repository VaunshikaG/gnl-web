import React, { useEffect, useState } from 'react'
import { MapPin, Search, Filter } from 'lucide-react'
import Header from '@/components/Header'
import EventCard from '@/components/EventCard'
import { useEvents } from '@/context/EventsContext'
import { Event } from '@/types'

const ExplorePage: React.FC = () => {
  const { events, isLoading, fetchEvents, searchEvents } = useEvents()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])

  const categories = [
    'All',
    'DJ Night',
    'Live Band',
    'Music Festival',
    'Comedy Night',
    'Dance',
  ]

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  useEffect(() => {
    let filtered = events

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(e => e.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        e =>
          e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          e.venue.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    setFilteredEvents(filtered)
  }, [events, selectedCategory, searchQuery])

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.length > 2) {
      searchEvents(query)
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg1">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-brand-bg2 to-brand-bg1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Discover Amazing Events & Venues
          </h1>
          <p className="text-xl text-secondary mb-8">
            Find the best nightlife experiences near you
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-3.5 text-brand-textDis w-5 h-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search events, venues..."
              className="input-field pl-12 py-3 text-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-brand-primary" />
            <h2 className="text-lg font-semibold">Categories</h2>
          </div>

          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-medium transition-smooth ${
                  selectedCategory === category
                    ? 'bg-brand-primary text-white'
                    : 'bg-brand-bg2 text-secondary hover:bg-brand-bg3'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card h-64 bg-gradient-to-r from-brand-bg2 to-brand-bg3 animate-pulse" />
            ))}
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <MapPin size={48} className="mx-auto text-brand-textDis mb-4" />
            <h3 className="text-xl font-semibold mb-2">No events found</h3>
            <p className="text-secondary">Try adjusting your search or filters</p>
          </div>
        )}
      </section>
    </div>
  )
}

export default ExplorePage
