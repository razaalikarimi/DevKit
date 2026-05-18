"use client"

import { useState } from "react"
import { Sidebar } from "@/components/chat/Sidebar"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background relative">
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Desktop: fixed, Mobile: absolute drawer */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <Sidebar />
      </div>

      <main className="flex-1 h-full overflow-hidden flex flex-col">
        {/* Mobile Header */}
        <div className="h-16 border-b border-border flex items-center px-6 md:hidden justify-between bg-white shrink-0">
          <Link href="/">
            <div className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="w-5 h-5 bg-primary" />
              <span className="font-bold uppercase tracking-tighter">Aura</span>
            </div>
          </Link>
          <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        <div className="flex-1 h-full overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  )
}
