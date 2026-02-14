import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { EventsProvider } from '@/context/EventsContext'

// Pages
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import ExplorePage from '@/pages/ExplorePage'
import EventDetailPage from '@/pages/EventDetailPage'
import ProfilePage from '@/pages/ProfilePage'
import BookmarksPage from '@/pages/BookmarksPage'

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <EventsProvider>
          <Routes>
            {/* Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* App Routes */}
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/event/:id" element={<EventDetailPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />

            {/* Default redirect */}
            <Route path="/" element={<Navigate to="/explore" replace />} />
            <Route path="*" element={<Navigate to="/explore" replace />} />
          </Routes>
        </EventsProvider>
      </AuthProvider>
    </Router>
  )
}

export default App
