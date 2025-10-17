'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Save, X } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface TriviaProfile {
  id: string
  hostName: string
  bio: string | null
  specialization: string | null
  experience: string | null
  photos: string[] | null
  website: string | null
  phone: string | null
  location: string | null
  rates: number | null
}

interface Props {
  profile: TriviaProfile
}

export default function TriviaHostProfileEditor({ profile }: Props) {
  const slugify = (s: string) => s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')

  const [formData, setFormData] = useState({
    hostName: profile.hostName || '',
    bio: profile.bio || '',
    specialization: profile.specialization || '',
    experience: profile.experience || '',
    website: profile.website || '',
    phone: profile.phone || '',
    location: profile.location || '',
    rates: profile.rates ? String(profile.rates) : '',
    photos: profile.photos || [] as string[]
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setIsSubmitting(true)
    try {
      const supabase = createClient()
      const updateData = {
        hostName: formData.hostName,
        slug: formData.hostName ? slugify(formData.hostName) : null,
        bio: formData.bio || null,
        specialization: formData.specialization || null,
        experience: formData.experience || null,
        website: formData.website || null,
        phone: formData.phone || null,
        location: formData.location || null,
        rates: formData.rates ? parseInt(formData.rates) : null,
        photos: formData.photos.length > 0 ? formData.photos : null
      }

      const { error } = await supabase
        .from('trivia_host_profiles')
        .update(updateData)
        .eq('id', profile.id)

      if (error) throw error

      alert('Profile updated successfully!')
      // navigate back to dashboard
      window.location.href = '/dashboard'
    } catch (err) {
      console.error('Error updating trivia host profile:', err)
      alert('Failed to update profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const uploadFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return []
    setUploading(true)
    const supabase = createClient()
    const urls: string[] = []
    for (const file of Array.from(files)) {
      const bucket = 'trivia_hosts'
      const key = `photos/${Date.now()}-${file.name}`
      const { data, error } = await supabase.storage.from(bucket).upload(key, file)
      if (error) {
        console.error('Upload error:', error)
        alert(`Upload failed: ${error.message}`)
        continue
      }
      const { data: urlData } = supabase.storage.from(bucket).getPublicUrl(data.path)
      urls.push(urlData.publicUrl)
    }
    setUploading(false)
    return urls
  }

  const handleFileUpload = async (files: FileList | null) => {
    const newUrls = await uploadFiles(files)
    if (newUrls.length > 0) {
      setFormData(prev => ({ ...prev, photos: [...prev.photos, ...newUrls] }))
    }
  }

  const removeFile = (url: string) => {
    setFormData(prev => ({ ...prev, photos: prev.photos.filter(u => u !== url) }))
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto space-y-8">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-austin-charcoal mb-4">Trivia Host Profile</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Host Name *</label>
            <Input value={formData.hostName} onChange={(e) => setFormData({ ...formData, hostName: e.target.value })} required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <Input value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <Textarea rows={4} value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
            <Input value={formData.specialization} onChange={(e) => setFormData({ ...formData, specialization: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
            <Input value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <Input value={formData.website} onChange={(e) => setFormData({ ...formData, website: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Rates</label>
          <Input value={formData.rates} onChange={(e) => setFormData({ ...formData, rates: e.target.value })} />
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6 mt-4">
          <h3 className="text-lg font-semibold text-austin-charcoal mb-4">Photos</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photos</label>
            <input type="file" multiple accept="image/*" onChange={(e) => handleFileUpload(e.target.files)} className="block w-full text-sm text-gray-500" disabled={uploading} />
          </div>

          {formData.photos.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {formData.photos.map((url, idx) => (
                <div key={idx} className="relative">
                  <img src={url} alt={`Photo ${idx + 1}`} className="w-full h-28 object-cover rounded-lg" />
                  <button type="button" onClick={() => removeFile(url)} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <a href="/dashboard">
          <Button variant="outline" type="button">Cancel</Button>
        </a>
        <Button variant="austin" type="submit" disabled={isSubmitting} className="flex items-center space-x-2">
          <Save className="w-4 h-4" />
          <span>{isSubmitting ? 'Saving...' : 'Save Changes'}</span>
        </Button>
      </div>
    </form>
  )
}
