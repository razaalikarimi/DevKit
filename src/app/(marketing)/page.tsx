import { Navbar } from "@/components/marketing/Navbar"
import { Hero } from "@/components/marketing/Hero"
import { Features } from "@/components/marketing/Features"

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#030303] selection:bg-purple-500/30">
      <Navbar />
      <Hero />
      <Features />
      
      {/* Footer Placeholder */}
      <footer className="py-20 border-t border-white/5 text-center">
        <p className="text-zinc-500 text-sm">
          © 2026 Aura AI Platform. Built for the next decade of intelligence.
        </p>
      </footer>
    </main>
  )
}
