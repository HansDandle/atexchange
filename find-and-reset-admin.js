import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jkylaqqajdjxpvrmuxfr.supabase.co'
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpreWxhcXFhamRqeHB2cm11eGZyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTk4Nzc2NSwiZXhwIjoyMDc1NTYzNzY1fQ.aM2r1QNk10jJMTOpmckbnbysp0AMKRCzT8ftslt6I44'

const supabase = createClient(supabaseUrl, serviceRoleKey)

// List all auth users to find the admin
const { data: authUsers, error } = await supabase.auth.admin.listUsers()

if (error) {
  console.error('Error listing users:', error)
  process.exit(1)
}

console.log('Auth users in system:')
authUsers.users.forEach(user => {
  console.log(`  - ${user.email} (ID: ${user.id})`)
})

// Find the admin user
const adminAuthUser = authUsers.users.find(u => u.email === 'danshandle+atxadmin@gmail.com')

if (!adminAuthUser) {
  console.error('❌ Admin user not found in auth.users')
  process.exit(1)
}

console.log(`\nFound admin auth user: ${adminAuthUser.id}`)
console.log('Resetting password...\n')

// Reset the password
const { data, error: resetError } = await supabase.auth.admin.updateUserById(
  adminAuthUser.id,
  { password: 'AdminPW321#' }
)

if (resetError) {
  console.error('❌ Error resetting password:', resetError)
  process.exit(1)
} else {
  console.log('✅ Admin password reset successfully!')
  console.log('Email:', data.user.email)
  console.log('Auth ID:', data.user.id)
  console.log('New password: AdminPW321#')
}
