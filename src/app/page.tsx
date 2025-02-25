  "use client"
  import React, { useState, useEffect } from 'react'
  import Link from "next/link"
  import { Moon, Sun, CheckCircle2, MountainIcon } from "lucide-react"

  // Import custom components
  import Button from './components/ui/button'
  import Input from './components/ui/input'
  import NavBar from './components/ui/navbar'

  export default function LandingPage() {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [theme, setTheme] = useState('light')

    useEffect(() => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      }, []);
      const toggleTheme = () => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      }
    return (
      <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
    
        <main className="flex-1">
          <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    Chase your dreams
                  </h1>
                  <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Using advanced machine learning, psychometrics, and career satisfaction data, we’ve reimagined what a career test can be.                </p>
                </div>
                <div className="space-x-4">
                  <Button onClick={() => setIsLoginModalOpen(true)}>Get Started</Button>
                </div>
              </div>
            </div>
          </section>
          <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-12">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { title: "Automated Workflows", description: "Save time with intelligent automation" },
                  { title: "Real-time Analytics", description: "Make data-driven decisions with instant insights" },
                  { title: "Seamless Integration", description: "Connect with your favorite tools effortlessly" },
                  { title: "Advanced Security", description: "Keep your data safe with enterprise-grade protection" },
                  { title: "24/7 Support", description: "Get help anytime with our round-the-clock support team" },
                  { title: "Customizable Dashboard", description: "Tailor your workspace to your unique needs" },
                ].map((feature, index) => (
                  <div key={index} className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">About Us</h2>
                  <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
                    We are a team of passionate individuals committed to revolutionizing the way businesses operate. Our mission is to provide innovative solutions that empower companies to thrive in the digital age.
                  </p>
                </div>
                <Button variant="outline">Learn More About Our Story</Button>
              </div>
            </div>
          </section>
        </main>
        <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">© 2023 Acme Inc. All rights reserved.</p>
          <nav className="sm:ml-auto flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Terms of Service
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Privacy
            </Link>
          </nav>
        </footer>
        {isLoginModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
              <h2 className="text-2xl font-bold mb-4">Welcome</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Login or create an account to get started.</p>
              <div className="space-y-4">
                <Input label="Email" type="email" placeholder="m@example.com" required />
                <Input label="Password" type="password" required />
                <Button className="w-full">Login</Button>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Do not have an account?</p>
                <Button variant="outline" className="w-full">Register</Button>
              </div>
              <div className="mt-6 text-center">
                <Button variant="secondary" onClick={() => setIsLoginModalOpen(false)}>Close</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }