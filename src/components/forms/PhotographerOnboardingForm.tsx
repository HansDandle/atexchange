'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface PhotographerOnboardingFormProps {
  onComplete?: (data: any) => void
  initialData?: Partial<{ photographerName: string }>
}

const SPECIALIZATION_OPTIONS = [
  'Weddings', 'Events', 'Portraits', 'Product', 'Real Estate',
  'Landscapes', 'Street Photography', 'Fashion', 'Food',
  'Corporate', 'Editorial', 'Headshots', 'Other'
]

export default function PhotographerOnboardingForm({ onComplete, initialData }: PhotographerOnboardingFormProps) {
  const [formData, setFormData] = useState({
    photographerName: initialData?.photographerName || '',
    bio: '',
    specialization: [] as string[],
    experience: '',
    location: '',
    website: '',
    instagramUrl: '',
    phone: '',
    rates: '',
    portfolioPhotos: [] as string[]
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

      // First, ensure user exists in users table
      const { error: userError } = await supabase
        .from('users')
        .upsert({
          id: session.user.id,
          email: session.user.email,
          name: session.user.user_metadata?.name,
          role: 'PHOTOGRAPHER'
        }, {
          onConflict: 'id'
        })

      if (userError) throw userError

      // Then insert profile
      const { error: profileError } = await supabase
        .from('photographer_profiles')
        .insert({
          userId: session.user.id,
          ...formData
        })

      if (profileError) throw profileError

      // Update user metadata
      await supabase.auth.updateUser({
        data: { role: 'PHOTOGRAPHER' }
      })

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
        const { data, error } = await supabase.storage.from('photographers').upload(key, f)
        if (error) throw error

        const { data: urlData } = supabase.storage.from('photographers').getPublicUrl(data.path)
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
        return formData.photographerName.trim() !== '' && formData.bio.trim() !== ''
      case 2:
        return formData.specialization.length > 0
      case 3:
        return true // Contact optional
      case 4:
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
          <h2 className="text-2xl font-bold text-austin-charcoal">Photographer Profile</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Photographer Name *</label>
            <Input
              value={formData.photographerName}
              onChange={(e) => setFormData({ ...formData, photographerName: e.target.value })}
              placeholder="Your name or studio name"
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bio *</label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Tell us about your photography style and experience"
              rows={4}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Experience</label>
            <Input
              value={formData.experience}
              onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
              placeholder="e.g., 8 years of professional photography"
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Step 2: Specialization */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-austin-charcoal">What's your specialty? *</h2>
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

      {/* Step 3: Contact Information */}
      {currentStep === 3 && (
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
            <Input
              value={formData.instagramUrl}
              onChange={(e) => setFormData({ ...formData, instagramUrl: e.target.value })}
              placeholder="Your Instagram handle or URL"
              className="w-full"
            />
          </div>
        </div>
      )}

      {/* Step 4: Pricing & Portfolio */}
      {currentStep === 4 && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-austin-charcoal">Rates & Portfolio</h2>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rates</label>
            <Textarea
              value={formData.rates}
              onChange={(e) => setFormData({ ...formData, rates: e.target.value })}
              placeholder="e.g., $500-$2000 per session, or describe your pricing structure"
              rows={3}
              className="w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Portfolio Photos</label>
            <input
              type="file"
              multiple
              onChange={async (e) => {
                const urls = await uploadFiles(e.currentTarget.files)
                setFormData(prev => ({ ...prev, portfolioPhotos: [...prev.portfolioPhotos, ...urls] }))
              }}
              disabled={uploading}
              className="w-full"
            />
            {formData.portfolioPhotos.length > 0 && (
              <div className="mt-2 grid grid-cols-3 gap-2">
                {formData.portfolioPhotos.map((url, idx) => (
                  <img key={idx} src={url} alt="Portfolio" className="rounded w-full h-24 object-cover" />
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
