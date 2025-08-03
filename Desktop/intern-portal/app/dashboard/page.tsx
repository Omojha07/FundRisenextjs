"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Users, Share2, Trophy, Target, TrendingUp } from "lucide-react"
import Navigation from "@/components/navigation"

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState<{ username: string; name: string } | null>(null)
  const [donationRaised] = useState(2450) // Mock data
  const [referralCode] = useState("INT2024-7892") // Mock referral code
  const [goal] = useState(5000)
  const router = useRouter()

  useEffect(() => {
    const userData = localStorage.getItem("currentUser")
    if (!userData) {
      router.push("/")
    } else {
      setCurrentUser(JSON.parse(userData))
    }
  }, [router])

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  const progressPercentage = (donationRaised / goal) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {currentUser.name}!</h1>
          <p className="text-gray-600 mt-2">Here's your fundraising progress overview</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${donationRaised.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Referral Code</CardTitle>
              <Share2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{referralCode}</div>
              <p className="text-xs text-muted-foreground">Share to earn more</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Goal Progress</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
              <p className="text-xs text-muted-foreground">${goal - donationRaised} remaining</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rank</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#3</div>
              <p className="text-xs text-muted-foreground">Out of 25 interns</p>
            </CardContent>
          </Card>
        </div>

        {/* Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Fundraising Progress</CardTitle>
              <CardDescription>Your journey towards the ${goal.toLocaleString()} goal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>
                    ${donationRaised.toLocaleString()} / ${goal.toLocaleString()}
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>
              <div className="flex justify-between items-center">
                <Badge variant="secondary">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  On Track
                </Badge>
                <span className="text-sm text-muted-foreground">${(goal - donationRaised).toLocaleString()} to go</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Boost your fundraising efforts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Share Referral Code
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                View Leaderboard
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Trophy className="h-4 w-4 mr-2" />
                Check Rewards
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest fundraising milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <DollarSign className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Donation received</p>
                  <p className="text-xs text-muted-foreground">$150 from referral code</p>
                </div>
                <span className="text-xs text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Trophy className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Milestone achieved</p>
                  <p className="text-xs text-muted-foreground">Reached $2,000 raised</p>
                </div>
                <span className="text-xs text-muted-foreground">1 day ago</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <Share2 className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Referral code shared</p>
                  <p className="text-xs text-muted-foreground">Shared on social media</p>
                </div>
                <span className="text-xs text-muted-foreground">2 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
