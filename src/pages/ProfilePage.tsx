import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Phone, MapPin, Calendar, Heart, LogOut, AlertCircle, CheckCircle } from 'lucide-react'
import Header from '@/components/Header'
import { useAuth } from '@/context/AuthContext'
import { validateProfileForm } from '@/utils/validation'

const ProfilePage: React.FC = () => {
  const navigate = useNavigate()
  const { state, logout, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState('')

  const [formData, setFormData] = useState({
    name: state.user?.name || '',
    email: state.user?.email || '',
    phone: state.user?.phone || '',
    city: state.user?.city || '',
    dateOfBirth: state.user?.dateOfBirth || '',
    bio: state.user?.bio || '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formErrors = validateProfileForm(
      formData.name,
      formData.email,
      formData.phone,
      formData.city
    )

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors)
      return
    }

    try {
      updateProfile({
        ...state.user!,
        ...formData,
      })
      setSuccessMessage('Profile updated successfully')
      setIsEditing(false)
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (err) {
      setErrors({ submit: 'Failed to update profile' })
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  if (!state.user) {
    return (
      <div className="min-h-screen bg-brand-bg1">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-2">Please log in</h1>
          <p className="text-secondary">Redirecting...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-brand-bg1">
      <Header />

      {/* Profile Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-brand-success bg-opacity-10 border border-brand-success rounded-lg flex gap-3">
            <CheckCircle size={20} className="text-brand-success flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-brand-success">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errors.submit && (
          <div className="mb-6 p-4 bg-brand-danger bg-opacity-10 border border-brand-danger rounded-lg flex gap-3">
            <AlertCircle size={20} className="text-brand-danger flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-brand-danger">Error</p>
              <p className="text-sm text-brand-danger opacity-80">{errors.submit}</p>
            </div>
          </div>
        )}

        {/* Profile Header */}
        <div className="card p-8 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 rounded-full bg-brand-primary flex items-center justify-center text-white font-bold text-3xl">
                {state.user.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-2">{state.user.name}</h1>
                <p className="text-secondary">{state.user.email}</p>
                {state.user.isEmailVerified && (
                  <p className="text-brand-success text-sm mt-1">✓ Email verified</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 w-full sm:w-auto">
              {!isEditing && (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-secondary flex-1 sm:flex-none"
                  >
                    Edit Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="btn-outline flex-1 sm:flex-none flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Profile Details */}
        {!isEditing ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-brand-primary" size={20} />
                  <div>
                    <p className="text-secondary text-sm">Email</p>
                    <p className="font-semibold">{state.user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-brand-primary" size={20} />
                  <div>
                    <p className="text-secondary text-sm">Phone</p>
                    <p className="font-semibold">{state.user.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="card p-6">
              <h2 className="text-xl font-bold mb-4">Personal Information</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <MapPin className="text-brand-primary" size={20} />
                  <div>
                    <p className="text-secondary text-sm">City</p>
                    <p className="font-semibold">{state.user.city || 'Not provided'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="text-brand-primary" size={20} />
                  <div>
                    <p className="text-secondary text-sm">Date of Birth</p>
                    <p className="font-semibold">{state.user.dateOfBirth || 'Not provided'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="card p-6 md:col-span-2">
              <h2 className="text-xl font-bold mb-4">Bio</h2>
              <p className="text-secondary">{state.user.bio || 'No bio added yet'}</p>
            </div>

            {/* Account Stats */}
            <div className="card p-6 md:col-span-2">
              <h2 className="text-xl font-bold mb-4">Account Stats</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Heart className="text-brand-primary" size={20} />
                  <div>
                    <p className="text-secondary text-sm">Bookmarked Events</p>
                    <p className="font-bold text-xl">0</p>
                  </div>
                </div>
                <div>
                  <p className="text-secondary text-sm">Member Since</p>
                  <p className="font-bold text-xl">
                    {new Date(state.user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Edit Form */
          <div className="card p-8">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`input-field ${errors.name ? 'border-brand-danger' : ''}`}
                  />
                  {errors.name && <p className="text-brand-danger text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`input-field ${errors.email ? 'border-brand-danger' : ''}`}
                  />
                  {errors.email && <p className="text-brand-danger text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`input-field ${errors.phone ? 'border-brand-danger' : ''}`}
                  />
                  {errors.phone && <p className="text-brand-danger text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* City */}
                <div>
                  <label className="block text-sm font-medium mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`input-field ${errors.city ? 'border-brand-danger' : ''}`}
                  />
                  {errors.city && <p className="text-brand-danger text-sm mt-1">{errors.city}</p>}
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium mb-2">Date of Birth</label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              {/* Bio */}
              <div>
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  rows={4}
                  className="input-field resize-none"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-4 pt-6 border-t border-brand-border">
                <button
                  type="submit"
                  className="btn-primary flex-1"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProfilePage
