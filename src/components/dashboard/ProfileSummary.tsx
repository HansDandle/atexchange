import React from 'react'

export default function ProfileSummary({ profile, role }: { profile: any; role: string }) {
  if (!profile) return null
  const title = profile.bandName ?? profile.venueName ?? profile.hostName ?? profile.djName ?? profile.photographerName ?? profile.creativeName ?? 'Profile'
  return (
    <section className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-gray-600">{role}</p>
      {profile.photos?.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {profile.photos.slice(0, 3).map((url: string) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={url} src={url} className="w-full h-24 object-cover rounded" alt="" />
          ))}
        </div>
      )}
    </section>
  )
}
