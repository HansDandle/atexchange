import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Header from '@/components/Header'

export default async function ClaimVenuePage() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If already logged in and has a venue profile, redirect to dashboard
  if (user) {
    const { data: dbUser } = await supabase
      .from('users')
      .select('id, role')
      .eq('supabaseId', user.id)
      .single()

    if (dbUser && dbUser.role === 'VENUE') {
      redirect('/dashboard')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Image src="/atxlogo.png" alt="Austin Talent Exchange" width={120} height={120} className="mx-auto mb-4" />
          </div>
          <div className="bg-white rounded-lg shadow-md p-8">
            <h1 className="text-3xl font-bold text-austin-charcoal mb-6">Claim Your Venue Profile</h1>
            
            {!user ? (
              <>
                <p className="text-gray-700 mb-4">
                  To claim an existing venue profile, you'll need to create an account first.
                </p>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <h2 className="text-lg font-semibold text-blue-900 mb-3">Next Steps:</h2>
                  <ol className="list-decimal list-inside space-y-2 text-blue-800">
                    <li>Create an account using the button below</li>
                    <li>Once your account is created, contact our support team</li>
                    <li>We'll link your account to your venue profile</li>
                  </ol>
                </div>

                <div className="mb-8">
                  <Link href="/onboarding" className="inline-block bg-austin-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600">
                    Create Account
                  </Link>
                </div>
              </>
            ) : (
              <>
                <p className="text-gray-700 mb-4">
                  Great! Your account is created. Now contact our support team to link your account to your venue profile.
                </p>

                <div className="mb-8">
                  <Link href="/dashboard" className="inline-block bg-austin-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600">
                    Go to Dashboard
                  </Link>
                </div>
              </>
            )}

            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-green-900 mb-3">Contact Support:</h2>
              <p className="text-green-800 mb-3">Email us or give us a call:</p>
              <p className="text-green-800 mb-4">
                <span className="font-semibold">Email:</span> <a href="mailto:info@austintalentexchange.com" className="text-austin-orange hover:underline">info@austintalentexchange.com</a>
              </p>
              <p className="text-green-800">
                <span className="font-semibold">Phone:</span> 
                <span className="ml-2 select-none inline-flex gap-1 items-center">
                  <span className="font-mono bg-white px-3 py-2 rounded border border-green-300 text-lg font-bold text-gray-900">
                    512
                  </span>
                  <span className="text-green-700 font-semibold">–</span>
                  <span className="font-mono bg-white px-3 py-2 rounded border border-green-300 text-lg font-bold text-gray-900">
                    921
                  </span>
                  <span className="text-green-700 font-semibold">–</span>
                  <span className="font-mono bg-white px-3 py-2 rounded border border-green-300 text-lg font-bold text-gray-900">
                    4157
                  </span>
                </span>
              </p>
              <p className="text-sm text-green-700 mt-3">
                Please mention the name of your venue when you contact us so we can quickly locate and link your profile.
              </p>
            </div>

            <div className="border-t pt-6 mt-6">
              <h3 className="font-semibold text-austin-charcoal mb-2">Have a question?</h3>
              <p className="text-gray-600">
                Feel free to reach out to our team using the contact information above. We're here to help!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
