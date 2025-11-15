'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'

export default function SuspendedPage() {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg border border-red-200 p-8 text-center">
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-red-600 mb-2">Account Suspended</h1>
          </div>

          <p className="text-gray-600 mb-6">
            Your account has been suspended due to a policy violation. This action is permanent and cannot be reversed.
          </p>

          <p className="text-sm text-gray-500 mb-8">
            If you believe this is an error, please contact our support team for further assistance.
          </p>

          <Button
            onClick={handleSignOut}
            variant="austin"
            className="w-full"
          >
            Sign Out
          </Button>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Austin Talent Exchange Support
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
