"use client"
import { useState, useEffect } from "react"
import { Button } from "@/app/components/ui/button"
import { Input } from "@/app/components/ui/input"
import { Label } from "@/app/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"

const API_BASE_URL = "/api"

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [isCheckingAuth, setIsCheckingAuth] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  async function checkAuth() {
    const token = localStorage.getItem("accessToken")
    
    if (!token) {
      setIsCheckingAuth(false)
      return
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
        },
      })

      if (response.ok) {
        // User is already logged in
        router.push("/dashboard")
      } else {
        // Token is invalid
        localStorage.removeItem("accessToken")
        setIsCheckingAuth(false)
      }
    } catch (error) {
      console.error('Auth check error:', error)
      localStorage.removeItem("accessToken")
      setIsCheckingAuth(false)
    }
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    setError("")

    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const params = new URLSearchParams()
    params.append("username", email)  // Note: using 'username' instead of 'email'
    params.append("password", password)

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
        })

      const data = await response.json()

      if (response.ok) {
        console.log(data)
        if (data.results) {
          localStorage.setItem("accessToken", data.results.access_token.token)
          router.push("/dashboard")
        }
      } else {
        throw new Error(data.message || data.error || "Invalid credentials")
      }
    } catch (error) {
      console.error('Login error:', error)
      setError(error instanceof Error ? error.message : "Failed to sign in")
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading state while checking authentication
  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin dark:border-violet-600 dark:border-t-transparent" />
          <p className="text-foreground/60">Checking authentication...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Welcome back
          </h2>
          <p className="mt-2 text-sm text-foreground/60">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-blue-600 hover:text-blue-500 dark:text-violet-400 dark:hover:text-violet-300">
              Sign up
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={onSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="mt-1"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/auth/reset-password"
                  className="text-sm text-blue-600 hover:text-blue-500 dark:text-violet-400 dark:hover:text-violet-300"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="mt-1"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-500 dark:text-red-400 text-center">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-violet-600 dark:hover:bg-violet-700 text-white"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </div>
    </div>
  )
}