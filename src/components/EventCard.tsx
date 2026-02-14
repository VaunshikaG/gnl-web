import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, MapPin, Clock, Star } from 'lucide-react'
import { Event } from '@/types'
import { formatDate, getCategoryIcon } from '@/utils/helpers'
import { useEvents } from '@/context/EventsContext'

interface EventCardProps {
  event: Event
  layout?: 'grid' | 'list'
}

const EventCard: React.FC<EventCardProps> = ({ event, layout = 'grid' }) => {
  const { bookmarkEvent, removeBookmark } = useEvents()
  const [isBookmarked, setIsBookmarked] = React.useState(event.isBookmarked || false)

  const handleBookmark = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      if (isBookmarked) {
        await removeBookmark(event.id)
      } else {
        await bookmarkEvent(event.id)
      }
      setIsBookmarked(!isBookmarked)
    } catch (err) {
      console.error('Bookmark error:', err)
    }
  }

  if (layout === 'list') {
    return (
      <Link to={`/event/${event.id}`} className="card p-4 flex gap-4">
        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg line-clamp-2">{event.title}</h3>
          <p className="text-secondary text-sm mt-1">{event.venue.name}</p>
          <div className="flex items-center gap-4 mt-3 text-sm">
            <div className="flex items-center gap-1 text-brand-textSec">
              <Clock size={16} />
              {formatDate(event.date)}
            </div>
            <div className="flex items-center gap-1 text-brand-textSec">
              <Star size={16} className="text-brand-warning" />
              {event.rating.toFixed(1)} ({event.ratingCount})
            </div>
          </div>
        </div>
        <button
          onClick={handleBookmark}
          className="p-2 hover:bg-brand-bg3 rounded-lg transition-smooth self-start"
        >
          <Heart
            size={20}
            className={isBookmarked ? 'fill-brand-primary text-brand-primary' : 'text-brand-textDis'}
          />
        </button>
      </Link>
    )
  }

  return (
    <Link to={`/event/${event.id}`} className="card overflow-hidden hover:border-brand-primary">
      {/* Image */}
      <div className="relative h-40 overflow-hidden bg-brand-bg3">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <button
          onClick={handleBookmark}
          className="absolute top-3 right-3 p-2 bg-black bg-opacity-50 hover:bg-opacity-70 rounded-full transition-smooth"
        >
          <Heart
            size={18}
            className={isBookmarked ? 'fill-brand-primary text-brand-primary' : 'text-white'}
          />
        </button>
        <div className="absolute top-3 left-3 bg-black bg-opacity-50 px-3 py-1 rounded-full text-xs font-semibold">
          {getCategoryIcon(event.category)} {event.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold line-clamp-2 mb-2">{event.title}</h3>

        <p className="text-secondary text-sm mb-3 line-clamp-2">{event.venue.name}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <Star size={16} className="text-brand-warning fill-brand-warning" />
          <span className="font-semibold">{event.rating.toFixed(1)}</span>
          <span className="text-disabled text-sm">({event.ratingCount})</span>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between text-secondary text-sm">
          <div className="flex items-center gap-1">
            <Clock size={14} />
            {formatDate(event.date)}
          </div>
          {event.price && <span className="font-semibold text-brand-primary">₹{event.price}</span>}
        </div>
      </div>
    </Link>
  )
}

export default EventCard
