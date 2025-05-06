import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Mail, Phone, MapPin, Clock, User } from "lucide-react"
import Image from "next/image"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/images/Logo_horizontal_green.svg"
                alt="Hub Academy Logo"
                width={140}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/#courses" className="text-sm font-medium hover:text-[#a3ff3c] transition-colors">
              Courses
            </Link>
            <Link href="/#methodology" className="text-sm font-medium hover:text-[#a3ff3c] transition-colors">
              Methodology
            </Link>
            <Link href="/#testimonials" className="text-sm font-medium hover:text-[#a3ff3c] transition-colors">
              Testimonials
            </Link>
            <Link href="/#contact" className="text-sm font-medium hover:text-[#a3ff3c] transition-colors">
              Contact
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="https://lms.hubacademybr.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium hover:text-[#a3ff3c] transition-colors flex items-center gap-1"
            >
              <User size={14} />
              Login
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Link href="/" className="flex items-center text-[#a3ff3c] hover:text-[#92e636] mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Contact Us</h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl">
                  Have questions about our programs? Our team is here to help you find the right language course for
                  your career goals.
                </p>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 mt-12">
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                  <CardDescription>Fill out the form below and we'll get back to you within 24 hours.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="first-name" className="text-sm font-medium leading-none">
                          First name
                        </label>
                        <input
                          id="first-name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="last-name" className="text-sm font-medium leading-none">
                          Last name
                        </label>
                        <input
                          id="last-name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium leading-none">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium leading-none">
                        Phone (optional)
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="interest" className="text-sm font-medium leading-none">
                        I'm interested in
                      </label>
                      <select
                        id="interest"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select an option</option>
                        <option value="english">English Programs</option>
                        <option value="spanish">Spanish Programs</option>
                        <option value="corporate">Corporate Training</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium leading-none">
                        Message
                      </label>
                      <textarea
                        id="message"
                        className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Enter your message"
                      ></textarea>
                    </div>
                    <Button className="w-full bg-[#a3ff3c] hover:bg-[#92e636] text-[#161533]">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-[#a3ff3c] mt-0.5" />
                      <div>
                        <h3 className="font-medium">Email</h3>
                        <p className="text-gray-500">info@hubacademy.com</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-[#a3ff3c] mt-0.5" />
                      <div>
                        <h3 className="font-medium">Phone</h3>
                        <p className="text-gray-500">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-[#a3ff3c] mt-0.5" />
                      <div>
                        <h3 className="font-medium">Main Campus</h3>
                        <p className="text-gray-500">
                          123 Education Street
                          <br />
                          New York, NY 10001
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-[#a3ff3c] mt-0.5" />
                      <div>
                        <h3 className="font-medium">Office Hours</h3>
                        <p className="text-gray-500">
                          Monday - Friday: 8:00 AM - 8:00 PM
                          <br />
                          Saturday: 9:00 AM - 5:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Our Locations</h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">New York</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">
                          123 Education Street
                          <br />
                          New York, NY 10001
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Chicago</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">
                          456 Learning Avenue
                          <br />
                          Chicago, IL 60601
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Los Angeles</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">
                          789 Knowledge Blvd
                          <br />
                          Los Angeles, CA 90001
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Miami</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-500">
                          321 Language Drive
                          <br />
                          Miami, FL 33101
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Frequently Asked Questions</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl">
                  Find answers to common questions about our programs and methodology.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>How long are your language programs?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Our standard programs run for 12 weeks, with classes meeting 2-3 times per week. However, we offer
                    flexible scheduling options, including intensive programs and extended courses based on your
                    learning goals and availability.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Do you offer online classes?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Yes, we offer fully online, hybrid, and in-person options for all of our language programs. Our
                    virtual classrooms provide the same interactive, immersive experience as our physical locations.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>What level of language proficiency do I need to start?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    We offer programs for all proficiency levels, from complete beginners to advanced speakers. Before
                    starting, we conduct a free assessment to place you in the appropriate level and customize your
                    learning path.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Do you offer corporate training programs?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Yes, we specialize in customized corporate language training. We can develop programs specific to
                    your industry, company culture, and business objectives, delivered at your location or online.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Are your instructors native speakers?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Our teaching team includes both native speakers and highly proficient non-native instructors with
                    professional experience in various industries. All instructors are certified language teachers with
                    specialized training in professional language education.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Do you offer certification upon completion?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500">
                    Yes, all graduates receive a Hub Academy certificate of completion. We also offer preparation for
                    internationally recognized language proficiency exams such as TOEFL, IELTS, Cambridge English, and
                    DELE.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#a3ff3c] text-[#161533]">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-6">
              Ready to Start Your Language Journey?
            </h2>
            <p className="max-w-[700px] mx-auto text-[#161533]/80 md:text-xl mb-8">
              Book a free language assessment and consultation with our expert instructors.
            </p>
            <Button className="bg-white text-[#161533] hover:bg-[#161533] hover:text-[#a3ff3c] transition-colors">
              Book Free Assessment
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Image
                src="/images/Logo_horizontal_green.svg"
                alt="Hub Academy Logo"
                width={120}
                height={36}
                className="h-6 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-500">© {new Date().getFullYear()} Hub Academy. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-gray-500 hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
