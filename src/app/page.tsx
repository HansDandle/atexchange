import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'

// Inline SVG icons (replaced lucide-react)
function IconMusic(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
      <path d="M9 17a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
      <path d="M9 14V5l10-2v9" />
    </svg>
  )
}

function IconUsers(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
      <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IconCalendar(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  )
}

function IconMapPin(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
      <path d="M21 10c0 7-9 12-9 12S3 17 3 10a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="2" />
    </svg>
  )
}

function IconArrowRight(props: any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true" {...props}>
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-austin-light via-white to-austin-warm gradient-animation">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-austin-orange/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <Image src="/atxlogo.png" alt="Austin Talent Exchange" width={40} height={40} className="h-10 w-10" />
              <h1 className="text-xl font-bold text-austin-charcoal">
                Austin Talent Exchange
              </h1>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-austin-charcoal hover:bg-austin-orange/10">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="austin" size="sm" className="shadow-lg hover:shadow-xl transition-shadow">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Image */}
      <section className="relative overflow-hidden bg-austin-charcoal">
        <div className="relative h-screen md:h-[32rem] lg:h-[40rem] w-full">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/atxhero3.jpg)',
              opacity: 0.3
            }}
          />
          
          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-austin-charcoal/70 via-austin-charcoal/50 to-austin-charcoal/80" />
          
          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <div className="max-w-4xl mx-auto text-center text-white w-full">
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-austin-orange/20 border border-austin-orange/40 text-austin-orange text-sm font-medium mb-8">
                <IconMapPin className="w-4 h-4 mr-2" />
                Austin — Beta Launch
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                Connect with local venues and musicians in Austin
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-12 leading-relaxed max-w-3xl mx-auto">
                A simple platform for bands and venues to discover each other, manage availability, and book shows.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
                <Link href="/signup?role=band">
                  <Button variant="austin" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all">
                    <IconMusic className="w-5 h-5 mr-2" />
                    I&apos;m a Band
                    <IconArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link href="/signup?role=venue">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-6 border-austin-orange text-austin-orange hover:bg-austin-orange hover:text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all">
                    <IconUsers className="w-5 h-5 mr-2" />
                    I&apos;m a Venue
                    <IconArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </div>
              
              {/* Prominent browse CTAs for anonymous users */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white">
                <Link href="/bands" className="text-base sm:text-lg font-medium hover:text-austin-orange transition-colors">
                  Browse Bands
                </Link>
                <Link href="/venues" className="text-base sm:text-lg font-medium hover:text-austin-orange transition-colors">
                  Browse Venues
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-austin-charcoal mb-4 sm:mb-6">
                Everything You Need to 
                <span className="text-austin-orange"> Rock Austin</span>
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Whether you&apos;re looking to book your next gig or find the perfect band, 
                we&apos;ve got you covered.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              <div className="group bg-white rounded-2xl p-6 sm:p-8 border border-austin-orange/20 hover:border-austin-orange/40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-br from-austin-orange to-austin-red rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform float-animation">
                  <IconMusic className="w-7 sm:w-8 h-7 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-austin-charcoal mb-4">For Bands</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                  Create your Electronic Press Kit (EPK), showcase your sound with integrated Spotify/YouTube, 
                  set your availability, and apply to gigs across Austin with just a few clicks.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• Professional EPK builder</li>
                  <li>• Integrated music streaming</li>
                  <li>• Smart calendar sync</li>
                  <li>• Direct venue messaging</li>
                </ul>
                <div className="mt-6">
                  <Link href="/bands">
                    <Button variant="outline" size="sm" className="text-austin-charcoal">Browse Bands</Button>
                  </Link>
                </div>
              </div>

              <div className="group bg-white rounded-2xl p-6 sm:p-8 border border-austin-orange/20 hover:border-austin-orange/40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-br from-austin-red to-austin-warm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform float-animation" style={{ animationDelay: '0.5s' }}>
                  <IconUsers className="w-7 sm:w-8 h-7 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-austin-charcoal mb-4">For Venues</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                  Post available time slots, review band applications with audio previews, 
                  and book the perfect act for your space. Streamline your booking process.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• Easy calendar management</li>
                  <li>• Band discovery tools</li>
                  <li>• Application tracking</li>
                  <li>• Secure booking system</li>
                </ul>
                <div className="mt-6">
                  <Link href="/venues">
                    <Button variant="outline" size="sm" className="text-austin-charcoal">Browse Venues</Button>
                  </Link>
                </div>
              </div>

              <div className="group bg-white rounded-2xl p-6 sm:p-8 border border-austin-orange/20 hover:border-austin-orange/40 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 md:col-span-2 lg:col-span-1">
                <div className="w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-br from-austin-warm to-austin-orange rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform float-animation" style={{ animationDelay: '1s' }}>
                  <IconCalendar className="w-7 sm:w-8 h-7 sm:h-8 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl font-semibold text-austin-charcoal mb-4">Easy Booking</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                  Streamlined communication, transparent pricing, instant notifications, 
                  and secure booking confirmation. Get booked in minutes, not weeks.
                </p>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• Real-time messaging</li>
                  <li>• Transparent pricing</li>
                  <li>• Instant notifications</li>
                  <li>• Contract management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials removed for beta launch */}

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-austin-charcoal to-austin-red rounded-3xl p-12 md:p-16 text-center text-white shadow-2xl">
              <h3 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Join Austin&apos;s Music Community?
              </h3>
              <p className="text-xl mb-10 text-gray-200 leading-relaxed">
                Get started in less than 3 minutes and start connecting with the local scene. 
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/signup">
                  <Button 
                    variant="austin" 
                    size="lg" 
                    className="w-full sm:w-auto text-lg px-8 py-6 bg-austin-orange hover:bg-austin-warm shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                  >
                    Create Your Profile
                    <IconArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <div data-tooltip="Coming Soon" className="relative">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full sm:w-auto text-lg px-8 py-6 border-white text-black hover:bg-white hover:text-austin-charcoal opacity-75 cursor-not-allowed"
                    disabled
                  >
                    Watch Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-austin-charcoal text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-austin-orange rounded-lg flex items-center justify-center">
                  <IconMusic className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold">Austin Talent Exchange</h3>
              </div>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Connecting Austin&apos;s music community one gig at a time. 
                Built by musicians, for musicians.
              </p>
              <div className="text-sm text-gray-400">
                &copy; 2025 Austin Talent Exchange. All rights reserved.
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Musicians</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="/profile/edit" className="hover:text-austin-orange transition-colors">Create EPK</a></li>
                <li><a href="/gigs" className="hover:text-austin-orange transition-colors">Find Gigs</a></li>
                <li><a href="/bands" className="hover:text-austin-orange transition-colors">Browse Bands</a></li>
                <li><a href="/onboarding" className="hover:text-austin-orange transition-colors">Get Started</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">For Venues</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li><a href="/profile/edit" className="hover:text-austin-orange transition-colors">List Your Venue</a></li>
                <li><a href="/bands" className="hover:text-austin-orange transition-colors">Find Bands</a></li>
                <li><a href="/slots" className="hover:text-austin-orange transition-colors">Venue Tools</a></li>
                <li><a href="/about" className="hover:text-austin-orange transition-colors">Help & Pricing</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}