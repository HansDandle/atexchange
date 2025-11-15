'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Users, 
  Music, 
  Building2, 
  Calendar, 
  MessageSquare, 
  Trash2, 
  Edit, 
  Search,
  UserCheck,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface User {
  id: string
  email?: string | null
  name: string | null
  role: string
  createdAt: string
  supabaseId: string | null
}

interface BandProfile {
  id: string
  userId: string
  bandName: string
  bio: string | null
  genre: string[] | null
  location: string | null
  createdAt: string
  users: User
}

interface VenueProfile {
  id: string
  userId: string
  venueName: string
  description: string | null
  city: string | null
  state: string | null
  capacity: number | null
  createdAt: string
  users: User
}

interface Application {
  id: string
  status: string
  createdAt: string
  proposedFee: number | null
  band_profiles: {
    bandName: string
    users: {
      email: string
    }
  }
  venue_slots: {
    eventTitle: string | null
    eventDate: string
    venue_profiles: {
      venueName: string
      users: {
        email: string
      }
    }
  }
}

interface VenueSlot {
  id: string
  eventTitle: string | null
  eventDate: string
  status: string
  createdAt: string
  venue_profiles: {
    venueName: string
    users: {
      email: string
    }
  }
}

interface Message {
  id: string
  content: string
  createdAt: string
  sender: {
    email: string
    name: string | null
  }
  receiver: {
    email: string
    name: string | null
  }
}

interface AdminDashboardProps {
  allUsers: User[]
  bandProfiles: BandProfile[]
  venueProfiles: VenueProfile[]
  recentApplications: Application[]
  venueSlots: VenueSlot[]
  messages: Message[]
}

