'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Save, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface VenueProfile {
  id: string
  venueName: string
  description: string | null
  address: string | null
  city: string | null
  state: string | null
  zipCode: string | null
  capacity: number | null
  stageSize: string | null
  genrePrefs: string[] | null
  hasSound: boolean
  hasLighting: boolean
  hasParking: boolean
  phone: string | null
  website: string | null
  bookingEmail: string | null
  payoutType: string | null
  payoutDetails: string | null
  photos: string[] | null
}

interface VenueProfileEditorProps {
  profile: VenueProfile
}

const GENRES = [
  'Rock', 'Country', 'Blues', 'Jazz', 'Folk', 'Pop', 
  'Indie', 'Alternative', 'Punk', 'Metal', 'Electronic', 
  'Hip-Hop', 'R&B', 'Soul', 'Funk', 'Reggae', 'All Genres'
]

const PAYOUT_TYPES = [
  'Flat Fee', 'Door Split', 'Percentage of Bar Sales', 'Negotiable'
]

export default function VenueProfileEditor({ profile }: VenueProfileEditorProps) {
  const [formData, setFormData] = useState({
    venueName: profile.venueName || '',
    description: profile.description || '',
    address: profile.address || '',
    city: profile.city || '',
    state: profile.state || '',
    zipCode: profile.zipCode || '',
    capacity: profile.capacity?.toString() || '',
    stageSize: profile.stageSize || '',
    genrePrefs: profile.genrePrefs || [],
    hasSound: profile.hasSound || false,
    hasLighting: profile.hasLighting || false,
    hasParking: profile.hasParking || false,
    phone: profile.phone || '',
    website: profile.website || '',
    bookingEmail: profile.bookingEmail || '',
    payoutType: profile.payoutType || '',
    payoutDetails: profile.payoutDetails || '',
    photos: profile.photos || []
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleGenreToggle = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      genrePrefs: prev.genrePrefs.includes(genre)
        ? prev.genrePrefs.filter(g => g !== genre)
        : [...prev.genrePrefs, genre]
    }))
  }

  const uploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return []
    
    setUploading(true)
    const supabase = createClient()
    const urls: string[] = []
    
    for (const file of Array.from(files)) {
      const key = `photos/${Date.now()}-${file.name}`
      
      const { data, error } = await supabase.storage
        .from('venues')
        .upload(key, file)
      
      if (error) {
        console.error('Upload error:', error)
        alert(`Upload failed: ${error.message}`)
        continue
      }
      
      const { data: urlData } = supabase.storage
        .from('venues')
        .getPublicUrl(data.path)
      
      urls.push(urlData.publicUrl)
    }
    
    setUploading(false)
    return urls
  }

  const handleFileUpload = async (files: FileList | null) => {
    const newUrls = await uploadFiles(files)
    if (newUrls.length > 0) {
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, ...newUrls]
      }))
    }
  }

  const removePhoto = (url: string) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter(u => u !== url)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()

    try {
      const updateData = {
        venueName: formData.venueName,
        description: formData.description || null,
        address: formData.address || null,
        city: formData.city || null,
        state: formData.state || null,
        zipCode: formData.zipCode || null,
        capacity: formData.capacity ? parseInt(formData.capacity) : null,
        stageSize: formData.stageSize || null,
        genrePrefs: formData.genrePrefs.length > 0 ? formData.genrePrefs : null,
        hasSound: formData.hasSound,
        hasLighting: formData.hasLighting,
        hasParking: formData.hasParking,
        phone: formData.phone || null,
        website: formData.website || null,
        bookingEmail: formData.bookingEmail || null,
        payoutType: formData.payoutType || null,
        payoutDetails: formData.payoutDetails || null,
        photos: formData.photos.length > 0 ? formData.photos : null
      }

      const { error } = await supabase
        .from('venue_profiles')
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
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Venue Name *
            </label>
            <Input
              value={formData.venueName}
              onChange={(e) => setFormData({ ...formData, venueName: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Textarea
            rows={4}
            placeholder="Describe your venue's atmosphere, history, and what makes it special..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
      </div>

      {/* Location */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-austin-charcoal mb-4">Location</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <Input
              placeholder="123 Main St"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <Input
              placeholder="Austin"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <Input
              placeholder="TX"
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Zip Code
            </label>
            <Input
              placeholder="78701"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <Input
              type="tel"
              placeholder="(512) 123-4567"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Website
            </label>
            <Input
              type="url"
              placeholder="https://yourvenue.com"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Booking Email
            </label>
            <Input
              type="email"
              placeholder="booking@yourvenue.com"
              value={formData.bookingEmail}
              onChange={(e) => setFormData({ ...formData, bookingEmail: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Venue Details */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-austin-charcoal mb-4">Venue Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Capacity
            </label>
            <Input
              type="number"
              placeholder="200"
              value={formData.capacity}
              onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stage Size
            </label>
            <Input
              placeholder="e.g., 16x12 feet"
              value={formData.stageSize}
              onChange={(e) => setFormData({ ...formData, stageSize: e.target.value })}
            />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Amenities
          </label>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.hasSound}
                onChange={(e) => setFormData({ ...formData, hasSound: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm">Sound System Available</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.hasLighting}
                onChange={(e) => setFormData({ ...formData, hasLighting: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm">Stage Lighting Available</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.hasParking}
                onChange={(e) => setFormData({ ...formData, hasParking: e.target.checked })}
                className="rounded"
              />
              <span className="text-sm">Parking Available</span>
            </label>
          </div>
        </div>
      </div>

      {/* Genre Preferences */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-austin-charcoal mb-4">Genre Preferences</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {GENRES.map((genre) => (
            <label key={genre} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.genrePrefs.includes(genre)}
                onChange={() => handleGenreToggle(genre)}
                className="rounded"
              />
              <span className="text-sm">{genre}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Payout Information */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-austin-charcoal mb-4">Payout Information</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payout Type
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-austin-orange"
              value={formData.payoutType}
              onChange={(e) => setFormData({ ...formData, payoutType: e.target.value })}
            >
              <option value="">Select payout type...</option>
              {PAYOUT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Payout Details
            </label>
            <Textarea
              rows={3}
              placeholder="Describe your typical payout structure, rates, or terms..."
              value={formData.payoutDetails}
              onChange={(e) => setFormData({ ...formData, payoutDetails: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Photos */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-austin-charcoal mb-4">Venue Photos</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Photos
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileUpload(e.target.files)}
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
                    alt={`Venue photo ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(url)}
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