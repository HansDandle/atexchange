'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Calendar, Clock, Plus, Edit, Trash2, Users, CheckCircle, XCircle, MessageSquare } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface VenueProfile {
  id: string
  venueName: string
  genrePrefs: string[] | null
}

interface VenueSlot {
  id: string
  eventDate: string
  startTime: string | null
  endTime: string | null
  eventTitle: string | null
  description: string | null
  genrePrefs: string[] | null
  status: string
  createdAt: string
}

interface Application {
  id: string
  status: string
  message: string | null
  proposedFee: number | null
  createdAt: string
  venueSlotId: string
  band_profiles: {
    id: string
    bandName: string
    genre: string[] | null
    location: string | null
    minFee: number | null
    maxFee: number | null
    photos: string[] | null
  }
}

interface SlotsManagerProps {
  venueProfile: VenueProfile
  initialSlots: VenueSlot[]
  initialApplications: Application[]
}

const GENRES = [
  'Rock', 'Country', 'Blues', 'Jazz', 'Folk', 'Pop', 
  'Indie', 'Alternative', 'Punk', 'Metal', 'Electronic', 
  'Hip-Hop', 'R&B', 'Soul', 'Funk', 'Reggae'
]

export default function SlotsManager({ venueProfile, initialSlots, initialApplications }: SlotsManagerProps) {
  const [slots, setSlots] = useState<VenueSlot[]>(initialSlots)
  const [applications, setApplications] = useState<Application[]>(initialApplications)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingSlot, setEditingSlot] = useState<VenueSlot | null>(null)
  const [viewingApplications, setViewingApplications] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    eventDate: '',
    startTime: '',
    endTime: '',
    eventTitle: '',
    description: '',
    genrePrefs: [] as string[]
  })

  const resetForm = () => {
    setFormData({
      eventDate: '',
      startTime: '',
      endTime: '',
      eventTitle: '',
      description: '',
      genrePrefs: []
    })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatTime = (timeString: string | null) => {
    if (!timeString) return 'Time TBD'
    return new Date(timeString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const handleCreateSlot = async () => {
    setIsSubmitting(true)
    const supabase = createClient()

    try {
      const startDateTime = formData.startTime ? 
        new Date(`${formData.eventDate}T${formData.startTime}`).toISOString() : null
      const endDateTime = formData.endTime ? 
        new Date(`${formData.eventDate}T${formData.endTime}`).toISOString() : null

      const { data, error } = await supabase
        .from('venue_slots')
        .insert({
          venueProfileId: venueProfile.id,
          eventDate: formData.eventDate,
          startTime: startDateTime,
          endTime: endDateTime,
          eventTitle: formData.eventTitle || null,
          description: formData.description || null,
          genrePrefs: formData.genrePrefs.length > 0 ? formData.genrePrefs : null,
          status: 'AVAILABLE'
        })
        .select()
        .single()

      if (error) throw error

      setSlots([...slots, data])
      setShowCreateModal(false)
      resetForm()
      alert('Slot created successfully!')

    } catch (error) {
      console.error('Error creating slot:', error)
      alert('Failed to create slot. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleUpdateSlot = async () => {
    if (!editingSlot) return
    
    setIsSubmitting(true)
    const supabase = createClient()

    try {
      const startDateTime = formData.startTime ? 
        new Date(`${formData.eventDate}T${formData.startTime}`).toISOString() : null
      const endDateTime = formData.endTime ? 
        new Date(`${formData.eventDate}T${formData.endTime}`).toISOString() : null

      const { error } = await supabase
        .from('venue_slots')
        .update({
          eventDate: formData.eventDate,
          startTime: startDateTime,
          endTime: endDateTime,
          eventTitle: formData.eventTitle || null,
          description: formData.description || null,
          genrePrefs: formData.genrePrefs.length > 0 ? formData.genrePrefs : null
        })
        .eq('id', editingSlot.id)

      if (error) throw error

      // Update local state
      setSlots(slots.map(slot => 
        slot.id === editingSlot.id 
          ? { 
              ...slot, 
              eventDate: formData.eventDate,
              startTime: startDateTime,
              endTime: endDateTime,
              eventTitle: formData.eventTitle || null,
              description: formData.description || null,
              genrePrefs: formData.genrePrefs.length > 0 ? formData.genrePrefs : null
            }
          : slot
      ))
      
      setEditingSlot(null)
      resetForm()
      alert('Slot updated successfully!')

    } catch (error) {
      console.error('Error updating slot:', error)
      alert('Failed to update slot. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteSlot = async (slotId: string) => {
    if (!confirm('Are you sure you want to delete this slot?')) return

    const supabase = createClient()

    try {
      const { error } = await supabase
        .from('venue_slots')
        .delete()
        .eq('id', slotId)

      if (error) throw error

      setSlots(slots.filter(slot => slot.id !== slotId))
      alert('Slot deleted successfully!')

    } catch (error) {
      console.error('Error deleting slot:', error)
      alert('Failed to delete slot. Please try again.')
    }
  }

  const handleApplicationResponse = async (applicationId: string, status: 'ACCEPTED' | 'REJECTED') => {
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', applicationId)

      if (error) throw error

      // Update local state
      setApplications(applications.map(app => 
        app.id === applicationId ? { ...app, status } : app
      ))

      // If accepted, update slot status to BOOKED
      if (status === 'ACCEPTED') {
        const application = applications.find(app => app.id === applicationId)
        if (application) {
          await supabase
            .from('venue_slots')
            .update({ status: 'BOOKED' })
            .eq('id', application.venueSlotId)

          setSlots(slots.map(slot => 
            slot.id === application.venueSlotId ? { ...slot, status: 'BOOKED' } : slot
          ))
        }
      }

      alert(`Application ${status.toLowerCase()} successfully!`)

    } catch (error) {
      console.error('Error updating application:', error)
      alert('Failed to update application. Please try again.')
    }
  }

  const startEditing = (slot: VenueSlot) => {
    setEditingSlot(slot)
    setFormData({
      eventDate: slot.eventDate,
      startTime: slot.startTime ? new Date(slot.startTime).toTimeString().slice(0, 5) : '',
      endTime: slot.endTime ? new Date(slot.endTime).toTimeString().slice(0, 5) : '',
      eventTitle: slot.eventTitle || '',
      description: slot.description || '',
      genrePrefs: slot.genrePrefs || []
    })
  }

  const getSlotApplications = (slotId: string) => {
    return applications.filter(app => app.venueSlotId === slotId)
  }

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-austin-charcoal">
          Your Venue Slots ({slots.length})
        </h2>
        <Button
          variant="austin"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Slot</span>
        </Button>
      </div>

      {/* Slots List */}
      <div className="space-y-4">
        {slots.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No slots created yet</h3>
            <p className="text-gray-600 mb-4">
              Create your first venue slot to start receiving applications from bands.
            </p>
            <Button variant="austin" onClick={() => setShowCreateModal(true)}>
              Create Your First Slot
            </Button>
          </div>
        ) : (
          slots.map((slot) => {
            const slotApplications = getSlotApplications(slot.id)
            const pendingCount = slotApplications.filter(app => app.status === 'PENDING').length
            
            return (
              <div key={slot.id} className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-xl font-semibold text-austin-charcoal">
                        {slot.eventTitle || 'Untitled Event'}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        slot.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' :
                        slot.status === 'BOOKED' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {slot.status}
                      </span>
                      {pendingCount > 0 && (
                        <span className="px-2 py-1 bg-austin-orange/10 text-austin-orange rounded-full text-xs">
                          {pendingCount} pending application{pendingCount !== 1 ? 's' : ''}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatDate(slot.eventDate)}
                        </div>
                        <div className="flex items-center text-gray-600">
                          <Clock className="w-4 h-4 mr-2" />
                          {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                        </div>
                      </div>

                      <div className="space-y-2">
                        {slot.genrePrefs && slot.genrePrefs.length > 0 && (
                          <div>
                            <span className="text-sm font-medium text-gray-700">Preferred Genres:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {slot.genrePrefs.slice(0, 3).map((genre) => (
                                <span key={genre} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                  {genre}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {slot.description && (
                      <p className="text-gray-600 mb-4">{slot.description}</p>
                    )}
                  </div>

                  <div className="flex items-center space-x-2 ml-6">
                    {slotApplications.length > 0 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setViewingApplications(
                          viewingApplications === slot.id ? null : slot.id
                        )}
                        className="flex items-center space-x-1"
                      >
                        <Users className="w-4 h-4" />
                        <span>Applications ({slotApplications.length})</span>
                      </Button>
                    )}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => startEditing(slot)}
                      className="flex items-center space-x-1"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteSlot(slot.id)}
                      className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Applications for this slot */}
                {viewingApplications === slot.id && slotApplications.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h4 className="text-lg font-medium text-austin-charcoal mb-4">
                      Applications for this slot:
                    </h4>
                    <div className="space-y-4">
                      {slotApplications.map((application) => (
                        <div key={application.id} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <h5 className="font-semibold text-austin-charcoal">
                                  {application.band_profiles.bandName}
                                </h5>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  application.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800' :
                                  application.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {application.status}
                                </span>
                              </div>
                              
                              <div className="text-sm text-gray-600 mb-2">
                                <div>Location: {application.band_profiles.location || 'Not specified'}</div>
                                <div>Genres: {application.band_profiles.genre?.join(', ') || 'Not specified'}</div>
                                {application.proposedFee && (
                                  <div>Proposed Fee: ${application.proposedFee / 100}</div>
                                )}
                              </div>

                              {application.message && (
                                <div className="bg-gray-50 p-3 rounded text-sm">
                                  <MessageSquare className="w-4 h-4 inline mr-1" />
                                  {application.message}
                                </div>
                              )}
                            </div>

                            {application.status === 'PENDING' && (
                              <div className="flex space-x-2 ml-4">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleApplicationResponse(application.id, 'ACCEPTED')}
                                  className="text-green-600 hover:text-green-700 flex items-center space-x-1"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                  <span>Accept</span>
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleApplicationResponse(application.id, 'REJECTED')}
                                  className="text-red-600 hover:text-red-700 flex items-center space-x-1"
                                >
                                  <XCircle className="w-4 h-4" />
                                  <span>Reject</span>
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>

      {/* Create/Edit Modal */}
      {(showCreateModal || editingSlot) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-austin-charcoal mb-6">
              {editingSlot ? 'Edit Venue Slot' : 'Create New Venue Slot'}
            </h3>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Event Date *
                  </label>
                  <Input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Time
                  </label>
                  <Input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Time
                  </label>
                  <Input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Title
                </label>
                <Input
                  placeholder="e.g., Friday Night Live, Local Artist Spotlight"
                  value={formData.eventTitle}
                  onChange={(e) => setFormData({ ...formData, eventTitle: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <Textarea
                  placeholder="Tell bands what you're looking for..."
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferred Genres
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                  {GENRES.map((genre) => (
                    <label key={genre} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.genrePrefs.includes(genre)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ 
                              ...formData, 
                              genrePrefs: [...formData.genrePrefs, genre] 
                            })
                          } else {
                            setFormData({ 
                              ...formData, 
                              genrePrefs: formData.genrePrefs.filter(g => g !== genre) 
                            })
                          }
                        }}
                        className="rounded"
                      />
                      <span className="text-sm">{genre}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowCreateModal(false)
                  setEditingSlot(null)
                  resetForm()
                }}
                className="flex-1"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="austin"
                onClick={editingSlot ? handleUpdateSlot : handleCreateSlot}
                className="flex-1"
                disabled={isSubmitting || !formData.eventDate}
              >
                {isSubmitting ? 'Saving...' : (editingSlot ? 'Update Slot' : 'Create Slot')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}