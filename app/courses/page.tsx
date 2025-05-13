import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Globe, ArrowLeft, User } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function CoursesPage() {
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
        <section className="w-full py-12 m-py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <Link href="/" className="flex items-center text-[#a3ff3c] hover:text-[#92e636] mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Language Programs</h1>
                <p className="max-w-[700px] text-gray-500 md:text-xl">
                  Comprehensive language courses designed for professional development and career advancement.
                </p>
              </div>
            </div>

            <Tabs defaultValue="english" className="w-full max-w-4xl mx-auto mt-12">
              <TabsList className="grid w-full grid-cols-2 bg-[#e8ffd4] text-[#161533]">
                <TabsTrigger
                  value="english"
                  className="data-[state=active]:bg-[#a3ff3c] data-[state=active]:text-[#161533]"
                >
                  English Programs
                </TabsTrigger>
                <TabsTrigger
                  value="spanish"
                  className="data-[state=active]:bg-[#a3ff3c] data-[state=active]:text-[#161533]"
                >
                  Spanish Programs
                </TabsTrigger>
              </TabsList>
              <TabsContent value="english" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader className="bg-blue-50 pb-8">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-blue-100 p-2">
                          <Globe className="h-5 w-5 text-blue-600" />
                        </div>
                        <CardTitle>Business English</CardTitle>
                      </div>
                      <CardDescription>For professionals in corporate environments</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Business communication and negotiation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Presentation and meeting skills</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Email and report writing</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6">
                      <div className="text-2xl font-bold">
                        $299<span className="text-sm font-normal text-gray-500">/month</span>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">Enroll Now</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="bg-blue-50 pb-8">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-blue-100 p-2">
                          <Globe className="h-5 w-5 text-blue-600" />
                        </div>
                        <CardTitle>Technical English</CardTitle>
                      </div>
                      <CardDescription>For engineers, IT professionals, and scientists</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Technical vocabulary and terminology</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Documentation and technical writing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Project presentations and collaboration</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6">
                      <div className="text-2xl font-bold">
                        $349<span className="text-sm font-normal text-gray-500">/month</span>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">Enroll Now</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="bg-blue-50 pb-8">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-blue-100 p-2">
                          <Globe className="h-5 w-5 text-blue-600" />
                        </div>
                        <CardTitle>Medical English</CardTitle>
                      </div>
                      <CardDescription>For healthcare professionals</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Medical terminology and patient communication</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Case presentations and medical reports</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Research paper comprehension and writing</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6">
                      <div className="text-2xl font-bold">
                        $349<span className="text-sm font-normal text-gray-500">/month</span>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">Enroll Now</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="bg-blue-50 pb-8">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-blue-100 p-2">
                          <Globe className="h-5 w-5 text-blue-600" />
                        </div>
                        <CardTitle>Legal English</CardTitle>
                      </div>
                      <CardDescription>For legal professionals and law students</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Legal terminology and contract language</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Case analysis and legal writing</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Negotiation and client consultation skills</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6">
                      <div className="text-2xl font-bold">
                        $349<span className="text-sm font-normal text-gray-500">/month</span>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700">Enroll Now</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="spanish" className="mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader className="bg-amber-50 pb-8">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-amber-100 p-2">
                          <Globe className="h-5 w-5 text-amber-600" />
                        </div>
                        <CardTitle>Business Spanish</CardTitle>
                      </div>
                      <CardDescription>For professionals working with Spanish-speaking markets</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Business communication and negotiation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Latin American business culture</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Professional correspondence</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6">
                      <div className="text-2xl font-bold">
                        $299<span className="text-sm font-normal text-gray-500">/month</span>
                      </div>
                      <Button className="bg-amber-600 hover:bg-amber-700">Enroll Now</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="bg-amber-50 pb-8">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-amber-100 p-2">
                          <Globe className="h-5 w-5 text-amber-600" />
                        </div>
                        <CardTitle>Technical Spanish</CardTitle>
                      </div>
                      <CardDescription>For engineers and technical professionals</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Technical vocabulary for various industries</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Project management terminology</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Technical documentation and presentations</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6">
                      <div className="text-2xl font-bold">
                        $349<span className="text-sm font-normal text-gray-500">/month</span>
                      </div>
                      <Button className="bg-amber-600 hover:bg-amber-700">Enroll Now</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="bg-amber-50 pb-8">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-amber-100 p-2">
                          <Globe className="h-5 w-5 text-amber-600" />
                        </div>
                        <CardTitle>Medical Spanish</CardTitle>
                      </div>
                      <CardDescription>For healthcare professionals</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Medical terminology and patient interaction</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Healthcare procedures and documentation</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Cultural aspects of healthcare in Spanish-speaking regions</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6">
                      <div className="text-2xl font-bold">
                        $349<span className="text-sm font-normal text-gray-500">/month</span>
                      </div>
                      <Button className="bg-amber-600 hover:bg-amber-700">Enroll Now</Button>
                    </CardFooter>
                  </Card>
                  <Card>
                    <CardHeader className="bg-amber-50 pb-8">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full bg-amber-100 p-2">
                          <Globe className="h-5 w-5 text-amber-600" />
                        </div>
                        <CardTitle>Tourism & Hospitality Spanish</CardTitle>
                      </div>
                      <CardDescription>For professionals in the tourism industry</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Customer service and hospitality vocabulary</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Cultural knowledge and local customs</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                          <span>Travel arrangements and problem-solving</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t p-6">
                      <div className="text-2xl font-bold">
                        $299<span className="text-sm font-normal text-gray-500">/month</span>
                      </div>
                      <Button className="bg-amber-600 hover:bg-amber-700">Enroll Now</Button>
                    </CardFooter>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
            {/* Rest of the courses page content */}
            {/* ... */}
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
