import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function QuickActions({ role, profile }: { role: string; profile: any }) {
  const slug = profile?.slug
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <h3 className="text-lg font-semibold text-austin-charcoal mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Link href="/messages"><Button variant="outline" className="w-full">Messages</Button></Link>
        {role === 'VENUE' && <Link href="/slots"><Button variant="outline" className="w-full">Add More Slots</Button></Link>}
        {role === 'BAND' && <Link href="/gigs"><Button variant="austin" className="w-full">Browse Available Gigs</Button></Link>}
        <Link href="/profile/edit">
          <Button variant="austin" className="w-full">
            {role === 'VENUE' ? 'Edit Venue Profile' : 'Edit Profile'}
          </Button>
        </Link>
        {slug && (
          <Link href={`/profiles/${slug}`} target="_blank">
            <Button variant="outline" className="w-full">
              {role === 'VENUE' ? 'View Venue Profile' : 'View Public Profile'}
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}
