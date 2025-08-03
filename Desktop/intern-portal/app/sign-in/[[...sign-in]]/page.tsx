import { SignIn } from "@clerk/nextjs"

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your intern portal</p>
        </div>

        <SignIn
          appearance={{
            elements: {
              formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-sm normal-case",
              card: "shadow-lg",
              headerTitle: "text-2xl font-bold",
              headerSubtitle: "text-gray-600",
            },
          }}
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  )
}
