'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface DJOnboardingFormProps {
  onComplete?: (data: any) => void
  initialData?: Partial<{ djName: string }>
}

const SPECIALIZATION_OPTIONS = [
  'House', 'Techno', 'Hip-Hop', 'Electronic', 'Deep House',
  'Drum & Bass', 'Dubstep', 'Trance', 'EDM', 'Trap',
  'Indie', 'Rock', 'Pop', 'R&B', 'Soul', 'Jazz', 'Other'
]

export default function DJOnboardingForm({ onComplete, initialData }: DJOnboardingFormProps) {
  const [formData, setFormData] = useState({
    djName: initialData?.djName || '',
    bio: '',
    specialization: [] as string[],
    experience: '',
    location: '',
    website: '',
    mixCloudUrl: '',
    spotifyUrl: '',
    soundCloudUrl: '',
    instagramUrl: '',
    phone: '',
    minFee: '',
    maxFee: '',
    equipment: '',
    photos: [] as string[]
  })

  const [uploading, setUploading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4
  const [isLoading, setIsLoading] = useState(false)

  const handleSpecializationToggle = (spec: string) => {
    setFormData(prev => ({
      ...prev,
      specialization: prev.specialization.includes(spec)
        ? prev.specialization.filter(s => s !== spec)
        : [...prev.specialization, spec]
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

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const supabase = createClient()
      const { data: { session } } = await supabase.auth.getSession()

      if (!session?.user?.id) {
        alert('Not authenticated')
        return
      }

      // Ensure user exists in users table (server-side upsert via API)
      await fetch('/api/onboarding/band', { method: 'POST', body: JSON.stringify({ id: session.user.id, email: session.user.email, name: session.user.user_metadata?.name, role: 'DJ' }), headers: { 'Content-Type': 'application/json' } })

      // Save profile via server action to centralize slug generation and uniqueness
      const res = await fetch('/api/profiles/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileType: 'dj_profiles', profileId: session.user.id, payload: { userId: session.user.id, ...formData } })
      })

      const json = await res.json()
      if (!res.ok) {
        console.error('Save failed', json)
        alert('Failed to save profile')
        return
      }

      // Update user metadata
      await supabase.auth.updateUser({ data: { role: 'DJ' } })

      if (onComplete) {
        onComplete(formData)
      } else {
        window.location.href = '/dashboard'
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Failed to save profile')
    } finally {
      setIsLoading(false)
    }
  }

  const uploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return []
    setUploading(true)
    const supabase = createClient()
    const urls: string[] = []

    for (const f of Array.from(files)) {
      try {
        const fd = new FormData()
        fd.append('file', f)
        fd.append('type', 'photos')

        const res = await fetch('/api/profiles/upload', { method: 'POST', body: fd })
        const json = await res.json()
        if (!res.ok) {
          console.error('Upload failed', json)
          alert('Upload failed')
          continue
        }
        urls.push(json.publicUrl)
      } catch (error) {
        console.error('Upload error:', error)
        alert('Upload failed')
      }
    }

    setUploading(false)
    return urls
  }

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return formData.djName.trim() !== '' && formData.bio.trim() !== ''
      case 2:
        return formData.specialization.length > 0
      case 3:
        return true // Social links optional
      case 4:
        return true // Pricing optional
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

      {/* Step 1: Basic Info */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-austin-charcoal">Tell Us About Yourself</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">DJ Name *</label>
            <Input
              value={formData.djName}
              onChange={(e) => setFormData({ ...formData, djName: e.target.value })}
              placeholder="Your DJ name or stage name"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio *</label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about yourself and your DJing style"
              rows={4}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            <Input
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="e.g., 10 years of DJing"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="City, State"
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Step 2: Specialization */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-austin-charcoal">What genres do you specialize in? *</h2>
          <div className="grid grid-cols-2 gap-3">
            {SPECIALIZATION_OPTIONS.map(spec => (
              <button
                key={spec}
                onClick={() => handleSpecializationToggle(spec)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  formData.specialization.includes(spec)
                    ? 'border-austin-orange bg-austin-orange/10'
                    : 'border-gray-200 hover:border-austin-orange'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Social Media & Links */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-austin-charcoal">Share Your Online Presence</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
            <Input
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://yourwebsite.com"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">MixCloud</label>
            <Input
              value={formData.mixCloudUrl}
              onChange={(e) => setFormData({ ...formData, mixCloudUrl: e.target.value })}
              placeholder="Your MixCloud profile URL"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Spotify</label>
            <Input
              value={formData.spotifyUrl}
              onChange={(e) => setFormData({ ...formData, spotifyUrl: e.target.value })}
              placeholder="Your Spotify profile URL"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">SoundCloud</label>
            <Input
              value={formData.soundCloudUrl}
              onChange={(e) => setFormData({ ...formData, soundCloudUrl: e.target.value })}
              placeholder="Your SoundCloud profile URL"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
            <Input
              value={formData.instagramUrl}
              onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
              placeholder="Your Instagram handle or URL"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <Input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="Your contact number"
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Step 4: Pricing & Equipment */}
      {currentStep === 4 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-austin-charcoal">Pricing & Setup</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Fee ($)</label>
              <Input
                type="number"
                value={formData.minFee}
                onChange={(e) => setFormData({ ...formData, minFee: e.target.value })}
                placeholder="150"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Fee ($)</label>
              <Input
                type="number"
                value={formData.maxFee}
                onChange={(e) => setFormData({ ...formData, maxFee: e.target.value })}
                placeholder="500"
                className="w-full"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Equipment</label>
            <Input
              value={formData.equipment}
              onChange={(e) => setFormData({ ...formData, equipment: e.target.value })}
              placeholder="e.g., Own equipment or Need venue equipment"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
            <input
              type="file"
              multiple
              onChange={async (e) => {
                const urls = await uploadFiles(e.currentTarget.files)
                setFormData(prev => ({ ...prev, photos: [...prev.photos, ...urls] }))
              }}
              disabled={uploading}
              className="w-full"
            />
            {formData.photos.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {formData.photos.map((url, idx) => (
                  <img key={idx} src={url} alt="DJ photo" className="rounded w-full h-24 object-cover" />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between pt-6">
        <Button
          onClick={handlePrevious}
          disabled={currentStep === 1}
          variant="outline"
          className="px-6"
        >
          Previous
        </Button>

        {currentStep < totalSteps ? (
          <Button
            onClick={handleNext}
            disabled={!isStepComplete()}
            className="px-6 bg-austin-orange hover:bg-austin-orange/90"
          >
            Next
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="px-6 bg-green-600 hover:bg-green-700"
          >
            {isLoading ? 'Saving...' : 'Complete Profile'}
          </Button>
        )}
      </div>
    </div>
  )
}
