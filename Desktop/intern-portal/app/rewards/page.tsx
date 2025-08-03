"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Trophy, Gift, Star, Crown, Zap, Target } from "lucide-react"
import Navigation from "@/components/navigation"

const rewards = [
  {
    id: 1,
    title: "First Donation",
    description: "Receive your first donation of any amount",
    reward: "Welcome Kit + Stickers",
    threshold: 1,
    icon: Gift,
    color: "bg-green-100 text-green-600",
    status: "completed",
  },
  {
    id: 2,
    title: "Rising Star",
    description: "Raise $500 in donations",
    reward: "Company T-Shirt + Certificate",
    threshold: 500,
    icon: Star,
    color: "bg-blue-100 text-blue-600",
    status: "completed",
  },
  {
    id: 3,
    title: "Fundraising Hero",
    description: "Raise $1,000 in donations",
    reward: "Branded Hoodie + Gift Card ($50)",
    threshold: 1000,
    icon: Zap,
    color: "bg-purple-100 text-purple-600",
    status: "completed",
  },
  {
    id: 4,
    title: "Goal Crusher",
    description: "Raise $2,500 in donations",
    reward: "Premium Backpack + Gift Card ($100)",
    threshold: 2500,
    icon: Target,
    color: "bg-orange-100 text-orange-600",
    status: "current",
  },
  {
    id: 5,
    title: "Fundraising Champion",
    description: "Reach your $5,000 goal",
    reward: "Exclusive Jacket + Gift Card ($200)",
    threshold: 5000,
    icon: Trophy,
    color: "bg-yellow-100 text-yellow-600",
    status: "locked",
  },
  {
    id: 6,
    title: "Legend Status",
    description: "Exceed $7,500 in donations",
    reward: "VIP Experience + Gift Card ($500)",
    threshold: 7500,
    icon: Crown,
    color: "bg-red-100 text-red-600",
    status: "locked",
  },
]

export default function RewardsPage() {
  const [currentUser, setCurrentUser] = useState<{ username: string; name: string } | null>(null)
  const router = useRouter()
  const currentAmount = 2450 // Mock current amount

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Rewards Center</h1>
          <p className="text-gray-600 mt-2">Unlock amazing rewards as you reach fundraising milestones</p>
        </div>

        {/* Current Progress */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Current fundraising amount: ${currentAmount.toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-2">
                  <span>Next Reward: Goal Crusher</span>
                  <span>${currentAmount} / $2,500</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-indigo-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${(currentAmount / 2500) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  ${2500 - currentAmount} away from your next reward!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => {
            const Icon = reward.icon
            const isCompleted = reward.status === "completed"
            const isCurrent = reward.status === "current"
            const isLocked = reward.status === "locked"

            return (
              <Card key={reward.id} className={`relative ${isCurrent ? "ring-2 ring-indigo-500" : ""}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-full ${reward.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      {isCompleted && (
                        <Badge variant="default" className="bg-green-600">
                          Completed
                        </Badge>
                      )}
                      {isCurrent && (
                        <Badge variant="default" className="bg-indigo-600">
                          In Progress
                        </Badge>
                      )}
                      {isLocked && <Badge variant="secondary">Locked</Badge>}
                    </div>
                  </div>
                  <CardTitle className={`${isLocked ? "text-gray-400" : ""}`}>{reward.title}</CardTitle>
                  <CardDescription className={`${isLocked ? "text-gray-300" : ""}`}>
                    {reward.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">Reward:</p>
                      <p className={`text-sm ${isLocked ? "text-gray-400" : "text-gray-600"}`}>{reward.reward}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Threshold:</p>
                      <p className={`text-sm ${isLocked ? "text-gray-400" : "text-gray-600"}`}>
                        ${reward.threshold.toLocaleString()}
                      </p>
                    </div>
                    {isCompleted && (
                      <Button className="w-full bg-transparent" variant="outline">
                        Claim Reward
                      </Button>
                    )}
                    {isCurrent && (
                      <div className="text-center">
                        <p className="text-sm text-indigo-600 font-medium">
                          ${reward.threshold - currentAmount} to go!
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bonus Rewards */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Bonus Rewards</CardTitle>
            <CardDescription>Special achievements and monthly bonuses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <Trophy className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <h3 className="font-medium">Top Performer</h3>
                <p className="text-sm text-gray-600">Monthly leaderboard winner</p>
                <Badge variant="outline" className="mt-2">
                  $1,000 Bonus
                </Badge>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Star className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-medium">Team Player</h3>
                <p className="text-sm text-gray-600">Help 5 other interns</p>
                <Badge variant="outline" className="mt-2">
                  Special Recognition
                </Badge>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <Zap className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                <h3 className="font-medium">Speed Demon</h3>
                <p className="text-sm text-gray-600">Reach goal in 30 days</p>
                <Badge variant="outline" className="mt-2">
                  Express Bonus
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
