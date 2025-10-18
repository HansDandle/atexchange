'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface OtherCreativeOnboardingFormProps {
  onComplete?: (data: any) => void
  initialData?: Partial<{ creativeName: string }>
}

export default function OtherCreativeOnboardingForm({ onComplete, initialData }: OtherCreativeOnboardingFormProps) {
  const [formData, setFormData] = useState({
    creativeName: initialData?.creativeName || '',
    bio: '',
    creativeType: '',
    specialization: '',
    experience: '',
    location: '',
    website: '',
    phone: '',
    rates: '',
    portfolio: [] as string[]
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

      // Server-side upsert for user
      await fetch('/api/onboarding/band', { method: 'POST', body: JSON.stringify({ id: session.user.id, email: session.user.email, name: session.user.user_metadata?.name, role: 'OTHER_CREATIVE' }), headers: { 'Content-Type': 'application/json' } })

      // Save profile via central save endpoint
      const res = await fetch('/api/profiles/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profileType: 'other_creative_profiles', profileId: session.user.id, payload: { userId: session.user.id, ...formData } })
      })
      const json = await res.json()
      if (!res.ok) {
        console.error('Save failed', json)
        alert('Failed to save profile')
        return
      }

      await supabase.auth.updateUser({ data: { role: 'OTHER_CREATIVE' } })
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
        const key = `${Date.now()}-${f.name}`
        const { data, error } = await supabase.storage.from('other_creatives').upload(key, f)
        if (error) throw error

        const { data: urlData } = supabase.storage.from('other_creatives').getPublicUrl(data.path)
        urls.push(urlData.publicUrl)
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
        return formData.creativeName.trim() !== '' && formData.bio.trim() !== '' && formData.creativeType.trim() !== ''
      case 2:
        return true // Contact optional
      case 3:
        return true // Portfolio optional
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
          <h2 className="text-2xl font-bold text-austin-charcoal">Tell Us About Your Creative Work</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
            <Input
              value={formData.creativeName}
              onChange={(e) => setFormData({ ...formData, creativeName: e.target.value })}
              placeholder="Your name or artist name"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">What type of creative work do you do? *</label>
            <Input
              value={formData.creativeType}
              onChange={(e) => setFormData({ ...formData, creativeType: e.target.value })}
              placeholder="e.g., Comedian, Poet, Magician, Artist, Painter, etc."
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio *</label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about your creative work and background"
              rows={4}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
            <Input
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              placeholder="What areas are you best at?"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            <Input
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="e.g., 10 years of professional experience"
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

      {/* Step 3: Pricing & Portfolio */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-austin-charcoal">Rates & Portfolio</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rates</label>
            <Textarea
              value={formData.rates}
              onChange={(e) => setFormData({ ...formData, rates: e.target.value })}
              placeholder="e.g., $150-$500 per hour, or describe your pricing structure"
              rows={3}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Files</label>
            <input
              type="file"
              multiple
              onChange={async (e) => {
                const urls = await uploadFiles(e.currentTarget.files)
                setFormData(prev => ({ ...prev, portfolio: [...prev.portfolio, ...urls] }))
              }}
              disabled={uploading}
              className="w-full"
            />
            {formData.portfolio.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-2">Uploaded files:</p>
                <ul className="space-y-1">
                  {formData.portfolio.map((url, idx) => (
                    <li key={idx} className="text-sm text-blue-600 truncate">
                      <a href={url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        File {idx + 1}
                      </a>
                    </li>
                  ))}
                </ul>
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
