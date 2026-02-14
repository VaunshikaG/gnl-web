import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Clock, Users, Star, Share2, Heart, Calendar } from 'lucide-react'
import Header from '@/components/Header'
import { useEvents } from '@/context/EventsContext'
import { useAuth } from '@/context/AuthContext'
import { formatDateTime } from '@/utils/helpers'

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { selectedEvent, fetchEventById, isLoading } = useEvents()
  const { state } = useAuth()
  const [isBookmarked, setIsBookmarked] = React.useState(false)
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0)

  useEffect(() => {
    if (id) {
      fetchEventById(id)
    }
  }, [id, fetchEventById])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-bg1">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-96 bg-brand-bg2 rounded-xl" />
            <div className="h-8 bg-brand-bg2 rounded w-3/4" />
            <div className="h-4 bg-brand-bg2 rounded w-1/2" />
          </div>
        </div>
      </div>
    )
  }

  if (!selectedEvent) {
    return (
      <div className="min-h-screen bg-brand-bg1">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-2">Event not found</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-brand-primary hover:text-brand-hover1 transition-smooth"
          >
            Go back
          </button>
        </div>
      </div>
    )
  }

  const images = selectedEvent.images || [selectedEvent.image]

  return (
    <div className="min-h-screen bg-brand-bg1">
      <Header />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-brand-primary hover:text-brand-hover1 mb-6 transition-smooth"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative rounded-xl overflow-hidden h-96 sm:h-96 md:h-[500px] bg-brand-bg2 mb-4">
            <img
              src={images[selectedImageIndex]}
              alt={selectedEvent.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-black bg-opacity-50 px-4 py-2 rounded-full text-sm font-semibold">
              {selectedEvent.category}
            </div>
          </div>

          {/* Image Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-smooth flex-shrink-0 ${
                    selectedImageIndex === idx ? 'border-brand-primary' : 'border-brand-border'
                  }`}
                >
                  <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2">
            {/* Title and Rating */}
            <div className="mb-6">
              <h1 className="text-4xl font-bold mb-4">{selectedEvent.title}</h1>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Star size={20} className="text-brand-warning fill-brand-warning" />
                  <span className="font-bold text-lg">{selectedEvent.rating.toFixed(1)}</span>
                  <span className="text-secondary">({selectedEvent.ratingCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Key Details */}
            <div className="card p-6 mb-6 space-y-4">
              <div className="flex gap-4">
                <Clock className="text-brand-primary flex-shrink-0" size={24} />
                <div>
                  <p className="text-secondary text-sm">Date & Time</p>
                  <p className="font-semibold">{formatDateTime(selectedEvent.date)}</p>
                </div>
              </div>

              <div className="border-t border-brand-border pt-4 flex gap-4">
                <MapPin className="text-brand-primary flex-shrink-0" size={24} />
                <div>
                  <p className="text-secondary text-sm">Location</p>
                  <p className="font-semibold">{selectedEvent.venue.name}</p>
                  <p className="text-secondary text-sm">{selectedEvent.venue.address}</p>
                </div>
              </div>

              {selectedEvent.capacity && (
                <div className="border-t border-brand-border pt-4 flex gap-4">
                  <Users className="text-brand-primary flex-shrink-0" size={24} />
                  <div>
                    <p className="text-secondary text-sm">Capacity</p>
                    <p className="font-semibold">{selectedEvent.capacity} attendees</p>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">About this event</h2>
              <p className="text-secondary leading-relaxed">{selectedEvent.description}</p>
            </div>

            {/* Venue Details */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Venue Details</h2>
              <div className="card p-6">
                <h3 className="font-bold text-lg mb-4">{selectedEvent.venue.name}</h3>
                <div className="space-y-3 text-secondary">
                  <p className="flex items-center gap-2">
                    <MapPin size={18} />
                    {selectedEvent.venue.address}
                  </p>
                  <p className="flex items-center gap-2">
                    Phone: {selectedEvent.venue.phone}
                  </p>
                  {selectedEvent.venue.cuisine && (
                    <p>
                      Cuisine: {selectedEvent.venue.cuisine.join(', ')}
                    </p>
                  )}
                </div>

                {/* Amenities */}
                {selectedEvent.venue.amenities.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-brand-border">
                    <p className="font-semibold mb-3">Amenities</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedEvent.venue.amenities.map((amenity, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-brand-bg3 rounded-full text-sm"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="card p-6 sticky top-20 space-y-4">
              {selectedEvent.price && (
                <div>
                  <p className="text-secondary text-sm">Starting from</p>
                  <p className="text-3xl font-bold text-brand-primary">₹{selectedEvent.price}</p>
                </div>
              )}

              {state.isAuthenticated ? (
                <>
                  <button className="btn-primary w-full">
                    <Calendar size={18} className="mr-2 inline" />
                    Book Now
                  </button>
                  <button
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={`w-full py-3 rounded-lg font-semibold transition-smooth flex items-center justify-center gap-2 ${
                      isBookmarked
                        ? 'bg-brand-primary text-white'
                        : 'bg-brand-bg3 text-white hover:bg-brand-bg3'
                    }`}
                  >
                    <Heart size={18} className={isBookmarked ? 'fill-current' : ''} />
                    {isBookmarked ? 'Bookmarked' : 'Save Event'}
                  </button>
                </>
              ) : (
                <button className="btn-primary w-full">
                  Sign in to Book
                </button>
              )}

              <button className="btn-secondary w-full flex items-center justify-center gap-2">
                <Share2 size={18} />
                Share
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetailPage
