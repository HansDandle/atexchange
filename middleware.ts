import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Skip auth check for public routes and static assets
  const publicPaths = ['/', '/login', '/signup', '/forgot-password', '/profiles', '/bands', '/venues', '/opportunities', '/gigs']
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname === path || 
    request.nextUrl.pathname.startsWith('/profiles/') ||
    request.nextUrl.pathname.startsWith('/bands/') ||
    request.nextUrl.pathname.startsWith('/venues/') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|ico|woff|woff2|ttf|eot)$/)
  )

  // Only check auth for protected routes
  const protectedPaths = ['/dashboard', '/onboarding', '/profile/edit', '/slots', '/messages', '/admin', '/suspended']
  const isProtectedPath = protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))

  if (isPublicPath && !isProtectedPath) {
    return response
  }

  // Check if user already has valid session in cookies (avoid auth call if possible)
  const hasAuthCookie = request.cookies.has('sb-jkylaqqajdjxpvrmuxfr-auth-token') || 
                        request.cookies.has('sb-auth-token')

  // If on login/signup page and no auth cookie, skip auth check
  if ((request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') && !hasAuthCookie) {
    return response
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  // Protect dashboard and other authenticated routes
  if (isProtectedPath) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Redirect authenticated users away from auth pages
  if ((request.nextUrl.pathname === '/login' || 
       request.nextUrl.pathname === '/signup') && user) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}