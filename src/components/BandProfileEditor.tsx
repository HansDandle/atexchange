'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Save, Upload, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface BandProfile {
  id: string
  bandName: string
  bio: string | null
  genre: string[] | null
  location: string | null
  website: string | null
  spotifyUrl: string | null
  youtubeUrl: string | null
  instagramUrl: string | null
  facebookUrl: string | null
  photos: string[] | null
  audioSamples: string[] | null
  techRider: string | null
  minFee: number | null
  maxFee: number | null
}

interface BandProfileEditorProps {
  profile: BandProfile
}

const GENRES = [
  'Rock', 'Country', 'Blues', 'Jazz', 'Folk', 'Pop', 
  'Indie', 'Alternative', 'Punk', 'Metal', 'Electronic', 
  'Hip-Hop', 'R&B', 'Soul', 'Funk', 'Reggae'
]

export default function BandProfileEditor({ profile }: BandProfileEditorProps) {
  const slugify = (s: string) => s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  const [formData, setFormData] = useState({
    bandName: profile.bandName || '',
    bio: profile.bio || '',
    genre: profile.genre || [],
    location: profile.location || '',
    website: profile.website || '',
    spotifyUrl: profile.spotifyUrl || '',
    youtubeUrl: profile.youtubeUrl || '',
    instagramUrl: profile.instagramUrl || '',
    facebookUrl: profile.facebookUrl || '',
    techRider: profile.techRider || '',
    minFee: profile.minFee ? (profile.minFee / 100).toString() : '',
    maxFee: profile.maxFee ? (profile.maxFee / 100).toString() : '',
    photos: profile.photos || [],
    audioSamples: profile.audioSamples || []
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleGenreToggle = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      genre: prev.genre.includes(genre)
        ? prev.genre.filter(g => g !== genre)
        : [...prev.genre, genre]
    }))
  }

  const uploadFiles = async (files: FileList | null, type: 'photos' | 'audioSamples') => {
    if (!files || files.length === 0) return []
    
    setUploading(true)
    const supabase = createClient()
    const urls: string[] = []
    
    // Enforce 5-photo limit for photos
    if (type === 'photos') {
      const existing = formData.photos.length
      if (existing + files.length > 5) {
        alert('You can upload up to 5 photos. Please remove some photos before adding more.')
        setUploading(false)
        return []
      }
    }

    for (const file of Array.from(files)) {
      const bucket = type === 'photos' ? 'bands' : 'bands'
      const key = `${type}/${Date.now()}-${file.name}`
      
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(key, file)
      
      if (error) {
        console.error('Upload error:', error)
        alert(`Upload failed: ${error.message}`)
        continue
      }
      
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(data.path)
      
      urls.push(urlData.publicUrl)
    }
    
    setUploading(false)
    return urls
  }

  const handleFileUpload = async (files: FileList | null, type: 'photos' | 'audioSamples') => {
    const newUrls = await uploadFiles(files, type)
    if (newUrls.length > 0) {
      setFormData(prev => ({
        ...prev,
        [type]: [...prev[type], ...newUrls]
      }))
    }
  }

  const removeFile = (url: string, type: 'photos' | 'audioSamples') => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].filter(u => u !== url)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()

    try {
      const updateData = {
        bandName: formData.bandName,
        slug: formData.bandName ? slugify(formData.bandName) : null,
        bio: formData.bio || null,
        genre: formData.genre.length > 0 ? formData.genre : null,
        location: formData.location || null,
        website: formData.website || null,
        spotifyUrl: formData.spotifyUrl || null,
        youtubeUrl: formData.youtubeUrl || null,
        instagramUrl: formData.instagramUrl || null,
        facebookUrl: formData.facebookUrl || null,
        techRider: formData.techRider || null,
        minFee: formData.minFee ? parseInt(formData.minFee) * 100 : null,
        maxFee: formData.maxFee ? parseInt(formData.maxFee) * 100 : null,
        photos: formData.photos.length > 0 ? formData.photos : null,
        audioSamples: formData.audioSamples.length > 0 ? formData.audioSamples : null
      }

      const { error } = await supabase
        .from('band_profiles')
        .update(updateData)
        .eq('id', profile.id)

      if (error) throw error

      alert('Profile updated successfully!')

    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
      {/* Basic Information */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-austin-charcoal mb-4">Basic Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Band Name *
            </label>
            <Input
              value={formData.bandName}
              onChange={(e) => setFormData({ ...formData, bandName: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <Input
              placeholder="Austin, TX"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Band Bio *
          </label>
          <Textarea
            rows={4}
            placeholder="Tell venues about your band's style, experience, and what makes you unique..."
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Genres */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-austin-charcoal mb-4">Genres</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {GENRES.map((genre) => (
            <label key={genre} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.genre.includes(genre)}
                onChange={() => handleGenreToggle(genre)}
                className="rounded"
              />
              <span className="text-sm">{genre}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Social Links */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-austin-charcoal mb-4">Social Links & Website</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <Input
              type="url"
              placeholder="https://yourbandwebsite.com"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Spotify URL
            </label>
            <Input
              type="url"
              placeholder="https://open.spotify.com/artist/..."
              value={formData.spotifyUrl}
              onChange={(e) => setFormData({ ...formData, spotifyUrl: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              YouTube URL
            </label>
            <Input
              type="url"
              placeholder="https://youtube.com/..."
              value={formData.youtubeUrl}
              onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Instagram URL
            </label>
            <Input
              type="url"
              placeholder="https://instagram.com/..."
              value={formData.instagramUrl}
              onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Facebook URL
            </label>
            <Input
              type="url"
              placeholder="https://facebook.com/..."
              value={formData.facebookUrl}
              onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Photos */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-austin-charcoal mb-4">Band Photos</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Photos
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files, 'photos')}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-austin-orange file:text-white hover:file:bg-austin-red"
              disabled={uploading}
            />
          </div>

          {formData.photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {formData.photos.map((url, index) => (
                <div key={index} className="relative">
                  <img
                    src={url}
                    alt={`Band photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(url, 'photos')}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Technical & Pricing */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-austin-charcoal mb-4">Technical Requirements & Pricing</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Technical Rider
            </label>
            <Textarea
              rows={3}
              placeholder="List your equipment needs, setup requirements, etc."
              value={formData.techRider}
              onChange={(e) => setFormData({ ...formData, techRider: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Fee ($)
              </label>
              <Input
                type="number"
                placeholder="200"
                value={formData.minFee}
                onChange={(e) => setFormData({ ...formData, minFee: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Fee ($)
              </label>
              <Input
                type="number"
                placeholder="800"
                value={formData.maxFee}
                onChange={(e) => setFormData({ ...formData, maxFee: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end space-x-4">
        <a href="/dashboard">
          <Button variant="outline" type="button">
            Cancel
          </Button>
        </a>
        <Button 
          variant="austin" 
          type="submit" 
          disabled={isSubmitting || uploading}
          className="flex items-center space-x-2"
        >
          <Save className="w-4 h-4" />
          <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
        </Button>
      </div>
    </form>
  )
}