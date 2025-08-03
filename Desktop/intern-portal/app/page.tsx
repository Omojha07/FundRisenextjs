"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Users, Target, Trophy, Eye, EyeOff } from "lucide-react"

// Static user credentials (in a real app, this would be in a database)
const VALID_CREDENTIALS = [
  { username: "intern1", password: "password123", name: "John Smith" },
  { username: "intern2", password: "password123", name: "Sarah Johnson" },
  { username: "intern3", password: "password123", name: "Michael Chen" },
  { username: "admin", password: "admin123", name: "Admin User" },
  { username: "demo", password: "demo", name: "Demo User" },
]

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Check credentials
    const user = VALID_CREDENTIALS.find((cred) => cred.username === username && cred.password === password)

    if (user) {
      // Set auth cookie and user data
      document.cookie = "auth-token=authenticated; path=/; max-age=86400" // 24 hours
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          username: user.username,
          name: user.name,
        }),
      )

      router.push("/dashboard")
    } else {
      setError("Invalid username or password")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
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
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your portal</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Credentials */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="text-lg">Demo Credentials</CardTitle>
            <CardDescription>Use these credentials to test the portal</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-medium">Username</p>
                  <p className="text-gray-600">demo</p>
                </div>
                <div>
                  <p className="font-medium">Password</p>
                  <p className="text-gray-600">demo</p>
                </div>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-gray-500">
                  Other test accounts: intern1, intern2, intern3, admin (all with password: password123)
                </p>
              </div>
            </div>
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
      </div>
    </div>
  )
}
