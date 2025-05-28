'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Leaf, Mail, Lock, User, MapPin, ArrowRight } from 'lucide-react'

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement signup logic
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <Leaf className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-green-900">Create Account</h1>
          <p className="mt-2 text-green-600">Join our community of food sharers</p>
        </div>

        <Card className="p-6 shadow-lg border-green-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-green-900">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  className="pl-9 border-green-200 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-green-900">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-9 border-green-200 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="text-sm font-medium text-green-900">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
                <Input
                  id="location"
                  type="text"
                  placeholder="Enter your city"
                  className="pl-9 border-green-200 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-green-900">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  className="pl-9 border-green-200 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-green-900">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  className="pl-9 border-green-200 focus:border-green-500 focus:ring-green-500"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating account...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Create Account
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-green-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-green-700 hover:text-green-800">
                Sign in
              </Link>
            </p>
          </div>
        </Card>

        <div className="text-center text-sm text-green-600">
          <p>By creating an account, you agree to our</p>
          <div className="flex justify-center gap-2">
            <Link href="/terms" className="hover:text-green-700">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-green-700">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 