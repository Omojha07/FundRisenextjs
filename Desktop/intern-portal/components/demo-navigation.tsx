"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, Gift, BarChart3, Menu, X, LogOut, Users } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/demo/dashboard", icon: Home },
  { name: "Leaderboard", href: "/demo/leaderboard", icon: BarChart3 },
  { name: "Rewards", href: "/demo/rewards", icon: Gift },
]

export default function DemoNavigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("internName")
    localStorage.removeItem("demoMode")
    router.push("/demo")
  }

  const internName = typeof window !== "undefined" ? localStorage.getItem("internName") || "Demo User" : "Demo User"

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="bg-indigo-600 p-2 rounded-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Intern Portal</span>
              <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">DEMO</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
                      isActive
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Desktop User Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <span className="text-sm text-gray-700">Hello, {internName}</span>
            <Button variant="ghost" onClick={handleLogout} className="text-gray-500 hover:text-gray-700">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-500 hover:text-gray-700"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center pl-3 pr-4 py-2 text-base font-medium ${
                    isActive
                      ? "bg-indigo-50 border-r-4 border-indigo-500 text-indigo-700"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              )
            })}
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4 space-x-3">
                <div className="bg-gray-300 h-10 w-10 rounded-full flex items-center justify-center">
                  <Users className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <div className="text-base font-medium text-gray-800">{internName}</div>
                  <div className="text-sm text-gray-500">Demo Mode</div>
                </div>
              </div>
              <div className="mt-3 px-4">
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className="w-full justify-start text-gray-500 hover:text-gray-700"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
