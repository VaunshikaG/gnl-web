import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Mail, Lock, User, Phone, AlertCircle, CheckCircle } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { validateSignupForm, validatePassword } from '@/utils/validation'
import { SignupFormData } from '@/types'

const SignupPage: React.FC = () => {
  const navigate = useNavigate()
  const { signup, state } = useAuth()
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState<{ valid: boolean; errors: string[] }>({ valid: false, errors: [] })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    // Check password strength when password field changes
    if (name === 'password') {
      setPasswordStrength(validatePassword(value))
    }

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const formErrors = validateSignupForm(
      formData.name,
      formData.email,
      formData.phone,
      formData.password,
      formData.confirmPassword
    )
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    setIsSubmitting(true)
    try {
      await signup(formData)
      navigate('/explore')
    } catch (err) {
      setErrors({ submit: err instanceof Error ? err.message : 'Signup failed' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg1 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
            G
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Global Night Life</h1>
          <p className="text-secondary">Join the nightlife community</p>
        </div>

        {/* Form Card */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>

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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-brand-textDis w-5 h-5" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={`input-field pl-10 ${errors.name ? 'border-brand-danger' : ''}`}
                />
              </div>
              {errors.name && <p className="text-brand-danger text-sm mt-1">{errors.name}</p>}
            </div>

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

            {/* Phone Field */}
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-brand-textDis w-5 h-5" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className={`input-field pl-10 ${errors.phone ? 'border-brand-danger' : ''}`}
                />
              </div>
              {errors.phone && <p className="text-brand-danger text-sm mt-1">{errors.phone}</p>}
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

              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2 space-y-2">
                  {passwordStrength.errors.map((error, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-brand-textDis">
                      <div className="w-4 h-4 rounded-full border border-brand-danger" />
                      {error}
                    </div>
                  ))}
                  {passwordStrength.valid && (
                    <div className="flex items-center gap-2 text-sm text-brand-success">
                      <CheckCircle size={16} />
                      Password strength: Strong
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-brand-textDis w-5 h-5" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`input-field pl-10 ${errors.confirmPassword ? 'border-brand-danger' : ''}`}
                />
              </div>
              {errors.confirmPassword && <p className="text-brand-danger text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms Checkbox */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded bg-brand-bg2 border-brand-border cursor-pointer" required />
              <span className="text-sm text-secondary">
                I agree to the{' '}
                <a href="#" className="text-brand-primary hover:underline">
                  Terms & Conditions
                </a>
                {' '}and{' '}
                <a href="#" className="text-brand-primary hover:underline">
                  Privacy Policy
                </a>
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || state.isLoading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {isSubmitting || state.isLoading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-secondary">
              Already have an account?{' '}
              <Link to="/login" className="text-brand-primary hover:text-brand-hover1 font-semibold transition-smooth">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage
