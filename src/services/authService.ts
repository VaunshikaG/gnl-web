import { LoginFormData, SignupFormData, User } from '@/types'
import { apiClient } from './apiClient'

export interface AuthResponse {
  user: User
  token: string
}

export const login = async (data: LoginFormData): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/login', data)
  return response.data
}

export const signup = async (data: SignupFormData): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>('/auth/signup', {
    email: data.email,
    password: data.password,
    name: data.name,
    phone: data.phone,
  })
  return response.data
}

export const logout = async (): Promise<void> => {
  await apiClient.post('/auth/logout')
}

export const verifyToken = async (token: string): Promise<User> => {
  const response = await apiClient.post<{ user: User }>('/auth/verify', { token })
  return response.data.user
}

export const updateProfile = async (data: Partial<User>): Promise<User> => {
  const response = await apiClient.put<User>('/auth/profile', data)
  return response.data
}

export const changePassword = async (oldPassword: string, newPassword: string): Promise<void> => {
  await apiClient.post('/auth/change-password', { oldPassword, newPassword })
}
