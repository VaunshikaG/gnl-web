import { Venue, Review } from '@/types'
import { apiClient } from './apiClient'

export const getVenues = async (filters?: Record<string, string>): Promise<Venue[]> => {
  const params = new URLSearchParams(filters).toString()
  const response = await apiClient.get<Venue[]>(`/venues${params ? `?${params}` : ''}`)
  return response.data
}

export const getVenueById = async (id: string): Promise<Venue> => {
  const response = await apiClient.get<Venue>(`/venues/${id}`)
  return response.data
}

export const searchVenues = async (query: string): Promise<Venue[]> => {
  const response = await apiClient.get<Venue[]>(`/venues/search?q=${encodeURIComponent(query)}`)
  return response.data
}

export const getNearbyVenues = async (latitude: number, longitude: number, radius?: number): Promise<Venue[]> => {
  const response = await apiClient.get<Venue[]>(
    `/venues/nearby?lat=${latitude}&lng=${longitude}${radius ? `&radius=${radius}` : ''}`
  )
  return response.data
}

export const getVenueReviews = async (venueId: string): Promise<Review[]> => {
  const response = await apiClient.get<Review[]>(`/venues/${venueId}/reviews`)
  return response.data
}

export const submitReview = async (venueId: string, data: Partial<Review>): Promise<Review> => {
  const response = await apiClient.post<Review>(`/venues/${venueId}/reviews`, data)
  return response.data
}
