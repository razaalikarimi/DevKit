import { ReactNode } from "react";
import Link from "next/link";
import { ChevronLeft, Bot } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] relative overflow-hidden">
      {/* Background Aesthetic Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[300px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Header */}
      <header className="w-full border-b border-slate-200 bg-white/80 backdrop-blur-md z-10 sticky top-0">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="group">
            <Logo textClassName="text-xl font-bold text-slate-900 tracking-tight" />
          </Link>
          


          <Link 
            href="/" 
            className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to website</span>
          </Link>
        </div>
      </header>

      {/* Main Auth Content (Centered) */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 relative z-10">
        <div className="mb-8 text-center animate-slide-up">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome back</h1>
          <p className="text-slate-500">Sign in to your account to continue building.</p>
        </div>
        
        <div className="w-full max-w-md animate-fade-in">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-200 bg-white z-10">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-slate-400" />
            <span className="text-sm text-slate-500">© 2026 DevKit AI SaaS Platform. All rights reserved.</span>
          </div>
          

        </div>
      </footer>
    </div>
  );
}
