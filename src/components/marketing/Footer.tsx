"use client"

import Link from "next/link"

export const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="section-padding max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-5 h-5 bg-primary" />
              <span className="text-lg font-bold tracking-tighter uppercase">DevKit</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Global leader in enterprise AI solutions. Empowering organizations with next-generation intelligence.
            </p>
          </div>
          
          <div>
            <h5 className="font-bold text-xs uppercase tracking-widest mb-6">Platform</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">Solutions</Link></li>
              <li><Link href="#" className="hover:text-primary">Enterprise</Link></li>
              <li><Link href="#" className="hover:text-primary">Security</Link></li>
              <li><Link href="#" className="hover:text-primary">Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-xs uppercase tracking-widest mb-6">Company</h5>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">About</Link></li>
              <li><Link href="#" className="hover:text-primary">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary">Legal</Link></li>
              <li><Link href="#" className="hover:text-primary">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
            © 2026 DevKit AI Corporation. All rights reserved.
          </p>
          <div className="flex gap-8 text-[10px] text-muted-foreground uppercase font-bold tracking-widest">
            <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary">Terms of Service</Link>
            <Link href="#" className="hover:text-primary">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
