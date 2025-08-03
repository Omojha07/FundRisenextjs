"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Target, Trophy, AlertCircle } from "lucide-react"

export default function DemoLoginPage() {
  const [internName, setInternName] = useState("")
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (internName.trim()) {
      // Store intern name in localStorage for demo purposes
      localStorage.setItem("internName", internName)
      localStorage.setItem("demoMode", "true")
      router.push("/demo/dashboard")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span className="text-sm">
              <strong>Demo Mode:</strong> This is a preview without Clerk authentication
            </span>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-indigo-600 p-3 rounded-full">
              <Users className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Intern Portal</h1>
          <p className="text-gray-600">Welcome to your fundraising dashboard</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Demo Sign In</CardTitle>
            <CardDescription>Enter your name to preview the portal</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Intern Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={internName}
                  onChange={(e) => setInternName(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Access Demo Portal
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 grid grid-cols-3 gap-4 text-center">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <Target className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Track Goals</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <Trophy className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Earn Rewards</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <Users className="h-6 w-6 text-indigo-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Leaderboard</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Want the full experience? Set up Clerk authentication by following the instructions above.
          </p>
        </div>
      </div>
    </div>
  )
}
