import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react'
import { Event } from '@/types'
import * as eventService from '@/services/eventService'

interface EventsContextType {
  events: Event[]
  selectedEvent: Event | null
  isLoading: boolean
  error: string | null
  fetchEvents: (filters?: Record<string, string>) => Promise<void>
  fetchEventById: (id: string) => Promise<void>
  searchEvents: (query: string) => Promise<void>
  bookmarkEvent: (eventId: string) => Promise<void>
  removeBookmark: (eventId: string) => Promise<void>
  clearError: () => void
}

const EventsContext = createContext<EventsContextType | undefined>(undefined)

export const EventsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>([])
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchEvents = useCallback(async (filters?: Record<string, string>) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await eventService.getEvents(filters)
      setEvents(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch events'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const fetchEventById = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await eventService.getEventById(id)
      setSelectedEvent(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch event'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const searchEvents = useCallback(async (query: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await eventService.searchEvents(query)
      setEvents(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Search failed'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const bookmarkEvent = useCallback(async (eventId: string) => {
    try {
      await eventService.bookmarkEvent(eventId)
      setEvents(prev =>
        prev.map(event =>
          event.id === eventId ? { ...event, isBookmarked: true } : event
        )
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Bookmark failed'
      setError(message)
    }
  }, [])

  const removeBookmark = useCallback(async (eventId: string) => {
    try {
      await eventService.removeBookmark(eventId)
      setEvents(prev =>
        prev.map(event =>
          event.id === eventId ? { ...event, isBookmarked: false } : event
        )
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Remove bookmark failed'
      setError(message)
    }
  }, [])

  const clearError = useCallback(() => {
    setError(null)
  }, [])

  const value: EventsContextType = {
    events,
    selectedEvent,
    isLoading,
    error,
    fetchEvents,
    fetchEventById,
    searchEvents,
    bookmarkEvent,
    removeBookmark,
    clearError,
  }

  return <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
}

export const useEvents = (): EventsContextType => {
  const context = useContext(EventsContext)
  if (!context) {
    throw new Error('useEvents must be used within EventsProvider')
  }
  return context
}
