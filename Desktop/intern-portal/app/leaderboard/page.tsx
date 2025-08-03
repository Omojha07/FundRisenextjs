"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Trophy, Medal, Award, TrendingUp, Users } from "lucide-react"
import Navigation from "@/components/navigation"

const leaderboardData = [
  {
    rank: 1,
    name: "Sarah Johnson",
    username: "intern2",
    amount: 4850,
    referralCode: "INT2024-1234",
    progress: 97,
    trend: "up",
    avatar: "SJ",
  },
  {
    rank: 2,
    name: "Michael Chen",
    username: "intern3",
    amount: 3920,
    referralCode: "INT2024-5678",
    progress: 78,
    trend: "up",
    avatar: "MC",
  },
  {
    rank: 3,
    name: "Demo User",
    username: "demo",
    amount: 2450,
    referralCode: "INT2024-7892",
    progress: 49,
    trend: "up",
    avatar: "DU",
    isCurrentUser: true,
  },
  {
    rank: 4,
    name: "John Smith",
    username: "intern1",
    amount: 2380,
    referralCode: "INT2024-9012",
    progress: 48,
    trend: "up",
    avatar: "JS",
  },
  {
    rank: 5,
    name: "Admin User",
    username: "admin",
    amount: 2150,
    referralCode: "INT2024-3456",
    progress: 43,
    trend: "stable",
    avatar: "AU",
  },
  {
    rank: 6,
    name: "Jessica Brown",
    username: "intern6",
    amount: 1980,
    referralCode: "INT2024-7890",
    progress: 40,
    trend: "up",
    avatar: "JB",
  },
  {
    rank: 7,
    name: "Alex Thompson",
    username: "intern7",
    amount: 1750,
    referralCode: "INT2024-2345",
    progress: 35,
    trend: "down",
    avatar: "AT",
  },
  {
    rank: 8,
    name: "Maria Garcia",
    username: "intern8",
    amount: 1620,
    referralCode: "INT2024-6789",
    progress: 32,
    trend: "up",
    avatar: "MG",
  },
  {
    rank: 9,
    name: "James Wilson",
    username: "intern9",
    amount: 1450,
    referralCode: "INT2024-0123",
    progress: 29,
    trend: "stable",
    avatar: "JW",
  },
  {
    rank: 10,
    name: "Lisa Anderson",
    username: "intern10",
    amount: 1320,
    referralCode: "INT2024-4567",
    progress: 26,
    trend: "up",
    avatar: "LA",
  },
]

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />
    default:
      return <span className="text-lg font-bold text-gray-500">#{rank}</span>
  }
}

const getTrendIcon = (trend: string) => {
  switch (trend) {
    case "up":
      return <TrendingUp className="h-4 w-4 text-green-500" />
    case "down":
      return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
    default:
      return <div className="h-4 w-4 bg-gray-300 rounded-full" />
  }
}

export default function LeaderboardPage() {
  const [currentUser, setCurrentUser] = useState<{ username: string; name: string } | null>(null)
  const router = useRouter()
  const totalInterns = 25
  const totalRaised = leaderboardData.reduce((sum, intern) => sum + intern.amount, 0)

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

  // Update the leaderboard to show current user
  const updatedLeaderboardData = leaderboardData.map((intern) => ({
    ...intern,
    isCurrentUser: intern.username === currentUser.username,
    name: intern.username === currentUser.username ? currentUser.name : intern.name,
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
          <p className="text-gray-600 mt-2">See how you stack up against other interns</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalInterns}</div>
              <p className="text-xs text-muted-foreground">Active interns</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRaised.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Collective effort</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Raised</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${Math.round(totalRaised / totalInterns).toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">Per intern</p>
            </CardContent>
          </Card>
        </div>

        {/* Top 3 Podium */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
            <CardDescription>Our fundraising champions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {updatedLeaderboardData.slice(0, 3).map((intern, index) => (
                <div
                  key={intern.rank}
                  className={`text-center p-6 rounded-lg border-2 ${
                    index === 0
                      ? "border-yellow-200 bg-yellow-50"
                      : index === 1
                        ? "border-gray-200 bg-gray-50"
                        : "border-amber-200 bg-amber-50"
                  } ${intern.isCurrentUser ? "ring-2 ring-indigo-500" : ""}`}
                >
                  <div className="flex justify-center mb-4">{getRankIcon(intern.rank)}</div>
                  <Avatar className="h-16 w-16 mx-auto mb-4">
                    <AvatarFallback className="text-lg font-bold">{intern.avatar}</AvatarFallback>
                  </Avatar>
                  <h3 className="font-bold text-lg mb-2">
                    {intern.name}
                    {intern.isCurrentUser && (
                      <Badge variant="default" className="ml-2 bg-indigo-600">
                        You
                      </Badge>
                    )}
                  </h3>
                  <p className="text-2xl font-bold text-green-600 mb-2">${intern.amount.toLocaleString()}</p>
                  <Badge variant="outline" className="mb-2">
                    {intern.progress}% of goal
                  </Badge>
                  <p className="text-xs text-gray-500">{intern.referralCode}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Full Leaderboard */}
        <Card>
          <CardHeader>
            <CardTitle>Full Rankings</CardTitle>
            <CardDescription>Complete leaderboard standings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {updatedLeaderboardData.map((intern) => (
                <div
                  key={intern.rank}
                  className={`flex items-center space-x-4 p-4 rounded-lg border ${
                    intern.isCurrentUser ? "border-indigo-200 bg-indigo-50" : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-center w-12">{getRankIcon(intern.rank)}</div>

                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{intern.avatar}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{intern.name}</h3>
                      {intern.isCurrentUser && (
                        <Badge variant="default" className="bg-indigo-600">
                          You
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{intern.referralCode}</p>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">${intern.amount.toLocaleString()}</p>
                    <div className="flex items-center space-x-1">
                      {getTrendIcon(intern.trend)}
                      <span className="text-sm text-gray-500">{intern.progress}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Motivation Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Keep Going!</CardTitle>
            <CardDescription>Every donation counts towards making a difference</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6">
              <Trophy className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">You're doing amazing!</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Remember, this isn't just about the numbers - every dollar raised makes a real impact. Keep sharing your
                story and inspiring others to contribute to this important cause.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
