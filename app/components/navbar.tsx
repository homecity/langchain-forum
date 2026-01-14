"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  const navigation = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Chat", href: "/chat" },
    { name: "Evaluation", href: "/evaluation" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur-md border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#BFB4FD] to-[#2D7A78]">
                <span className="text-lg font-bold text-white">L</span>
              </div>
              <span className="hidden font-mono text-xl font-semibold text-foreground sm:inline-block">
                LangChain
                <span className="ml-1 text-sm text-muted-foreground">Forum</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <ThemeToggle />
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground/80 hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden",
          mobileMenuOpen ? "block" : "hidden"
        )}
      >
        <div className="space-y-1 border-t border-border bg-secondary/95 backdrop-blur-md px-4 pb-3 pt-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block rounded-md px-3 py-2 text-base font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
