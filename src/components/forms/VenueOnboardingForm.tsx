'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getOnboardingVenueFnUrl } from '@/lib/supabase/functions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface VenueOnboardingFormProps {
  onComplete?: (data: any) => void
}

const GENRE_PREFERENCES = [
  'Rock', 'Country', 'Blues', 'Jazz', 'Folk', 'Pop', 
  'Indie', 'Alternative', 'Punk', 'Metal', 'Electronic', 
  'Hip-Hop', 'R&B', 'Soul', 'Funk', 'Reggae', 'All Genres'
]

const PAYOUT_TYPES = [
  'Flat Fee', 'Door Split', 'Percentage of Bar Sales', 'Negotiable'
]

export default function VenueOnboardingForm({ onComplete }: VenueOnboardingFormProps) {
  const [formData, setFormData] = useState({
    venueName: '',
    description: '',
    address: '',
    city: 'Austin',
    state: 'TX',
    zipCode: '',
    capacity: '',
    stageSize: '',
    genrePrefs: [] as string[],
    hasSound: false,
    hasLighting: false,
    hasParking: false,
    phone: '',
    website: '',
    bookingEmail: '',
    payoutType: '',
    payoutDetails: ''
    ,photos: [] as string[]
  })
  const [uploading, setUploading] = useState(false)

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const handleGenreToggle = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      genrePrefs: prev.genrePrefs.includes(genre) 
        ? prev.genrePrefs.filter(g => g !== genre)
        : [...prev.genrePrefs, genre]
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = () => {
    if (onComplete) {
      onComplete(formData)
    } else {
      fetch(getOnboardingVenueFnUrl(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      }).then(res => {
        if (res.ok) {
          window.location.href = '/dashboard'
        } else {
          alert('Failed to save profile')
        }
      }).catch(err => {
        console.error(err)
        alert('Failed to save profile')
      })
    }
  }

  const uploadFiles = async (files: FileList | null, folder = 'venues') => {
    if (!files || files.length === 0) return []
    setUploading(true)
    const supabase = createClient()
    const urls: string[] = []
    for (const f of Array.from(files)) {
      const key = `${folder}/${Date.now()}-${f.name}`
      const { data, error } = await supabase.storage.from('public').upload(key, f)
      if (error) {
        console.error('Upload error', error)
        continue
      }
      const { data: urlData } = supabase.storage.from('public').getPublicUrl(data.path)
      urls.push(urlData.publicUrl)
    }
    setUploading(false)
    return urls
  }

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return formData.venueName.trim() !== '' && formData.address.trim() !== ''
      case 2:
        return true // Venue details are mostly optional
      case 3:
        return true // Genre preferences are optional
      case 4:
        return true // Payout terms are optional
      default:
        return false
    }
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gray-500">
            {Math.round((currentStep / totalSteps) * 100)}% Complete
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-austin-orange h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      {/* Step Content */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-austin-charcoal">
            Basic Venue Information
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Venue Name *
            </label>
            <Input
              value={formData.venueName}
              onChange={(e) => setFormData(prev => ({ ...prev, venueName: e.target.value }))}
              placeholder="Enter your venue name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your venue's atmosphere, style, and what makes it special..."
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Street Address *
            </label>
            <Input
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="123 Main St"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <Input
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <Input
                value={formData.state}
                onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Zip Code
              </label>
              <Input
                value={formData.zipCode}
                onChange={(e) => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                placeholder="78701"
              />
            </div>
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-austin-charcoal">
            Venue Details
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Capacity (approximate)
              </label>
              <Input
                type="number"
                value={formData.capacity}
                onChange={(e) => setFormData(prev => ({ ...prev, capacity: e.target.value }))}
                placeholder="150"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stage Size
              </label>
              <Input
                value={formData.stageSize}
                onChange={(e) => setFormData(prev => ({ ...prev, stageSize: e.target.value }))}
                placeholder="e.g., 12x8 feet"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              What does your venue provide?
            </label>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.hasSound}
                  onChange={(e) => setFormData(prev => ({ ...prev, hasSound: e.target.checked }))}
                  className="mr-3"
                />
                Sound system / PA
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.hasLighting}
                  onChange={(e) => setFormData(prev => ({ ...prev, hasLighting: e.target.checked }))}
                  className="mr-3"
                />
                Stage lighting
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.hasParking}
                  onChange={(e) => setFormData(prev => ({ ...prev, hasParking: e.target.checked }))}
                  className="mr-3"
                />
                Parking available
              </label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
            <input type="file" accept="image/*" multiple onChange={async (e) => {
              const urls = await uploadFiles(e.target.files, 'venues')
              setFormData(prev => ({ ...prev, photos: [...prev.photos, ...urls] }))
            }} />
          </div>
        </div>
      )}

      {currentStep === 3 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-austin-charcoal">
            Genre Preferences
          </h3>
          <p className="text-gray-600">What types of music work best for your venue?</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GENRE_PREFERENCES.map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => handleGenreToggle(genre)}
                className={`p-3 text-sm border-2 rounded-lg transition-colors ${
                  formData.genrePrefs.includes(genre)
                    ? 'border-austin-orange bg-austin-orange/10 text-austin-orange'
                    : 'border-gray-200 hover:border-austin-orange/50'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-austin-charcoal">
            Contact & Booking Terms
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="(512) 555-0123"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <Input
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                placeholder="https://yourvenue.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Booking Email
            </label>
            <Input
              value={formData.bookingEmail}
              onChange={(e) => setFormData(prev => ({ ...prev, bookingEmail: e.target.value }))}
              placeholder="booking@yourvenue.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Typical Payout Structure
            </label>
            <select
              value={formData.payoutType}
              onChange={(e) => setFormData(prev => ({ ...prev, payoutType: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-austin-orange focus:border-austin-orange"
            >
              <option value="">Select payout type...</option>
              {PAYOUT_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Payout Details
            </label>
            <Textarea
              value={formData.payoutDetails}
              onChange={(e) => setFormData(prev => ({ ...prev, payoutDetails: e.target.value }))}
              placeholder="Describe your typical payment terms, timing, and any other relevant details..."
              rows={3}
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 1}
        >
          Previous
        </Button>

        {currentStep === totalSteps ? (
          <Button
            type="button"
            variant="austin"
            onClick={async () => {
              await handleSubmit()
            }}
          >
            {uploading ? 'Uploading...' : 'Complete Setup'}
          </Button>
        ) : (
          <Button
            type="button"
            variant="austin"
            onClick={handleNext}
            disabled={!isStepComplete()}
          >
            Next
          </Button>
        )}
      </div>
    </div>
  )
}