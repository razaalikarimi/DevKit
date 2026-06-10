"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, Shield, Zap } from "lucide-react"
import Link from "next/link"

export const Hero = () => {
  return (
    <section className="bg-white border-b border-border">
      <div className="section-padding grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary text-primary text-[10px] font-bold uppercase tracking-[0.2em] border-l-2 border-primary">
            Enterprise AI Platform
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] text-[#161616]">
            The next generation <br /> 
            <span className="text-primary italic">of AI intelligence.</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl leading-relaxed">
            Scalable, secure, and integrated AI solutions designed for the modern enterprise. Automate workflows and unlock insights with DevKit.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/dashboard">
              <Button className="enterprise-btn h-14 px-8 text-sm uppercase tracking-widest font-bold">
                Experience DevKit
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="#solutions">
              <Button variant="outline" className="h-14 px-8 rounded-none border-border hover:bg-secondary text-sm uppercase tracking-widest font-bold">
                View Solutions
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border">
            {[
              { label: "Uptime", value: "99.9%" },
              { label: "Security", value: "SOC2" },
              { label: "Latency", value: "50ms" },
            ].map((item, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-primary">{item.value}</div>
                <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="relative hidden lg:block">
          <div className="aspect-square bg-secondary p-8 flex items-center justify-center border border-border">
            <div className="grid grid-cols-2 gap-4 w-full h-full">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white border border-border p-6 flex flex-col justify-between">
                  <div className="w-8 h-8 bg-secondary" />
                  <div className="space-y-2">
                    <div className="h-2 w-full bg-secondary" />
                    <div className="h-2 w-2/3 bg-secondary" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