export default function AdminDashboard({
  allUsers,
  bandProfiles,
  venueProfiles,
  recentApplications,
  venueSlots,
  messages
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedVenues, setSelectedVenues] = useState<Set<string>>(new Set())

  const supabase = createClient()

  const tabs = [
    { id: 'overview', label: 'Overview', icon: UserCheck },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'bands', label: 'Bands', icon: Music },
    { id: 'venues', label: 'Venues', icon: Building2 },
    { id: 'slots', label: 'Venue Slots', icon: Calendar },
    { id: 'applications', label: 'Applications', icon: Clock },
    { id: 'messages', label: 'Messages', icon: MessageSquare }
  ]

  const handleDeleteUser = async (userId: string, supabaseId: string | null) => {
    if (!confirm('Are you sure you want to delete this user? This will delete their profile and all related data.')) {
      return
    }

    setLoading(true)
    try {
      // Get current user to check if we're deleting ourselves
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      const isDeletingSelf = currentUser?.id === supabaseId

      // Delete from users table (cascading will handle profiles)
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId)

      if (error) throw error

      // Also delete from Supabase auth if supabaseId exists
      if (supabaseId) {
        // Note: This would require admin API access
        console.log('User deleted from database. Supabase auth deletion requires admin API.')
      }

      alert('User deleted successfully')
      
      // If we deleted ourselves, sign out and redirect to login
      if (isDeletingSelf) {
        await supabase.auth.signOut()
        window.location.href = '/login'
      } else {
        window.location.reload()
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Error deleting user')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteVenueSlot = async (slotId: string) => {
    if (!confirm('Are you sure you want to delete this venue slot?')) {
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('venue_slots')
        .delete()
        .eq('id', slotId)

      if (error) throw error

      alert('Venue slot deleted successfully')
      window.location.reload()
    } catch (error) {
      console.error('Error deleting venue slot:', error)
      alert('Error deleting venue slot')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteVenue = async (venueId: string, userId: string, userRole: string) => {
    if (!confirm('Are you sure you want to delete this venue? If the owner is not an admin, their account will be suspended.')) {
      return
    }

    setLoading(true)
    try {
      // Delete the venue profile
      const { error: venueError } = await supabase
        .from('venue_profiles')
        .delete()
        .eq('id', venueId)

      if (venueError) throw venueError

      // If owner is not an admin, suspend their account
      if (userRole !== 'ADMIN') {
        const { error: suspendError } = await supabase
          .from('users')
          .update({
            suspended: true,
            suspension_reason: 'Venue deleted due to policy violation'
          })
          .eq('id', userId)

        if (suspendError) throw suspendError

        alert('Venue deleted and owner account suspended')
      } else {
        alert('Venue deleted successfully')
      }

      window.location.reload()
    } catch (error) {
      console.error('Error deleting venue:', error)
      alert('Error deleting venue')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteBand = async (bandId: string, userId: string, userRole: string) => {
    if (!confirm('Are you sure you want to delete this band profile? If the owner is not an admin, their account will be suspended.')) {
      return
    }

    setLoading(true)
    try {
      // Delete the band profile
      const { error: bandError } = await supabase
        .from('band_profiles')
        .delete()
        .eq('id', bandId)

      if (bandError) throw bandError

      // If owner is not an admin, suspend their account
      if (userRole !== 'ADMIN') {
        const { error: suspendError } = await supabase
          .from('users')
          .update({
            suspended: true,
            suspension_reason: 'Band profile deleted due to policy violation'
          })
          .eq('id', userId)

        if (suspendError) throw suspendError

        alert('Band profile deleted and owner account suspended')
      } else {
        alert('Band profile deleted successfully')
      }

      window.location.reload()
    } catch (error) {
      console.error('Error deleting band:', error)
      alert('Error deleting band')
    } finally {
      setLoading(false)
    }
  }

  const handleBulkDeleteVenues = async () => {
    if (selectedVenues.size === 0) {
      alert('Please select venues to delete')
      return
    }

    if (!confirm(`Are you sure you want to delete ${selectedVenues.size} venue(s)? Owners who are not admins will be suspended.`)) {
      return
    }

    setLoading(true)
    try {
      const venuesToDelete = Array.from(selectedVenues)
      let deletedCount = 0
      let suspendedCount = 0
      const errors: string[] = []

      for (const venueId of venuesToDelete) {
        try {
          const venue = venueProfiles.find(v => v.id === venueId)
          if (!venue) {
            errors.push(`Venue ${venueId} not found`)
            continue
          }

          // Delete the venue
          const { error: venueError } = await supabase
            .from('venue_profiles')
            .delete()
            .eq('id', venueId)

          if (venueError) {
            errors.push(`Failed to delete venue ${venue.venueName}: ${venueError.message}`)
            continue
          }
          deletedCount++

          // If owner is not an admin, suspend them
          if (venue.users?.role !== 'ADMIN') {
            const { error: suspendError } = await supabase
              .from('users')
              .update({
                suspended: true,
                suspension_reason: 'Venue deleted due to policy violation'
              })
              .eq('id', venue.userId)

            if (suspendError) {
              errors.push(`Failed to suspend user for ${venue.venueName}: ${suspendError.message}`)
              continue
            }
            suspendedCount++
          }
        } catch (itemError) {
          console.error(`Error processing venue ${venueId}:`, itemError)
          errors.push(`Error processing venue: ${String(itemError)}`)
        }
      }

      if (errors.length > 0) {
        console.error('Bulk delete errors:', errors)
        alert(`Deleted ${deletedCount} venue(s). Suspended ${suspendedCount} user(s).\n\nErrors:\n${errors.join('\n')}`)
      } else {
        alert(`Deleted ${deletedCount} venue(s). Suspended ${suspendedCount} user(s).`)
      }
      
      setSelectedVenues(new Set())
      window.location.reload()
    } catch (error) {
      console.error('Error bulk deleting venues:', error)
      alert(`Error deleting venues: ${String(error)}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) {
      return
    }

    setLoading(true)
    try {
      const { error } = await supabase
        .from('messages')
        .delete()
        .eq('id', messageId)

      if (error) throw error

      alert('Message deleted successfully')
      window.location.reload()
    } catch (error) {
      console.error('Error deleting message:', error)
      alert('Error deleting message')
    } finally {
      setLoading(false)
    }
  }

  const filteredUsers = allUsers.filter(user =>
    (user.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredBands = bandProfiles.filter(band =>
    band.bandName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (band.users?.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredVenues = venueProfiles.filter(venue =>
    venue.venueName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (venue.users?.email || '').toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium"
    
    switch (status) {
      case 'PENDING':
        return `${baseClasses} bg-yellow-100 text-yellow-800`
      case 'ACCEPTED':
        return `${baseClasses} bg-green-100 text-green-800`
      case 'REJECTED':
        return `${baseClasses} bg-red-100 text-red-800`
      case 'AVAILABLE':
        return `${baseClasses} bg-blue-100 text-blue-800`
      case 'BOOKED':
        return `${baseClasses} bg-purple-100 text-purple-800`
      case 'CANCELLED':
        return `${baseClasses} bg-gray-100 text-gray-800`
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-austin-charcoal">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-sm">
                Manage users, profiles, and platform data
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/dashboard" className="text-sm text-gray-600 hover:text-austin-orange">
                Back to Dashboard
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <nav className="p-4">
            {tabs.map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium ${
                    activeTab === tab.id
                      ? 'bg-austin-orange text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-austin-charcoal">Platform Overview</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <Users className="w-8 h-8 text-austin-orange" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-gray-900">{allUsers.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <Music className="w-8 h-8 text-blue-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Bands</p>
                      <p className="text-2xl font-bold text-gray-900">{bandProfiles.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <Building2 className="w-8 h-8 text-green-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Venues</p>
                      <p className="text-2xl font-bold text-gray-900">{venueProfiles.length}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <Clock className="w-8 h-8 text-purple-600" />
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Applications</p>
                      <p className="text-2xl font-bold text-gray-900">{recentApplications.length}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="p-6 border-b">
                  <h3 className="text-lg font-medium text-gray-900">Recent Applications</h3>
                </div>
                <div className="divide-y">
                  {recentApplications.slice(0, 10).map(app => (
                    <div key={app.id} className="p-4 hover:bg-gray-50">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {app.band_profiles.bandName} → {app.venue_slots.venue_profiles.venueName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {app.venue_slots.eventTitle} on {new Date(app.venue_slots.eventDate).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={getStatusBadge(app.status)}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-austin-charcoal">Users</h2>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {user.name || 'No name'}
                            </p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={getStatusBadge(user.role)}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id, user.supabaseId)}
                            className="text-red-600 hover:text-red-900 hover:bg-red-50"
                            disabled={loading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'bands' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-austin-charcoal">Band Profiles</h2>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search bands..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBands.map(band => (
                  <div key={band.id} className="bg-white rounded-lg shadow-sm border p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">{band.bandName}</h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteBand(band.id, band.userId, band.users?.role || 'BAND')}
                        className="text-red-600 hover:text-red-900 hover:bg-red-50"
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Email:</strong> {band.users?.email ?? '—'}</p>
                      <p><strong>Location:</strong> {band.location || 'Not specified'}</p>
                      <p><strong>Genres:</strong> {band.genre?.join(', ') || 'Not specified'}</p>
                      <p><strong>Created:</strong> {new Date(band.createdAt).toLocaleDateString()}</p>
                    </div>
                    {band.bio && (
                      <p className="mt-3 text-sm text-gray-700 line-clamp-3">{band.bio}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'venues' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <h2 className="text-xl font-semibold text-austin-charcoal">Venue Profiles</h2>
                  {selectedVenues.size > 0 && (
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-600">
                        {selectedVenues.size} selected
                      </span>
                      <Button
                        variant="austin"
                        size="sm"
                        onClick={handleBulkDeleteVenues}
                        disabled={loading}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Delete Selected
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedVenues(new Set())}
                        disabled={loading}
                      >
                        Clear Selection
                      </Button>
                    </div>
                  )}
                </div>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search venues..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVenues.map(venue => (
                  <div
                    key={venue.id}
                    className={`bg-white rounded-lg shadow-sm border p-6 cursor-pointer transition ${
                      selectedVenues.has(venue.id) ? 'border-austin-orange bg-orange-50' : ''
                    }`}
                    onClick={() => {
                      const newSelected = new Set(selectedVenues)
                      if (newSelected.has(venue.id)) {
                        newSelected.delete(venue.id)
                      } else {
                        newSelected.add(venue.id)
                      }
                      setSelectedVenues(newSelected)
                    }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <input
                          type="checkbox"
                          checked={selectedVenues.has(venue.id)}
                          onChange={() => {
                            const newSelected = new Set(selectedVenues)
                            if (newSelected.has(venue.id)) {
                              newSelected.delete(venue.id)
                            } else {
                              newSelected.add(venue.id)
                            }
                            setSelectedVenues(newSelected)
                          }}
                          className="w-4 h-4 rounded cursor-pointer"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <h3 className="text-lg font-medium text-gray-900">{venue.venueName}</h3>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteVenue(venue.id, venue.userId, venue.users?.role || 'VENUE')
                        }}
                        className="text-red-600 hover:text-red-900 hover:bg-red-50"
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="space-y-2 text-sm text-gray-600">
                      <p><strong>Email:</strong> {venue.users?.email ?? '—'}</p>
                      <p><strong>Location:</strong> {venue.city && venue.state ? `${venue.city}, ${venue.state}` : 'Not specified'}</p>
                      <p><strong>Capacity:</strong> {venue.capacity || 'Not specified'}</p>
                      <p><strong>Created:</strong> {new Date(venue.createdAt).toLocaleDateString()}</p>
                    </div>
                    {venue.description && (
                      <p className="mt-3 text-sm text-gray-700 line-clamp-3">{venue.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'slots' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-austin-charcoal">Venue Slots</h2>
              </div>

              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Venue
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {venueSlots.map(slot => (
                      <tr key={slot.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <p className="text-sm font-medium text-gray-900">
                            {slot.eventTitle || 'No title'}
                          </p>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {slot.venue_profiles.venueName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {slot.venue_profiles?.users?.email ?? '—'}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(slot.eventDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={getStatusBadge(slot.status)}>
                            {slot.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteVenueSlot(slot.id)}
                            className="text-red-600 hover:text-red-900 hover:bg-red-50"
                            disabled={loading}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'applications' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-austin-charcoal">Recent Applications</h2>

              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Band
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Venue & Event
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentApplications.map(app => (
                      <tr key={app.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {app.band_profiles.bandName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {app.band_profiles?.users?.email ?? '—'}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {app.venue_slots.venue_profiles.venueName}
                            </p>
                            <p className="text-sm text-gray-500">
                              {app.venue_slots.eventTitle} • {new Date(app.venue_slots.eventDate).toLocaleDateString()}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {app.proposedFee ? `$${app.proposedFee}` : 'Not specified'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={getStatusBadge(app.status)}>
                            {app.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-austin-charcoal">Recent Messages</h2>

              <div className="space-y-4">
                {messages.map(message => (
                  <div key={message.id} className="bg-white rounded-lg shadow-sm border p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-sm font-medium text-gray-900">
                            {message.sender.name || message.sender.email}
                          </span>
                          <span className="text-gray-400">→</span>
                          <span className="text-sm font-medium text-gray-900">
                            {message.receiver.name || message.receiver.email}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(message.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{message.content}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteMessage(message.id)}
                        className="ml-4 text-red-600 hover:text-red-900 hover:bg-red-50"
                        disabled={loading}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}