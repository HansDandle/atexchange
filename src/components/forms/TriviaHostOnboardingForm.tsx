'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface TriviaHostOnboardingFormProps {
  onComplete?: (data: any) => void
  initialData?: Partial<{ hostName: string }>
}

export default function TriviaHostOnboardingForm({ onComplete, initialData }: TriviaHostOnboardingFormProps) {
  const [formData, setFormData] = useState({
    hostName: initialData?.hostName || '',
    bio: '',
    specialization: '',
    experience: '',
    location: '',
    website: '',
    phone: '',
    rates: '',
    photos: [] as string[]
  })

  const [uploading, setUploading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 3
  const [isLoading, setIsLoading] = useState(false)

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

      // First, ensure user exists in users table
      // Server-side upsert for user
      await fetch('/api/onboarding/band', { method: 'POST', body: JSON.stringify({ id: session.user.id, email: session.user.email, name: session.user.user_metadata?.name, role: 'TRIVIA_HOST' }), headers: { 'Content-Type': 'application/json' } })

      // Save profile via central save endpoint
      const res = await fetch('/api/profiles/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileType: 'trivia_host_profiles', profileId: session.user.id, payload: { userId: session.user.id, ...formData } })
      })
      const json = await res.json()
      if (!res.ok) {
        console.error('Save failed', json)
        alert('Failed to save profile')
        return
      }

      await supabase.auth.updateUser({ data: { role: 'TRIVIA_HOST' } })
      if (onComplete) onComplete(formData)
      else window.location.href = '/dashboard'
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
        return formData.hostName.trim() !== '' && formData.bio.trim() !== ''
      case 2:
        return true // Contact optional
      case 3:
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
          <h2 className="text-2xl font-bold text-austin-charcoal">Trivia Host Profile</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Host Name *</label>
            <Input
              value={formData.hostName}
              onChange={(e) => setFormData({ ...formData, hostName: e.target.value })}
              placeholder="Your name or hosting alias"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio *</label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about your hosting experience and style"
              rows={4}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
            <Input
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              placeholder="e.g., General Knowledge, Movies, Sports, History"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            <Input
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="e.g., 5 years hosting trivia nights"
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Step 2: Location & Contact */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-austin-charcoal">Contact Information</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="City, State"
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
            <Input
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://yourwebsite.com"
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Step 3: Pricing & Photos */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-austin-charcoal">Pricing & Portfolio</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rates</label>
            <Textarea
              value={formData.rates}
              onChange={(e) => setFormData({ ...formData, rates: e.target.value })}
              placeholder="e.g., $200 per trivia night, or describe your pricing structure"
              rows={3}
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
                  <img key={idx} src={url} alt="Trivia host photo" className="rounded w-full h-24 object-cover" />
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
