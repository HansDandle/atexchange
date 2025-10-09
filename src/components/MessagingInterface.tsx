'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Send, Plus, Search, MessageCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'

interface User {
  id: string
  name: string | null
  email?: string | null
  role?: string
}

interface Message {
  id: string
  content: string
  createdAt: string
  senderId: string
  receiverId: string
  applicationId: string | null
  sender: User
  receiver: User
}

interface Conversation {
  id: string
  name: string | null
  email?: string | null
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
}

interface MessagingInterfaceProps {
  currentUser: User
  conversations: Conversation[]
  allMessages: Message[]
  allUsers: User[]
}

export default function MessagingInterface({ 
  currentUser, 
  conversations: initialConversations,
  allMessages: initialMessages,
  allUsers 
}: MessagingInterfaceProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations)
  const [newMessage, setNewMessage] = useState('')
  const [showNewMessage, setShowNewMessage] = useState(false)
  const [selectedRecipient, setSelectedRecipient] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Filter conversations by search term
  const filteredConversations = conversations.filter(conv => 
    (conv.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (conv.email || '').toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Get messages for selected conversation
  const conversationMessages = selectedConversation 
    ? messages.filter(msg => 
        (msg.senderId === currentUser.id && msg.receiverId === selectedConversation) ||
        (msg.receiverId === currentUser.id && msg.senderId === selectedConversation)
      ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
    : []

  // Get selected conversation details
  const selectedConversationDetails = conversations.find(conv => conv.id === selectedConversation)

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return

    setIsLoading(true)
    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          senderId: currentUser.id,
          receiverId: selectedConversation,
          content: newMessage.trim(),
          applicationId: null
        })
        .select(`
          id,
          content,
          createdAt,
          senderId,
          receiverId,
          applicationId,
          sender:users!messages_senderId_fkey(id, name, email),
          receiver:users!messages_receiverId_fkey(id, name, email)
        `)
        .single()

      if (error) throw error

      // Supabase can return relation fields as arrays; normalize to single objects
      const normalized = {
        ...data,
        sender: Array.isArray((data as any).sender) ? (data as any).sender[0] : (data as any).sender,
        receiver: Array.isArray((data as any).receiver) ? (data as any).receiver[0] : (data as any).receiver,
      }

      // Add new message to state
      setMessages(prev => [...prev, normalized as Message])
      setNewMessage('')

      // Update conversation's last message
      setConversations(prev => prev.map(conv => 
        conv.id === selectedConversation 
          ? { ...conv, lastMessage: newMessage.trim(), lastMessageTime: data.createdAt }
          : conv
      ))

    } catch (error) {
      console.error('Error sending message:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const startNewConversation = async () => {
    if (!selectedRecipient || !newMessage.trim()) return

    setIsLoading(true)
    const supabase = createClient()

    try {
      const { data, error } = await supabase
        .from('messages')
        .insert({
          senderId: currentUser.id,
          receiverId: selectedRecipient,
          content: newMessage.trim(),
          applicationId: null
        })
        .select(`
          id,
          content,
          createdAt,
          senderId,
          receiverId,
          applicationId,
          sender:users!messages_senderId_fkey(id, name, email),
          receiver:users!messages_receiverId_fkey(id, name, email)
        `)
        .single()

      if (error) throw error

      // Normalize sender/receiver arrays to single objects
      const normalizedNew = {
        ...data,
        sender: Array.isArray((data as any).sender) ? (data as any).sender[0] : (data as any).sender,
        receiver: Array.isArray((data as any).receiver) ? (data as any).receiver[0] : (data as any).receiver,
      }

      // Add new message to state
      setMessages(prev => [...prev, normalizedNew as Message])

      // Add new conversation
      const recipient = allUsers.find(user => user.id === selectedRecipient)
      if (recipient) {
        const newConversation = {
          id: selectedRecipient,
          name: recipient.name,
          email: recipient.email,
          lastMessage: newMessage.trim(),
          lastMessageTime: data.createdAt,
          unreadCount: 0
        }
        setConversations(prev => [newConversation, ...prev])
        setSelectedConversation(selectedRecipient)
      }

      setNewMessage('')
      setSelectedRecipient('')
      setShowNewMessage(false)

    } catch (error) {
      console.error('Error starting conversation:', error)
      alert('Failed to start conversation. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      })
    } else if (diffInHours < 168) { // 1 week
      return date.toLocaleDateString('en-US', { weekday: 'short' })
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      })
    }
  }

  return (
    <div className="flex h-[600px] bg-white rounded-lg shadow-sm border overflow-hidden">
      {/* Conversations Sidebar */}
      <div className="w-1/3 border-r border-gray-200 flex flex-col">
        {/* Search and New Message */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="austin"
              size="sm"
              onClick={() => setShowNewMessage(true)}
              className="flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>New</span>
            </Button>
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
              <p className="text-sm">No conversations yet</p>
              <p className="text-xs">Start a new conversation to connect with bands or venues</p>
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <div
                key={conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
                className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                  selectedConversation === conversation.id ? 'bg-austin-orange/10 border-austin-orange' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-austin-charcoal truncate">
                        {conversation.name || conversation.email}
                      </h4>
                      {conversation.unreadCount > 0 && (
                        <span className="bg-austin-orange text-white text-xs rounded-full px-2 py-0.5">
                          {conversation.unreadCount}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {conversation.lastMessage}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 ml-2">
                    {formatTime(conversation.lastMessageTime)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Conversation Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h3 className="font-semibold text-austin-charcoal">
                {selectedConversationDetails?.name || selectedConversationDetails?.email}
              </h3>
              <p className="text-sm text-gray-600">
                {selectedConversationDetails?.email}
              </p>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {conversationMessages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p>No messages yet. Start the conversation!</p>
                </div>
              ) : (
                conversationMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === currentUser.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.senderId === currentUser.id
                          ? 'bg-austin-orange text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.senderId === currentUser.id ? 'text-austin-orange/70' : 'text-gray-500'
                      }`}>
                        {formatTime(message.createdAt)}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                  className="flex-1"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || isLoading}
                  variant="austin"
                  className="flex items-center space-x-1"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p className="text-sm">Choose a conversation from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* New Message Modal */}
      {showNewMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-austin-charcoal mb-4">
              Start New Conversation
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Send to
                </label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-austin-orange"
                  value={selectedRecipient}
                  onChange={(e) => setSelectedRecipient(e.target.value)}
                >
                  <option value="">Select a user...</option>
                  {allUsers.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name || user.email} ({user.role === 'BAND' ? 'Band' : 'Venue'})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <Textarea
                  placeholder="Type your message..."
                  rows={4}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowNewMessage(false)
                    setSelectedRecipient('')
                    setNewMessage('')
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="austin"
                  onClick={startNewConversation}
                  disabled={!selectedRecipient || !newMessage.trim() || isLoading}
                  className="flex-1"
                >
                  {isLoading ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}