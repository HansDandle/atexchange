"use client"

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
  const [role, setRole] = useState<UserRole | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const r = searchParams?.get('role')
    if (r === 'band') setRole('BAND')
    if (r === 'venue') setRole('VENUE')
  }, [searchParams])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

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
      setError('Please select whether you are an artist or venue')
      setLoading(false)
      return
    }
    try {
      // Build a proper redirect origin for the verification link.
      // Prefer an explicit NEXT_PUBLIC_SITE_URL, then Vercel preview URL, then window.location.origin.
      const envSite = process.env.NEXT_PUBLIC_SITE_URL
      const vercel = process.env.NEXT_PUBLIC_VERCEL_URL
      const origin = envSite && envSite.startsWith('http')
        ? envSite
        : vercel
        ? `https://${vercel}`
        : typeof window !== 'undefined'
        ? window.location.origin
        : 'http://localhost:3000'

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          // ensure the verification link sent by Supabase points back to the deployed site
          emailRedirectTo: origin,
          data: {
            role
          }
        }
      })

      if (error) {
        setError(error.message)
        return
      }

      // If Supabase returns an authenticated user (not using email confirmation), go to dashboard.
      if (data?.user) {
        router.push('/dashboard')
        return
      }

      // Otherwise an email confirmation was sent — show a friendly message.
      setSuccessMessage(`A verification link has been sent to ${email}. Please check your inbox; the link will return you to ${origin}.`)
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
          {successMessage ? (
            <div className="space-y-4 text-center">
              <div className="text-green-700">{successMessage}</div>
              <div className="text-sm text-gray-600">If you don't see the email, check your spam folder.</div>
              <div className="mt-4">
                <Link href="/login">
                  <Button variant="outline">Back to Sign In</Button>
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSignup} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Role Selection: Artist or Venue */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                I am an...
              </label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant={role === 'BAND' ? 'austin' : 'outline'}
                  size="lg"
                  onClick={() => setRole('BAND')}
                  className="flex flex-col items-center justify-center p-4"
                >
                  <div className="text-2xl mb-1">🎵</div>
                  <div className="font-medium">Artist</div>
                </Button>
                <Button
                  type="button"
                  variant={role === 'VENUE' ? 'austin' : 'outline'}
                  size="lg"
                  onClick={() => setRole('VENUE')}
                  className="flex flex-col items-center justify-center p-4"
                >
                  <div className="text-2xl mb-1">🏛️</div>
                  <div className="font-medium">Venue</div>
                </Button>
              </div>
            </div>

            {/* Name is collected during onboarding; signup only asks for email & password */}

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
          )}

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