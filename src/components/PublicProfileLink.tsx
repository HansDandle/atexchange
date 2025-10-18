import Link from 'next/link'

export default function PublicProfileLink({ profile, role }: { profile: any, role?: string }) {
  if (!profile) return null

  // Venues use numeric id route; other profiles use slug
  if (role === 'VENUE') {
    return (
      <div className="mt-4">
        <Link href={profile?.id ? `/venues/${profile.id}` : '/profile/edit'} className="text-austin-orange hover:underline">
          View public venue profile
        </Link>
      </div>
    )
  }

  const slug = profile?.slug
  if (!slug) return null

  return (
    <div className="mt-4">
      <Link href={`/profiles/${slug}`} className="text-austin-orange hover:underline">
        View public profile: /profiles/{slug}
      </Link>
    </div>
  )
}
