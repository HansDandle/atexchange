"use client"
import React from 'react'
import { Button } from '@/components/ui/button'

interface Props { photos: string[] }

export default function BandGallery({ photos }: Props) {
  const [idx, setIdx] = React.useState(0)
  const length = photos?.length || 0

  React.useEffect(() => {
    if (length <= 1) return
    const t = setInterval(() => setIdx((i) => (i + 1) % length), 4000)
    return () => clearInterval(t)
  }, [length])

  if (!photos || photos.length === 0) {
    return (
      <div className="w-full h-64 bg-gray-100 rounded flex items-center justify-center text-gray-500">No photos yet</div>
    )
  }

  return (
    <div className="relative">
      <img src={photos[idx]} alt={`photo-${idx+1}`} className="w-full h-64 object-cover rounded-md shadow" />
      {length > 1 && (
        <div className="absolute inset-0 flex items-center justify-between px-3">
          <Button variant="ghost" size="icon" onClick={() => setIdx((i) => (i - 1 + length) % length)} aria-label="Previous">
            ‹
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIdx((i) => (i + 1) % length)} aria-label="Next">
            ›
          </Button>
        </div>
      )}
      {length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {photos.map((_, i) => (
            <button key={i} className={`w-2 h-2 rounded-full ${i===idx? 'bg-white':'bg-white/50'}`} onClick={() => setIdx(i)} aria-label={`Go to ${i+1}`}></button>
          ))}
        </div>
      )}
    </div>
  )
}
