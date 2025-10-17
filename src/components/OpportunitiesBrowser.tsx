'use client'

import { useState, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar, MapPin, Users, Music, Clock, DollarSign, Zap, Car, Volume2 } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface VenueSlot {
  id: string
  eventDate: string
  startTime: string | null
  endTime: string | null
  eventTitle: string | null
  description: string | null
  genrePrefs: string[] | null
  talentTypes?: string[] | null
  status: string
  venue_profiles: {
    id: string
    venueName: string
    address: string | null
    city: string | null
    state: string | null
    capacity: number | null
    genrePrefs: string[] | null
    hasSound: boolean
    hasLighting: boolean
    hasParking: boolean
    photos: string[] | null
  }
}

interface OpportunitiesBrowserProps {
  initialSlots: VenueSlot[]
  userRole: string
}

const GENRES = [
  'All Genres', 'Rock', 'Country', 'Blues', 'Jazz', 'Folk', 'Pop', 
  'Indie', 'Alternative', 'Punk', 'Metal', 'Electronic', 
  'Hip-Hop', 'R&B', 'Soul', 'Funk', 'Reggae'
]

export default function OpportunitiesBrowser({ initialSlots, userRole }: OpportunitiesBrowserProps) {
  const [slots, setSlots] = useState<VenueSlot[]>(initialSlots)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All Genres')
  const [selectedCity, setSelectedCity] = useState('All Cities')
  const [dateFilter, setDateFilter] = useState('')
  const [showApplicationModal, setShowApplicationModal] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<VenueSlot | null>(null)
  const [applicationMessage, setApplicationMessage] = useState('')
  const [proposedFee, setProposedFee] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Get unique cities for filter
  const cities = useMemo(() => {
    const uniqueCities = new Set(
      slots.map(slot => slot.venue_profiles.city).filter(Boolean) as string[]
    )
    return ['All Cities', ...Array.from(uniqueCities)]
  }, [slots])

  // Filter slots based on search and filters
  const filteredSlots = useMemo(() => {
    return slots.filter(slot => {
      const matchesSearch = searchTerm === '' || 
        (slot.venue_profiles?.venueName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        slot.eventTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slot.description?.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesGenre = selectedGenre === 'All Genres' || 
        slot.venue_profiles.genrePrefs?.includes(selectedGenre) ||
        slot.genrePrefs?.includes(selectedGenre)

      const matchesCity = selectedCity === 'All Cities' || 
        slot.venue_profiles.city === selectedCity

      const matchesDate = dateFilter === '' || 
        slot.eventDate === dateFilter

      return matchesSearch && matchesGenre && matchesCity && matchesDate
    })
  }, [slots, searchTerm, selectedGenre, selectedCity, dateFilter])

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

  const getButtonLabel = (role: string) => {
    switch (role) {
      case 'TRIVIA_HOST':
        return 'Apply to Host'
      case 'DJ':
        return 'Apply for Gig'
      case 'PHOTOGRAPHER':
        return 'Apply for Event'
      case 'OTHER_CREATIVE':
        return 'Apply for Opportunity'
      default:
        return 'Apply'
    }
  }

  const getProfileFieldName = (role: string) => {
    switch (role) {
      case 'TRIVIA_HOST':
        return 'trivia_host_profiles'
      case 'DJ':
        return 'dj_profiles'
      case 'PHOTOGRAPHER':
        return 'photographer_profiles'
      case 'OTHER_CREATIVE':
        return 'other_creative_profiles'
      default:
        return null
    }
  }

  const handleApplyToOpportunity = (slot: VenueSlot) => {
    setSelectedSlot(slot)
    setShowApplicationModal(true)
  }

  const submitApplication = async () => {
    if (!selectedSlot) return

    setIsSubmitting(true)
    const supabase = createClient()

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('Not authenticated')

      // Try to find the DB user by supabaseId first. If that fails (some setups
      // don't have supabaseId populated), fall back to email lookup.
      let dbUser: any = null
      let userLookupErr: any = null

      const firstLookup = await supabase
        .from('users')
        .select('id, email, supabaseId')
        .eq('supabaseId', user.id)
        .maybeSingle()

      if (firstLookup.error) {
        // Keep the error for debugging, but try email fallback
        userLookupErr = firstLookup.error
      }
      dbUser = firstLookup.data ?? null

      if (!dbUser) {
        const emailLookup = await supabase
          .from('users')
          .select('id, email, supabaseId')
          .eq('email', user.email)
          .maybeSingle()

        if (emailLookup.error) {
          // If both lookups fail, throw with the collected messages
          throw new Error(`User lookup failed: ${userLookupErr?.message ?? emailLookup.error.message}`)
        }

        dbUser = emailLookup.data ?? null
      }

      if (!dbUser) throw new Error('User not found')

      // Get the appropriate profile based on role
      const profileTable = getProfileFieldName(userRole)
      if (!profileTable) throw new Error('Invalid user role')

      const { data: userProfile } = await supabase
        .from(profileTable)
        .select('id')
        .eq('userId', dbUser.id)
        .single()

      if (!userProfile) throw new Error(`${userRole} profile not found`)

      // Determine the profile ID field name based on role
      const profileIdField = userRole === 'TRIVIA_HOST' ? 'triviaHostProfileId' :
                             userRole === 'DJ' ? 'djProfileId' :
                             userRole === 'PHOTOGRAPHER' ? 'photographerProfileId' :
                             userRole === 'OTHER_CREATIVE' ? 'otherCreativeProfileId' :
                             null

      if (!profileIdField) throw new Error('Invalid profile ID field')

      // Submit application
      const applicationData: any = {
        [profileIdField]: userProfile.id,
        venueSlotId: selectedSlot.id,
        message: applicationMessage,
        status: 'PENDING'
      }

      // Only add proposed fee if provided
      if (proposedFee) {
        applicationData.proposedFee = parseInt(proposedFee) * 100 // Convert to cents
      }

      const { error } = await supabase
        .from('applications')
        .insert(applicationData)

      if (error) throw error

      alert('Application submitted successfully!')
      setShowApplicationModal(false)
      setApplicationMessage('')
      setProposedFee('')
      setSelectedSlot(null)

    } catch (error) {
      console.error('Error submitting application:', error)
      alert('Failed to submit application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getSearchPlaceholder = (role: string) => {
    switch (role) {
      case 'TRIVIA_HOST':
        return 'Search venues, event names...'
      case 'DJ':
        return 'Search venues, events, descriptions...'
      case 'PHOTOGRAPHER':
        return 'Search venues, events, descriptions...'
      case 'OTHER_CREATIVE':
        return 'Search venues, events, descriptions...'
      default:
        return 'Search venues, events...'
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-lg font-semibold text-austin-charcoal mb-4">
          Find Your Perfect Opportunity
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <Input
              placeholder={getSearchPlaceholder(userRole)}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Genre
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-austin-orange"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
            >
              {GENRES.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-austin-orange"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <Input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-austin-charcoal">
            {filteredSlots.length} Available Opportunities
          </h3>
        </div>

        {filteredSlots.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
            <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No opportunities found</h3>
            <p className="text-gray-600">
              Try adjusting your filters or check back later for new opportunities.
            </p>
          </div>
        ) : (
          filteredSlots.map((slot) => (
            <div key={slot.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-3">
                      <h3 className="text-xl font-semibold text-austin-charcoal">
                        {slot.venue_profiles.venueName}
                      </h3>
                      {slot.eventTitle && (
                        <span className="px-3 py-1 bg-austin-orange/10 text-austin-orange rounded-full text-sm font-medium">
                          {slot.eventTitle}
                        </span>
                      )}
                    </div>

                    {/* Talent type badges */}
                    {slot.talentTypes && slot.talentTypes.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {slot.talentTypes.map((tt) => (
                          <span
                            key={tt}
                            className="px-2 py-1 bg-gray-100 text-gray-800 rounded text-xs font-medium"
                          >
                            {tt === 'BAND' ? 'Band' : tt === 'TRIVIA_HOST' ? 'Trivia Host' : tt === 'DJ' ? 'DJ' : tt === 'PHOTOGRAPHER' ? 'Photographer' : 'Other'}
                          </span>
                        ))}
                      </div>
                    )}

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
                        <div className="flex items-center text-gray-600">
                          <MapPin className="w-4 h-4 mr-2" />
                          {[slot.venue_profiles.address, slot.venue_profiles.city, slot.venue_profiles.state].filter(Boolean).join(', ')}
                        </div>
                        {slot.venue_profiles.capacity && (
                          <div className="flex items-center text-gray-600">
                            <Users className="w-4 h-4 mr-2" />
                            Capacity: {slot.venue_profiles.capacity}
                          </div>
                        )}
                      </div>

                      <div className="space-y-2">
                        {(slot.genrePrefs || slot.venue_profiles.genrePrefs) && (
                          <div>
                            <span className="text-sm font-medium text-gray-700">Preferred Genres/Types:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {(slot.genrePrefs || slot.venue_profiles.genrePrefs || []).slice(0, 3).map((genre) => (
                                <span key={genre} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                                  {genre}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          {slot.venue_profiles.hasSound && (
                            <div className="flex items-center">
                              <Volume2 className="w-4 h-4 mr-1" />
                              Sound
                            </div>
                          )}
                          {slot.venue_profiles.hasLighting && (
                            <div className="flex items-center">
                              <Zap className="w-4 h-4 mr-1" />
                              Lighting
                            </div>
                          )}
                          {slot.venue_profiles.hasParking && (
                            <div className="flex items-center">
                              <Car className="w-4 h-4 mr-1" />
                              Parking
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {slot.description && (
                      <p className="text-gray-600 mb-4">{slot.description}</p>
                    )}
                  </div>

                  <div className="ml-6">
                    <Button
                      variant="austin"
                      onClick={() => handleApplyToOpportunity(slot)}
                      className="whitespace-nowrap"
                    >
                      {getButtonLabel(userRole)}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Application Modal */}
      {showApplicationModal && selectedSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-austin-charcoal mb-4">
              Apply at {selectedSlot.venue_profiles.venueName}
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message to Venue
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-austin-orange"
                  rows={4}
                  placeholder="Tell them about yourself, why you're interested, any special notes, etc..."
                  value={applicationMessage}
                  onChange={(e) => setApplicationMessage(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proposed Fee (optional)
                </label>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 text-gray-400 mr-2" />
                  <Input
                    type="number"
                    placeholder="500"
                    value={proposedFee}
                    onChange={(e) => setProposedFee(e.target.value)}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Leave blank to discuss pricing later
                </p>
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setShowApplicationModal(false)}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  variant="austin"
                  onClick={submitApplication}
                  className="flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
