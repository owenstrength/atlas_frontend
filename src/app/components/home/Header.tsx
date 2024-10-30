// components/home/Header.tsx
"use client"

import { Button } from "@/app/components/ui/button"
import { ThemeToggle } from "@/app/components/common/ThemeToggle"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Header = () => {
    const navigation = [
      { name: "Features", href: "/#features" },
      { name: "How it Works", href: "/#how-it-works" },
      { name: "Pricing", href: "/#pricing" },
    ]
  
    return (
      <header className="fixed top-0 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full h-16 px-4 flex items-center justify-between max-w-[1400px] mx-auto relative">
          {/* Logo */}
          <div className="flex-none">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400">
                Atlas
              </span>
            </Link>
          </div>
  
          {/* Navigation - Absolutely positioned in center */}
          <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="px-4 text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </nav>
  
          {/* Actions */}
          <div className="flex-none flex items-center space-x-4 pr-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost" className="text-sm">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="text-sm bg-blue-600 hover:bg-blue-700 dark:bg-violet-600 dark:hover:bg-violet-700">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>
    )
  }

export default Header