import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react'
import { AuthState, User, LoginFormData, SignupFormData } from '@/types'
import * as authService from '@/services/authService'

interface AuthContextType {
  state: AuthState
  login: (data: LoginFormData) => Promise<void>
  signup: (data: SignupFormData) => Promise<void>
  logout: () => void
  updateProfile: (user: User) => void
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'LOGIN_ERROR'; payload: string }
  | { type: 'SIGNUP_START' }
  | { type: 'SIGNUP_SUCCESS'; payload: { user: User; token: string } }
  | { type: 'SIGNUP_ERROR'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_PROFILE'; payload: User }
  | { type: 'CLEAR_ERROR' }
  | { type: 'RESTORE_TOKEN'; payload: { user: User; token: string } }

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  isLoading: false,
  error: null,
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
    case 'SIGNUP_START':
      return { ...state, isLoading: true, error: null }
    
    case 'LOGIN_SUCCESS':
    case 'SIGNUP_SUCCESS':
    case 'RESTORE_TOKEN':
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      }
    
    case 'LOGIN_ERROR':
    case 'SIGNUP_ERROR':
      return { ...state, isLoading: false, error: action.payload }
    
    case 'LOGOUT':
      localStorage.removeItem('token')
      return { user: null, token: null, isAuthenticated: false, isLoading: false, error: null }
    
    case 'UPDATE_PROFILE':
      return { ...state, user: action.payload }
    
    case 'CLEAR_ERROR':
      return { ...state, error: null }
    
    default:
      return state
  }
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  const login = useCallback(async (data: LoginFormData) => {
    dispatch({ type: 'LOGIN_START' })
    try {
      const response = await authService.login(data)
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: response.user, token: response.token },
      })
    } catch (error) {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: error instanceof Error ? error.message : 'Login failed',
      })
      throw error
    }
  }, [])

  const signup = useCallback(async (data: SignupFormData) => {
    dispatch({ type: 'SIGNUP_START' })
    try {
      const response = await authService.signup(data)
      dispatch({
        type: 'SIGNUP_SUCCESS',
        payload: { user: response.user, token: response.token },
      })
    } catch (error) {
      dispatch({
        type: 'SIGNUP_ERROR',
        payload: error instanceof Error ? error.message : 'Signup failed',
      })
      throw error
    }
  }, [])

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' })
  }, [])

  const updateProfile = useCallback((user: User) => {
    dispatch({ type: 'UPDATE_PROFILE', payload: user })
  }, [])

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' })
  }, [])

  const value: AuthContextType = {
    state,
    login,
    signup,
    logout,
    updateProfile,
    clearError,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
