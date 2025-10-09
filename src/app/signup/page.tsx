'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type UserRole = 'BAND' | 'VENUE'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  // Get role from URL parameter if present
  useEffect(() => {
    const roleParam = searchParams.get('role')
    if (roleParam === 'band') {
      setRole('BAND')
    } else if (roleParam === 'venue') {
      setRole('VENUE')
    }
  }, [searchParams])

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (!role) {
      setError('Please select whether you are a band or venue')
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          }
        }
      })

      if (error) {
        setError(error.message)
        return
      }

      if (data.user) {
        // Redirect to onboarding or dashboard
        router.push('/onboarding')
      }
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-austin-light via-white to-austin-warm flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-austin-orange/20">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-austin-charcoal mb-2">
              Join the Exchange
            </h1>
            <p className="text-gray-600">
              Create your Austin Talent Exchange account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am a...
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('BAND')}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    role === 'BAND' 
                      ? 'border-austin-orange bg-austin-orange/10 text-austin-orange'
                      : 'border-gray-200 hover:border-austin-orange/50'
                  }`}
                >
                  <div className="text-2xl mb-1">🎵</div>
                  <div className="font-medium">Band</div>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('VENUE')}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    role === 'VENUE' 
                      ? 'border-austin-orange bg-austin-orange/10 text-austin-orange'
                      : 'border-gray-200 hover:border-austin-orange/50'
                  }`}
                >
                  <div className="text-2xl mb-1">🏛️</div>
                  <div className="font-medium">Venue</div>
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                {role === 'BAND' ? 'Band Name' : role === 'VENUE' ? 'Venue Name' : 'Name'}
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-austin-orange focus:border-austin-orange transition-colors"
                placeholder={role === 'BAND' ? 'Your band name' : role === 'VENUE' ? 'Your venue name' : 'Your name'}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-austin-orange focus:border-austin-orange transition-colors"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-austin-orange focus:border-austin-orange transition-colors"
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-austin-orange focus:border-austin-orange transition-colors"
                placeholder="••••••••"
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              variant="austin"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-austin-orange hover:text-austin-red font-medium">
                Sign in
              </Link>
            </p>
            
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-700 block">
              ← Back to homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}