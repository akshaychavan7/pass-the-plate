'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Leaf, Mail, Lock, ArrowRight, Circle } from 'lucide-react'

function Logo() {
  return (
    <div className="flex flex-col items-center mb-8">
      <div className="relative w-28 h-28">
        {/* Outer circle representing community */}
        <div className="absolute inset-0 rounded-full border-4 border-green-500/20" />
        {/* Inner circle with gradient representing earth */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-green-400 to-emerald-600" />
        {/* Leaf representing sustainability */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Leaf className="w-14 h-14 text-white" />
        </div>
        {/* Decorative elements representing community */}
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-500/20" />
        <div className="absolute -bottom-1 -left-1 w-6 h-6 rounded-full bg-green-500/20" />
        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-green-500/20" />
        <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-green-500/20" />
      </div>
      <h1 className="mt-6 text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent tracking-tight">
        Pass the Plate
      </h1>
      <p className="mt-2 text-lg text-green-600/90 font-medium">Share Food, Share Joy</p>
    </div>
  )
}

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // TODO: Implement login logic
    setTimeout(() => setIsLoading(false), 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <Logo />
        
        <Card className="p-6 shadow-lg border-green-100">
          <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-green-900">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-green-600 hover:text-green-700"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-green-600" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
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
                  Signing in...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  Sign in
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-green-600">
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-green-700 hover:text-green-800">
                Sign up
              </Link>
            </p>
          </div>
        </Card>

        <div className="text-center text-sm text-green-600">
          <p>By signing in, you agree to our</p>
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