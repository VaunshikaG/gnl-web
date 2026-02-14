import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, AlertCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { validateLoginForm } from '@/utils/validation'
import { LoginFormData } from '@/types'

const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login, state } = useAuth()
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate form
    const formErrors = validateLoginForm(formData.email, formData.password)
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await login(formData)
      navigate('/explore')
    } catch (err) {
      setErrors({ submit: err instanceof Error ? err.message : 'Login failed' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg1 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
            G
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Global Night Life</h1>
          <p className="text-secondary">Discover amazing nightlife events</p>
        </div>

        {/* Form Card */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-6">Log In</h2>

          {/* Error Messages */}
          {state.error && (
            <div className="mb-4 p-4 bg-brand-danger bg-opacity-10 border border-brand-danger rounded-lg flex gap-3">
              <AlertCircle size={20} className="text-brand-danger flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-brand-danger">Error</p>
                <p className="text-sm text-brand-danger opacity-80">{state.error}</p>
              </div>
            </div>
          )}

          {errors.submit && (
            <div className="mb-4 p-4 bg-brand-danger bg-opacity-10 border border-brand-danger rounded-lg flex gap-3">
              <AlertCircle size={20} className="text-brand-danger flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-brand-danger">Error</p>
                <p className="text-sm text-brand-danger opacity-80">{errors.submit}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-brand-textDis w-5 h-5" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`input-field pl-10 ${errors.email ? 'border-brand-danger' : ''}`}
                />
              </div>
              {errors.email && <p className="text-brand-danger text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-brand-textDis w-5 h-5" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`input-field pl-10 ${errors.password ? 'border-brand-danger' : ''}`}
                />
              </div>
              {errors.password && <p className="text-brand-danger text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded bg-brand-bg2 border-brand-border cursor-pointer" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-brand-primary hover:text-brand-hover1 transition-smooth">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || state.isLoading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || state.isLoading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-secondary">
              Don't have an account?{' '}
              <Link to="/signup" className="text-brand-primary hover:text-brand-hover1 font-semibold transition-smooth">
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center text-disabled text-sm">
          <p>I agree to the <a href="#" className="text-brand-primary hover:underline">Terms & Conditions</a> and <a href="#" className="text-brand-primary hover:underline">Privacy Policy</a></p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
