import { Event } from '@/types'
import { apiClient } from './apiClient'

export const getEvents = async (filters?: Record<string, string>): Promise<Event[]> => {
  const params = new URLSearchParams(filters).toString()
  const response = await apiClient.get<Event[]>(`/events${params ? `?${params}` : ''}`)
  return response.data
}

export const getEventById = async (id: string): Promise<Event> => {
  const response = await apiClient.get<Event>(`/events/${id}`)
  return response.data
}

export const searchEvents = async (query: string): Promise<Event[]> => {
  const response = await apiClient.get<Event[]>(`/events/search?q=${encodeURIComponent(query)}`)
  return response.data
}

export const getNearbyEvents = async (latitude: number, longitude: number, radius?: number): Promise<Event[]> => {
  const response = await apiClient.get<Event[]>(
    `/events/nearby?lat=${latitude}&lng=${longitude}${radius ? `&radius=${radius}` : ''}`
  )
  return response.data
}

export const getEventsByCategory = async (category: string): Promise<Event[]> => {
  const response = await apiClient.get<Event[]>(`/events/category/${category}`)
  return response.data
}

export const bookmarkEvent = async (eventId: string): Promise<void> => {
  await apiClient.post(`/events/${eventId}/bookmark`)
}

export const removeBookmark = async (eventId: string): Promise<void> => {
  await apiClient.delete(`/events/${eventId}/bookmark`)
}

export const getBookmarkedEvents = async (): Promise<Event[]> => {
  const response = await apiClient.get<Event[]>('/events/bookmarks/list')
  return response.data
}

export const bookEvent = async (eventId: string, numberOfTickets: number): Promise<any> => {
  const response = await apiClient.post(`/events/${eventId}/book`, { numberOfTickets })
  return response.data
}
