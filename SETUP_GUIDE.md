# Global Night Life - Setup & Architecture Guide

## Quick Start Guide

### 1. Initial Setup

```bash
# Navigate to project directory
cd global-night-life-web

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with your API URL
# VITE_API_URL=http://localhost:5000/api
```

### 2. Start Development Server

```bash
npm run dev
```

The application will open at `http://localhost:3000`

## Architecture Overview

### Context API Structure

#### AuthContext
Manages user authentication state and operations:
- User info and token
- Login/Signup operations
- Profile updates
- Logout functionality

```typescript
const { state, login, signup, logout, updateProfile } = useAuth()
```

#### EventsContext
Manages events and venue data:
- Events list and filtering
- Event details
- Search functionality
- Bookmark operations

```typescript
const { events, fetchEvents, bookmarkEvent, removeBookmark } = useEvents()
```

### API Service Layer

All API calls are centralized in the `services/` folder:

**apiClient.ts** - Axios instance with:
- Base URL configuration
- Authorization interceptors
- Error handling
- Token management

**authService.ts** - Authentication APIs:
- Login
- Signup
- Logout
- Profile management
- Password change

**eventService.ts** - Event APIs:
- List events
- Get event details
- Search events
- Get nearby events
- Bookmark operations

**venueService.ts** - Venue APIs:
- List venues
- Get venue details
- Search venues
- Get reviews

### Validation System

The `utils/validation.ts` file provides:
- Email validation
- Password strength checking
- Phone number validation
- Custom form validation functions
- Error message generation

Example usage:
```typescript
const errors = validateLoginForm(email, password)
if (Object.keys(errors).length === 0) {
  // Form is valid
}
```

## File Organization

### Components (`src/components/`)

**Header.tsx**
- Navigation bar
- Logo and branding
- Search functionality
- User authentication links/menu
- Responsive mobile menu

**EventCard.tsx**
- Event display card
- Grid and list layouts
- Bookmark functionality
- Rating display
- Image and details

**ProtectedRoute.tsx**
- Route protection wrapper
- Authentication checking
- Redirect to login if not authenticated

### Pages (`src/pages/`)

**LoginPage.tsx**
- Email and password login
- Form validation
- Error handling
- Sign up link
- Responsive layout

**SignupPage.tsx**
- User registration
- Comprehensive form validation
- Password strength indicator
- Agreement checkboxes
- Form error display

**ExplorePage.tsx**
- Event discovery interface
- Category filtering
- Search functionality
- Grid view
- Loading states
- Empty states

**EventDetailPage.tsx**
- Event information
- Venue details
- Image gallery
- Booking interface
- Bookmark button
- Share functionality

**ProfilePage.tsx**
- User information display
- Profile editing
- Account settings
- Logout functionality
- Form validation

**BookmarksPage.tsx**
- Saved events display
- Protected route
- Empty state handling

## Styling System

### Tailwind Configuration

Color scheme defined in `tailwind.config.js`:
```javascript
colors: {
  brand: {
    primary: '#CB202D',    // Main color
    bg1: '#121212',        // Dark background
    bg2: '#1E1E1E',        // Secondary background
    text1: '#1C1C1C',      // Main text
    textSec: '#B3B3B3',    // Secondary text
    // ... more colors
  }
}
```

### Utility Classes

Common patterns defined in `index.css`:
- `.btn-primary` - Primary button style
- `.btn-secondary` - Secondary button style
- `.input-field` - Form input style
- `.card` - Card component style
- `.text-secondary` - Secondary text color

Usage:
```tsx
<button className="btn-primary">Click me</button>
<input className="input-field" />
<div className="card p-4">Content</div>
```

## State Management Flow

### Authentication Flow
```
User Input (Login)
    ↓
LoginPage Component
    ↓
useAuth Hook
    ↓
AuthContext.login()
    ↓
authService.login() (API call)
    ↓
Reducer updates state
    ↓
Token saved to localStorage
    ↓
User redirected to /explore
```

