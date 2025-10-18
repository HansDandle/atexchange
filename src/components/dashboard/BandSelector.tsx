"use client"

import React from 'react'
import { useRouter } from 'next/navigation'

interface BandSelectorProps {
  profiles: any[]
  selectedId?: string | number | null
}

export default function BandSelector({ profiles, selectedId }: BandSelectorProps) {
  const router = useRouter()

  return (
    <div>
      <label className="sr-only" htmlFor="band-select">Select band</label>
      <select
        id="band-select"
        className="border rounded p-1 text-sm"
        onChange={(e) => { router.replace(`/dashboard?bandId=${encodeURIComponent(e.target.value)}`) }}
        value={selectedId ?? ''}
      >
        {profiles.map((p: any) => (
          <option key={p.id} value={p.id}>{p.bandName ?? p.venueName ?? p.hostName ?? p.djName ?? p.photographerName ?? p.creativeName ?? (`Profile ${p.id}`)}</option>
        ))}
      </select>
    </div>
  )
}
