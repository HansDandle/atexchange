'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { getOnboardingBandFnUrl } from '@/lib/supabase/functions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface BandOnboardingFormProps {
  onComplete?: (data: any) => void
}

const GENRE_OPTIONS = [
  'Rock', 'Country', 'Blues', 'Jazz', 'Folk', 'Pop', 
  'Indie', 'Alternative', 'Punk', 'Metal', 'Electronic', 
  'Hip-Hop', 'R&B', 'Soul', 'Funk', 'Reggae', 'Other'
]

export default function BandOnboardingForm({ onComplete }: BandOnboardingFormProps) {
  const [formData, setFormData] = useState({
    bandName: '',
    bio: '',
    genre: [] as string[],
    location: '',
    website: '',
    spotifyUrl: '',
    youtubeUrl: '',
    instagramUrl: '',
    facebookUrl: '',
    photos: [] as string[],
    audioSamples: [] as string[],
    techRider: '',
    minFee: '',
    maxFee: ''
  })
  const [uploading, setUploading] = useState(false)

  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4

  const handleGenreToggle = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      genre: prev.genre.includes(genre) 
        ? prev.genre.filter(g => g !== genre)
        : [...prev.genre, genre]
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
      // default: call Supabase Edge Function
      fetch(getOnboardingBandFnUrl(), {
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

  const uploadFiles = async (files: FileList | null, folder = 'bands') => {
    if (!files || files.length === 0) return []
    setUploading(true)
    const supabase = createClient()
    const urls: string[] = []
    for (const f of Array.from(files)) {
      const key = `${Date.now()}-${f.name}`
      const { data, error } = await supabase.storage.from('bands').upload(key, f)
      if (error) {
        console.error('Upload error', error)
        alert(`Upload failed: ${error.message}`)
        continue
      }
      const { data: urlData } = supabase.storage.from('bands').getPublicUrl(data.path)
      urls.push(urlData.publicUrl)
    }
    setUploading(false)
    return urls
  }

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return formData.bandName.trim() !== '' && formData.bio.trim() !== ''
      case 2:
        return formData.genre.length > 0
      case 3:
        return true // Social links are optional
      case 4:
        return true // Pricing is optional
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
            Tell us about your band
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Band Name *
            </label>
            <Input
              value={formData.bandName}
              onChange={(e) => setFormData(prev => ({ ...prev, bandName: e.target.value }))}
              placeholder="Enter your band name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio / Description *
            </label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Tell venues about your band's style, experience, and what makes you unique..."
              rows={4}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Austin, TX"
            />
          </div>
        </div>
      )}

      {currentStep === 2 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-austin-charcoal">
            What genres do you play?
          </h3>
          <p className="text-gray-600">Select all that apply</p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GENRE_OPTIONS.map((genre) => (
              <button
                key={genre}
                type="button"
                onClick={() => handleGenreToggle(genre)}
                className={`p-3 text-sm border-2 rounded-lg transition-colors ${
                  formData.genre.includes(genre)
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

      {currentStep === 3 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-austin-charcoal">
            Social Links & Media
          </h3>
          <p className="text-gray-600">Help venues discover your music (all optional)</p>
          
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website
              </label>
              <Input
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                placeholder="https://yourband.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spotify URL
              </label>
              <Input
                value={formData.spotifyUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, spotifyUrl: e.target.value }))}
                placeholder="https://open.spotify.com/artist/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                YouTube URL
              </label>
              <Input
                value={formData.youtubeUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, youtubeUrl: e.target.value }))}
                placeholder="https://youtube.com/..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instagram
              </label>
              <Input
                value={formData.instagramUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, instagramUrl: e.target.value }))}
                placeholder="https://instagram.com/yourband"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
              <input type="file" accept="image/*" multiple onChange={async (e) => {
                const urls = await uploadFiles(e.target.files, 'bands')
                setFormData(prev => ({ ...prev, photos: [...prev.photos, ...urls] }))
              }} />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Audio Samples</label>
              <input type="file" accept="audio/*" multiple onChange={async (e) => {
                const urls = await uploadFiles(e.target.files, 'bands')
                setFormData(prev => ({ ...prev, audioSamples: [...prev.audioSamples, ...urls] }))
              }} />
            </div>
          </div>
        </div>
      )}

      {currentStep === 4 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-austin-charcoal">
            Technical & Pricing
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Technical Rider / Requirements
            </label>
            <Textarea
              value={formData.techRider}
              onChange={(e) => setFormData(prev => ({ ...prev, techRider: e.target.value }))}
              placeholder="List any sound equipment, lighting, or stage requirements..."
              rows={3}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Fee ($)
              </label>
              <Input
                type="number"
                value={formData.minFee}
                onChange={(e) => setFormData(prev => ({ ...prev, minFee: e.target.value }))}
                placeholder="200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Fee ($)
              </label>
              <Input
                type="number"
                value={formData.maxFee}
                onChange={(e) => setFormData(prev => ({ ...prev, maxFee: e.target.value }))}
                placeholder="800"
              />
            </div>
          </div>

          <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
            💡 <strong>Tip:</strong> Leave pricing flexible to negotiate with venues based on factors like event type, duration, and audience size.
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
              // ensure any queued uploads are complete (uploadFiles handles state)
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