import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import MessagingInterface from '@/components/MessagingInterface'

export default async function MessagesPage() {
  const supabase = createClient()
  
  const { data: { user }, error } = await supabase.auth.getUser()
  
  if (error || !user) {
    redirect('/login')
  }

  // Get current user info
  const { data: dbUser } = await supabase
    .from('users')
    .select('id, role, name')
    .eq('supabaseId', user.id)
    .single()

  if (!dbUser) {
    redirect('/dashboard')
  }

  // Get conversations (messages where user is sender or receiver)
  const { data: messages } = await supabase
    .from('messages')
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
    .or(`senderId.eq.${dbUser.id},receiverId.eq.${dbUser.id}`)
    .order('createdAt', { ascending: false })

  const normalizedMessages = (messages || []).map((m: any) => ({
    ...m,
    sender: Array.isArray(m.sender) ? m.sender[0] ?? null : m.sender ?? null,
    receiver: Array.isArray(m.receiver) ? m.receiver[0] ?? null : m.receiver ?? null
  }))

  // Get unique conversation partners
  const conversationPartners = new Map()
  
  if (normalizedMessages) {
    normalizedMessages.forEach((message: any) => {
      const partnerId = message.senderId === dbUser.id ? message.receiverId : message.senderId
      const partner = message.senderId === dbUser.id ? message.receiver : message.sender
      
      if (!conversationPartners.has(partnerId)) {
        conversationPartners.set(partnerId, {
          id: partnerId,
          name: partner.name,
          email: partner.email,
          lastMessage: message.content,
          lastMessageTime: message.createdAt,
          unreadCount: 0 // TODO: Implement unread counting
        })
      }
    })
  }

  // Get all users for potential messaging (bands and venues)
  const { data: allUsers } = await supabase
    .from('users')
    .select('id, name, email, role')
    .neq('id', dbUser.id)
    .order('name')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-austin-charcoal">
              Messages
            </h1>
            <div className="flex items-center space-x-4">
              <a href="/dashboard" className="text-sm text-gray-600 hover:text-austin-orange">
                Back to Dashboard
              </a>
              <span className="text-sm text-gray-600">
                {dbUser.name || user.email}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <MessagingInterface 
          currentUser={dbUser}
          conversations={Array.from(conversationPartners.values())}
          allMessages={normalizedMessages || []}
          allUsers={allUsers || []}
        />
      </main>
    </div>
  )
}