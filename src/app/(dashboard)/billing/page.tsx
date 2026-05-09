"use client"

import { 
  CreditCard, 
  Check, 
  Zap, 
  Shield, 
  History, 
  ArrowUpRight,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function BillingPage() {
  return (
    <div className="p-10 h-full overflow-y-auto max-w-7xl mx-auto">
      <div className="mb-12 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Financial Operations</h1>
        <p className="text-muted-foreground text-sm">Manage enterprise subscriptions, credit allocation, and transaction history.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-1 bg-border border border-border mb-16">
        <div className="lg:col-span-2 p-10 bg-white space-y-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-primary flex items-center justify-center">
              <Shield className="text-white" size={24} />
            </div>
            <div>
              <div className="text-[10px] text-primary font-bold uppercase tracking-[0.2em] mb-1">Active Subscription</div>
              <h2 className="text-2xl font-bold">Enterprise Core Plan</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] mb-2">Status</div>
              <div className="text-sm font-bold text-emerald-600 flex items-center gap-2 uppercase tracking-widest">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Verified
              </div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] mb-2">Billing Term</div>
              <div className="text-sm font-bold uppercase tracking-widest">Annual (FY 2026)</div>
            </div>
            <div>
              <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em] mb-2">Next Invoice</div>
              <div className="text-sm font-bold uppercase tracking-widest">June 12, 2026</div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-6">
            <Button className="enterprise-btn h-12 px-10 font-bold uppercase tracking-widest text-xs">
              Modify Subscription
            </Button>
            <Button variant="outline" className="rounded-none border-border h-12 px-10 font-bold uppercase tracking-widest text-xs gap-3">
              Payment Gateway
              <ExternalLink size={16} />
            </Button>
          </div>
        </div>

        <div className="p-10 bg-secondary/30 space-y-8">
          <div className="flex items-center gap-3">
            <Zap className="text-primary" size={20} />
            <h3 className="font-bold uppercase tracking-widest text-xs">Resource Quota</h3>
          </div>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                <span className="text-muted-foreground">Token Pool</span>
                <span>850k / 1.0M</span>
              </div>
              <div className="h-1.5 bg-border rounded-none overflow-hidden">
                <div className="h-full bg-primary w-[85%]" />
              </div>
            </div>
            <div className="pt-6 border-t border-border space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Consumption Rate</span>
                <span className="text-sm font-bold">12.5k / day</span>
              </div>
            </div>
            <Button variant="ghost" className="w-full text-primary hover:bg-primary/5 gap-2 text-[10px] font-bold uppercase tracking-[0.2em] h-12 border border-primary/20">
              Increase Allocation
              <ArrowUpRight size={14} />
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-muted-foreground mb-8">Platform Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1 bg-border border border-border">
          {[
            { 
              name: "Standard", 
              price: "$19", 
              features: ["50k tokens/mo", "Model access: Flash", "Shared compute", "Standard support"],
              current: false 
            },
            { 
              name: "Enterprise Core", 
              price: "$49", 
              features: ["500k tokens/mo", "Model access: Pro", "Priority compute", "24/7 Support", "Hybrid RAG"],
              current: true 
            },
            { 
              name: "Custom (SLA)", 
              price: "Contact", 
              features: ["Unlimited tokens", "Private compute", "On-premise option", "Dedicated account manager"],
              current: false 
            }
          ].map((plan, i) => (
            <div key={i} className={`p-10 flex flex-col justify-between ${plan.current ? "bg-white ring-1 ring-primary relative z-10" : "bg-white opacity-60"}`}>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold">{plan.price}</div>
                </div>
                <div className="space-y-4">
                  {plan.features.map((feature, j) => (
                    <div key={j} className="flex items-center gap-3 text-xs font-medium text-muted-foreground">
                      <Check size={14} className="text-primary shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
              <Button 
                className={`mt-10 h-12 rounded-none uppercase tracking-widest text-[10px] font-bold ${plan.current ? "bg-primary text-white" : "bg-secondary text-foreground hover:bg-border"}`}
                disabled={plan.current}
              >
                {plan.current ? "Current Allocation" : "Request Upgrade"}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white border border-border overflow-hidden mt-16">
        <div className="p-8 border-b border-border flex items-center justify-between">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] flex items-center gap-2">
            <History size={16} />
            Ledger History
          </h3>
          <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest text-primary">Export Statements</Button>
        </div>
        <div className="divide-y divide-border">
          {[
            { id: "INV-2026-001", date: "May 12, 2026", amount: "$49.00", status: "Processed" },
            { id: "INV-2026-002", date: "April 12, 2026", amount: "$49.00", status: "Processed" },
            { id: "INV-2026-003", date: "March 12, 2026", amount: "$19.00", status: "Processed" },
          ].map((invoice, i) => (
            <div key={i} className="p-6 flex items-center justify-between hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-12">
                <div className="text-sm font-bold">{invoice.id}</div>
                <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{invoice.date}</div>
              </div>
              <div className="flex items-center gap-12">
                <div className="text-sm font-bold">{invoice.amount}</div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">
                  {invoice.status}
                </div>
                <ExternalLink size={14} className="text-muted-foreground cursor-pointer hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
