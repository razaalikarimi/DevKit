/* eslint-disable */
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
    <div className="flex h-screen overflow-hidden bg-[#F8FAFC] relative">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <Sidebar />
      </div>

      <main className="flex-1 h-full overflow-hidden flex flex-col">
        {/* Mobile Header */}
        <div className="h-14 border-b border-slate-200 flex items-center px-5 md:hidden justify-between bg-white shrink-0">
          <Link href="/">
            <div className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
                <div className="w-7 h-7 rounded-md bg-indigo-600 flex items-center justify-center">
                  <span className="text-white text-xs font-black leading-none">D</span>
                </div>
                <span className="font-bold text-slate-900 text-[15px]">DevKit</span>
              </div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>

        <div className="flex-1 min-h-0 h-full overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  )
}
