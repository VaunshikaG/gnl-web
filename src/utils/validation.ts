export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  return { valid: errors.length === 0, errors }
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

export const validateName = (name: string): boolean => {
  return name.trim().length >= 2
}

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}

export interface FormErrors {
  [key: string]: string
}

export const validateLoginForm = (email: string, password: string): FormErrors => {
  const errors: FormErrors = {}

  if (!email) {
    errors.email = 'Email is required'
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email'
  }

  if (!password) {
    errors.password = 'Password is required'
  }

  return errors
}

export const validateSignupForm = (
  name: string,
  email: string,
  phone: string,
  password: string,
  confirmPassword: string
): FormErrors => {
  const errors: FormErrors = {}

  if (!name || !validateName(name)) {
    errors.name = 'Please enter a valid name'
  }

  if (!email) {
    errors.email = 'Email is required'
  } else if (!validateEmail(email)) {
    errors.email = 'Please enter a valid email'
  }

  if (!phone || !validatePhone(phone)) {
    errors.phone = 'Please enter a valid phone number'
  }

  const passwordValidation = validatePassword(password)
  if (!passwordValidation.valid) {
    errors.password = passwordValidation.errors[0]
  }

  if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return errors
}

export const validateProfileForm = (name: string, email: string, phone: string, city: string): FormErrors => {
  const errors: FormErrors = {}

  if (!name || !validateName(name)) {
    errors.name = 'Please enter a valid name'
  }

  if (!email || !validateEmail(email)) {
    errors.email = 'Please enter a valid email'
  }

  if (!phone || !validatePhone(phone)) {
    errors.phone = 'Please enter a valid phone number'
  }

  if (!city || !validateRequired(city)) {
    errors.city = 'City is required'
  }

  return errors
}