### Events Flow
```
useEvents Hook
    ↓
EventsContext (useState, useCallback)
    ↓
eventService (API calls)
    ↓
State updated
    ↓
Components re-render
```

## API Response Handling

### Expected Response Format

```typescript
// Success response
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation successful"
}

// Error response
{
  "success": false,
  "error": "Error message",
  "message": "User-friendly message"
}
```

### Error Handling

Errors are caught and displayed to users:
1. API errors → Error messages in UI
2. Validation errors → Form field errors
3. Network errors → User-friendly error dialog

## Component Integration Example

```typescript
// Using AuthContext in a component
const { state, login } = useAuth()

// Using EventsContext
const { events, fetchEvents } = useEvents()

// Combining contexts
const handleLogin = async (credentials) => {
  await login(credentials)
  // User is now authenticated
  // Access protected routes
}
```

## Form Validation Example

```typescript
// Login form validation
const errors = validateLoginForm(email, password)

// Signup form validation
const errors = validateSignupForm(
  name,
  email,
  phone,
  password,
  confirmPassword
)

// Display errors
{errors.email && <p className="error">{errors.email}</p>}
```

## Responsive Design Breakpoints

- Mobile: 0px - 640px
- Tablet: 640px - 1024px
- Desktop: 1024px+

Tailwind prefixes:
- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px
- `xl:` - 1280px

## Environment Variables

Create `.env.local`:
```
VITE_API_URL=http://localhost:5000/api
```

Access in code:
```typescript
import.meta.env.VITE_API_URL
```

## Common Development Tasks

### Adding a New Page

1. Create page component in `src/pages/`
2. Add route in `App.tsx`
3. Add navigation link in `Header.tsx`

### Adding a New API Endpoint

1. Create function in appropriate `services/` file
2. Use `apiClient` for the request
3. Use in Context or component via hook

### Adding Form Validation

1. Add validation function in `utils/validation.ts`
2. Call in form submit handler
3. Display errors to user

### Styling Components

1. Use Tailwind classes
2. Add custom classes to `index.css` if needed
3. Use brand colors from config

## Testing Considerations

### Mock Authentication
```typescript
// Mock user state
const mockUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  // ...
}
```

### Testing Forms
- Validate with correct data
- Test validation errors
- Test submission states

### Testing API Calls
- Mock axios responses
- Test error scenarios
- Test loading states

## Performance Tips

1. Use React.memo for expensive components
2. Debounce search input
3. Lazy load images
4. Code split routes
5. Minimize re-renders with useCallback

## Debugging

### Browser DevTools
- React DevTools extension
- Redux DevTools for state inspection
- Network tab for API calls

### Console Logging
```typescript
console.log('Auth state:', state)
console.log('Events:', events)
```

### Error Boundaries
Consider adding error boundary for better error handling

## Deployment

### Build for Production
```bash
npm run build
```

### Environment Setup
Update `.env.local` with production API URL

### Static Hosting
- Deploy `dist/` folder
- Configure base URL if needed
- Set up redirects for SPA

## Troubleshooting Common Issues

### Routes Not Working
- Check Router setup in App.tsx
- Verify route paths
- Check component imports

### Context Not Updating
- Ensure provider wraps component tree
- Check dispatch actions
- Verify dependency arrays

### API Not Calling
- Check API URL in .env
- Verify CORS on backend
- Check network tab for requests
- Check Authorization header

### Styles Not Applying
- Verify Tailwind config
- Check class names spelling
- Clear browser cache
- Rebuild Tailwind CSS

## Next Steps

1. Set up backend API server
2. Configure environment variables
3. Test authentication flow
4. Implement remaining features
5. Set up CI/CD pipeline
6. Deploy to production

## Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Router Docs](https://reactrouter.com)
- [Axios Docs](https://axios-http.com)

## Support & Questions

For issues or questions:
1. Check this guide
2. Review component code
3. Check console for errors
4. Review backend API responses
