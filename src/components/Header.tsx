import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Search } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { state, logout } = useAuth()

  const handleLogout = () => {
    logout()
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-brand-bg2 border-b border-brand-border backdrop-blur-md bg-opacity-95">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl">
            <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold">
              G
            </div>
            <span className="hidden sm:inline">Global Night Life</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search events, venues..."
                className="input-field pl-10 py-2 text-sm"
              />
              <Search className="absolute left-3 top-2.5 text-brand-textDis w-4 h-4" />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex gap-8">
            <Link to="/explore" className="text-white hover:text-brand-primary transition-smooth">
              Explore
            </Link>
            <Link to="/nearby" className="text-white hover:text-brand-primary transition-smooth">
              Nearby
            </Link>
            <Link to="/bookmarks" className="text-white hover:text-brand-primary transition-smooth">
              Bookmarks
            </Link>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            {state.isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center font-bold hover:bg-brand-hover1 transition-smooth"
                >
                  {state.user?.name.charAt(0).toUpperCase()}
                </Link>
                <button
                  onClick={handleLogout}
                  className="btn-secondary text-sm py-2 px-4"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-secondary text-sm py-2 px-4">
                  Login
                </Link>
                <Link to="/signup" className="btn-primary text-sm py-2 px-4">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-brand-bg3 rounded-lg transition-smooth"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-brand-border">
            {/* Mobile Search */}
            <div className="mt-4 mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="input-field pl-10 py-2 text-sm"
                />
                <Search className="absolute left-3 top-2.5 text-brand-textDis w-4 h-4" />
              </div>
            </div>

            {/* Mobile Nav Links */}
            <nav className="flex flex-col gap-2">
              <Link
                to="/explore"
                className="px-4 py-2 hover:bg-brand-bg3 rounded-lg transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>
              <Link
                to="/nearby"
                className="px-4 py-2 hover:bg-brand-bg3 rounded-lg transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Nearby
              </Link>
              <Link
                to="/bookmarks"
                className="px-4 py-2 hover:bg-brand-bg3 rounded-lg transition-smooth"
                onClick={() => setIsMenuOpen(false)}
              >
                Bookmarks
              </Link>
            </nav>

            {/* Mobile Auth */}
            <div className="mt-4 pt-4 border-t border-brand-border flex flex-col gap-2">
              {state.isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="px-4 py-2 hover:bg-brand-bg3 rounded-lg transition-smooth"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="btn-secondary text-sm py-2 px-4 w-full"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn-secondary text-sm py-2 px-4 w-full text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="btn-primary text-sm py-2 px-4 w-full text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
