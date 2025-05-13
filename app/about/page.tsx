import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Award, BookOpen, ArrowLeft, User } from "lucide-react"
import Image from "next/image"

export default function AboutPage() {
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

      {/* Rest of the page content remains the same */}
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Link href="/" className="flex items-center text-[#a3ff3c] hover:text-[#92e636] mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Hub Academy</h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl">
                  Our mission is to empower professionals through language education tailored to career advancement.
                </p>
              </div>
            </div>

            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 mt-12">
              <div>
                <Image
                  src="/placeholder.svg?height=600&width=600"
                  width={600}
                  height={600}
                  alt="Hub Academy campus"
                  className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
                />
              </div>
              <div className="flex flex-col justify-center space-y-6">
                <div>
                  <h2 className="text-2xl font-bold">Our Story</h2>
                  <p className="mt-2 text-gray-500">
                    Hub Academy was founded in 2010 by a team of language educators and business professionals who
                    recognized a gap in traditional language education. While many schools taught conversational
                    language skills, few focused on the specific language needs of professionals in various industries.
                  </p>
                  <p className="mt-4 text-gray-500">
                    Starting with just two classrooms and a handful of students, we've grown to become a leading
                    provider of professional language education, serving thousands of students across multiple locations
                    and online platforms.
                  </p>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">Our Philosophy</h2>
                  <p className="mt-2 text-gray-500">
                    We believe that language learning should be directly applicable to your professional goals. That's
                    why our curriculum is designed around real-world scenarios you'll encounter in your industry, taught
                    by instructors with both language expertise and professional experience in your field.
                  </p>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-[#a3ff3c]" />
                    <span className="text-sm font-medium">Certified Instructors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-[#a3ff3c]" />
                    <span className="text-sm font-medium">5,000+ Graduates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-[#a3ff3c]" />
                    <span className="text-sm font-medium">Industry-Specific Programs</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-20">
              <h2 className="text-3xl font-bold text-center mb-12">Our Team</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 mb-4">
                    <Image
                      src="/placeholder.svg?height=128&width=128"
                      width={128}
                      height={128}
                      alt="Maria Rodriguez"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Maria Rodriguez</h3>
                  <p className="text-[#a3ff3c]">Founder & Director</p>
                  <p className="mt-2 text-gray-500 text-sm">
                    Former corporate language trainer with 20+ years of experience in business English education.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 mb-4">
                    <Image
                      src="/placeholder.svg?height=128&width=128"
                      width={128}
                      height={128}
                      alt="Carlos Mendez"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Carlos Mendez</h3>
                  <p className="text-rose-600">Academic Director</p>
                  <p className="mt-2 text-gray-500 text-sm">
                    PhD in Applied Linguistics with expertise in curriculum development for professional language
                    acquisition.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 mb-4">
                    <Image
                      src="/placeholder.svg?height=128&width=128"
                      width={128}
                      height={128}
                      alt="Sarah Johnson"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Sarah Johnson</h3>
                  <p className="text-rose-600">Head of English Programs</p>
                  <p className="mt-2 text-gray-500 text-sm">
                    Former business consultant with specialized expertise in technical and business English training.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 mb-4">
                    <Image
                      src="/placeholder.svg?height=128&width=128"
                      width={128}
                      height={128}
                      alt="Miguel Sanchez"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Miguel Sanchez</h3>
                  <p className="text-rose-600">Head of Spanish Programs</p>
                  <p className="mt-2 text-gray-500 text-sm">
                    Experienced educator specializing in Spanish for international business and technical fields.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 mb-4">
                    <Image
                      src="/placeholder.svg?height=128&width=128"
                      width={128}
                      height={128}
                      alt="Jennifer Lee"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">Jennifer Lee</h3>
                  <p className="text-rose-600">Corporate Partnerships Director</p>
                  <p className="mt-2 text-gray-500 text-sm">
                    Develops customized language training programs for our corporate clients across various industries.
                  </p>
                </div>
                <div className="flex flex-col items-center text-center">
                  <div className="relative w-32 h-32 mb-4">
                    <Image
                      src="/placeholder.svg?height=128&width=128"
                      width={128}
                      height={128}
                      alt="David Chen"
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">David Chen</h3>
                  <p className="text-rose-600">Online Learning Director</p>
                  <p className="mt-2 text-gray-500 text-sm">
                    Educational technology expert who leads our virtual classroom and digital learning initiatives.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Our Facilities</h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl">
                  Modern learning environments designed to facilitate language acquisition and professional development.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  width={400}
                  height={300}
                  alt="Modern classroom"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-bold">Modern Classrooms</h3>
                  <p className="text-sm text-gray-500">Equipped with the latest technology for interactive learning</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  width={400}
                  height={300}
                  alt="Language lab"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-bold">Language Labs</h3>
                  <p className="text-sm text-gray-500">Specialized audio-visual equipment for pronunciation practice</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  width={400}
                  height={300}
                  alt="Meeting room"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-bold">Business Meeting Rooms</h3>
                  <p className="text-sm text-gray-500">Simulate real-world professional environments</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  width={400}
                  height={300}
                  alt="Study lounge"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-bold">Student Lounges</h3>
                  <p className="text-sm text-gray-500">Comfortable spaces for practice and conversation</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  width={400}
                  height={300}
                  alt="Virtual classroom"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-bold">Virtual Classrooms</h3>
                  <p className="text-sm text-gray-500">State-of-the-art online learning platforms</p>
                </div>
              </div>
              <div className="overflow-hidden rounded-lg">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  width={400}
                  height={300}
                  alt="Resource center"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-white">
                  <h3 className="font-bold">Resource Center</h3>
                  <p className="text-sm text-gray-500">Extensive library of industry-specific materials</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-[#a3ff3c] text-[#161533]">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-6">Ready to Advance Your Career?</h2>
            <p className="max-w-[700px] mx-auto text-rose-100 md:text-xl mb-8">
              Join thousands of professionals who have transformed their careers through our specialized language
              programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-white text-[#161533] hover:bg-[#161533] hover:text-[#a3ff3c] transition-colors">
                Book Free Assessment
              </Button>
              <Button
                variant="outline"
                className="text-white border-white hover:bg-white/10 hover:text-[#a3ff3c] transition-colors"
              >
                Download Brochure
              </Button>
            </div>
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
