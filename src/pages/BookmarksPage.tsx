import React, { useEffect } from 'react'
import { MapPin } from 'lucide-react'
import Header from '@/components/Header'
import EventCard from '@/components/EventCard'
import ProtectedRoute from '@/components/ProtectedRoute'
import { useEvents } from '@/context/EventsContext'

const BookmarksPage: React.FC = () => {
  const { events, isLoading, fetchEvents } = useEvents()
  const bookmarkedEvents = events.filter(e => e.isBookmarked)

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-brand-bg1">
        <Header />

        {/* Page Header */}
        <section className="bg-gradient-to-b from-brand-bg2 to-brand-bg1 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Saved Events</h1>
            <p className="text-xl text-secondary">
              {bookmarkedEvents.length} event{bookmarkedEvents.length !== 1 ? 's' : ''} saved
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card h-64 bg-gradient-to-r from-brand-bg2 to-brand-bg3 animate-pulse" />
              ))}
            </div>
          ) : bookmarkedEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookmarkedEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <MapPin size={48} className="mx-auto text-brand-textDis mb-4" />
              <h3 className="text-xl font-semibold mb-2">No saved events</h3>
              <p className="text-secondary">Start bookmarking events to see them here</p>
            </div>
          )}
        </section>
      </div>
    </ProtectedRoute>
  )
}

export default BookmarksPage
