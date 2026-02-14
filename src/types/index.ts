export interface User {
  id: string
  name: string
  email: string
  phone: string
  dateOfBirth: string
  city: string
  bio: string
  profileImage?: string
  isEmailVerified: boolean
  createdAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
}

export interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  venue: Venue
  category: 'DJ Night' | 'Live Band' | 'Music Festival' | 'Comedy Night' | 'Dance' | 'Other'
  image: string
  images?: string[]
  rating: number
  ratingCount: number
  price?: number
  capacity?: number
  attendees?: number
  isBookmarked?: boolean
}

export interface Venue {
  id: string
  name: string
  address: string
  city: string
  coordinates: {
    latitude: number
    longitude: number
  }
  phone: string
  rating: number
  ratingCount: number
  image: string
  images?: string[]
  cuisine?: string[]
  amenities: string[]
  hours: {
    day: string
    open: string
    close: string
  }[]
  services: {
    dinner: boolean
    lunch: boolean
    homeDelivery: boolean
    takeaway: boolean
    wheelchairAccessible: boolean
    stagsAllowed: boolean
  }
}

export interface Review {
  id: string
  author: {
    name: string
    image: string
    rating: number
  }
  text: string
  rating: number
  timestamp: string
  tags?: string[]
}

export interface LoginFormData {
  email: string
  password: string
}

export interface SignupFormData {
  email: string
  password: string
  confirmPassword: string
  name: string
  phone: string
}

export interface ProfileUpdateData {
  name: string
  email: string
  phone: string
  dateOfBirth: string
  city: string
  bio: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}
