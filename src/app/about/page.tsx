import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Header from '@/components/Header'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Hero Section */}
          <section className="text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-austin-charcoal">
              About Austin Talent Exchange
            </h1>
            <p className="text-xl text-gray-600">
              Connecting Austin's vibrant music community, one gig at a time.
            </p>
          </section>

          {/* Mission Section */}
          <section className="bg-white rounded-lg shadow-md p-8 space-y-4">
            <h2 className="text-3xl font-bold text-austin-charcoal mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Austin Talent Exchange was built by musicians, for musicians. We believe that Austin's music scene thrives when bands and venues can easily connect and collaborate. Our platform simplifies the process of booking gigs, discovering talent, and building relationships within the local music community.
            </p>
          </section>

          {/* Features Overview */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-austin-charcoal text-center">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <div className="relative h-40 w-full">
                  <Image 
                    src="/atxlogo.png" 
                    alt="For Bands"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-2xl font-bold text-austin-charcoal">For Musicians</h3>
                <p className="text-gray-600">
                  Create your professional profile, showcase your talent with integrated music streaming, manage your availability, and apply to gigs that match your style. Direct messaging with venues makes booking seamless.
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
                <div className="relative h-40 w-full">
                  <Image 
                    src="/og-image.jpg" 
                    alt="For Venues"
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <h3 className="text-2xl font-bold text-austin-charcoal">For Venues</h3>
                <p className="text-gray-600">
                  Post your available time slots, discover talented performers, review applications with audio previews, and streamline your booking process. Manage your entire calendar in one place.
                </p>
              </div>
            </div>
          </section>

          {/* Beta Launch */}
          <section className="bg-gradient-to-r from-austin-orange to-austin-warm rounded-lg shadow-lg p-8 text-white space-y-4">
            <h2 className="text-3xl font-bold">🎉 Free During Beta Launch</h2>
            <p className="text-lg">
              We're in beta! Austin Talent Exchange is completely free to use during our launch phase. This is our way of giving back to the Austin music community and getting your feedback to make the platform even better.
            </p>
            <p className="text-lg">
              Start connecting today with no fees, no hidden charges, and no limitations. Help us build the future of Austin's music scene.
            </p>
          </section>

          {/* Hero Images */}
          <section className="space-y-6">
            <h2 className="text-3xl font-bold text-austin-charcoal text-center">The Austin Scene</h2>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-md">
              <Image 
                src="/atxhero2.jpg" 
                alt="Austin Music Scene"
                fill
                className="object-cover object-bottom"
              />
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center space-y-6 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-austin-charcoal">Ready to Get Started?</h2>
            <p className="text-gray-600 text-lg">
              Join the Austin Talent Exchange community today and connect with musicians and venues near you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup?role=band">
                <Button variant="austin" size="lg" className="w-full sm:w-auto">
                  Sign Up as a Musician
                </Button>
              </Link>
              <Link href="/signup?role=venue">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-austin-orange text-austin-orange hover:bg-austin-orange hover:text-white">
                  Sign Up as a Venue
                </Button>
              </Link>
            </div>
          </section>

          {/* Contact Section */}
          <section className="text-center space-y-4 pb-8">
            <h3 className="text-2xl font-bold text-austin-charcoal">Questions?</h3>
            <p className="text-gray-600">
              Email us at <a href="mailto:info@austintalentexchange.com" className="text-austin-orange font-medium hover:underline">info@austintalentexchange.com</a>
            </p>
          </section>
        </div>
      </main>
    </div>
  )
}
