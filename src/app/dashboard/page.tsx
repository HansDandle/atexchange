import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }

  // For now, we'll show a simple dashboard
  // Later we'll check user profile and role to show appropriate content
  
  const handleSignOut = async () => {
    'use server'
    const supabase = createClient()
    await supabase.auth.signOut()
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-austin-charcoal">
              Austin Talent Exchange
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user.user_metadata?.name || user.email}
              </span>
              <form action={handleSignOut}>
                <Button variant="outline" size="sm">
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <h2 className="text-3xl font-bold text-austin-charcoal mb-4">
              Welcome to Your Dashboard!
            </h2>
            <p className="text-gray-600 mb-8">
              Your account has been created successfully. 
              Let&apos;s set up your profile to get started.
            </p>
            
            <div className="space-y-4">
              <Link href="/onboarding">
                <Button variant="austin" size="lg">
                  Complete Your Profile
                </Button>
              </Link>
              
              <div className="text-sm text-gray-500">
                User ID: {user.id}
                <br />
                Role: {user.user_metadata?.role || 'Not set'}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}