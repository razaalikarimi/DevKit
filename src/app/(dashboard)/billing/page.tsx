import { 
  CreditCard, 
  Check, 
  Zap, 
  Shield, 
  History, 
  ArrowUpRight,
  ExternalLink,
  Info
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PLANS } from "@/config"

export default function BillingPage() {
  return (
    <div className="p-8 h-full overflow-y-auto max-w-6xl mx-auto">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-white tracking-tight">Billing & Plans</h1>
        <p className="text-zinc-500 mt-1 text-sm">Manage your subscription, credits, and billing history.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {/* Current Plan Overview */}
        <Card className="md:col-span-2 p-8 glass-dark border-purple-500/20 bg-purple-500/[0.02] relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl ai-gradient flex items-center justify-center">
                <Shield className="text-white" size={20} />
              </div>
              <div>
                <div className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">Current Plan</div>
                <h2 className="text-2xl font-bold text-white">Enterprise Individual</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Status</div>
                <div className="text-lg font-bold text-emerald-500 flex items-center gap-2">
                  <Check size={18} />
                  Active
                </div>
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Billing Cycle</div>
                <div className="text-lg font-bold text-white">Monthly</div>
              </div>
              <div>
                <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Next Payment</div>
                <div className="text-lg font-bold text-white">June 12, 2026</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button className="ai-gradient border-none h-11 px-8 font-bold">
                Change Plan
              </Button>
              <Button variant="outline" className="glass border-white/5 h-11 px-8 font-bold gap-2">
                Manage Payment Method
                <ExternalLink size={16} />
              </Button>
            </div>
          </div>
          <Zap className="absolute -right-8 -bottom-8 w-64 h-64 text-purple-500/5 -rotate-12" />
        </Card>

        {/* Usage Stats */}
        <Card className="p-8 glass-dark border-white/5 bg-white/[0.02]">
          <h3 className="font-bold text-white mb-6">Credit Usage</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-zinc-500">Tokens Remaining</span>
                <span className="text-white">850,000 / 1,000,000</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-[85%]" />
              </div>
            </div>
            <div className="pt-6 border-t border-white/5 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Daily Average</span>
                <span className="text-sm font-bold text-white">12.5k</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500">Estimated Reset</span>
                <span className="text-sm font-bold text-white">22 Days</span>
              </div>
            </div>
            <Button variant="ghost" className="w-full text-purple-400 hover:text-purple-300 hover:bg-purple-500/5 gap-2 text-xs font-bold uppercase tracking-widest">
              Buy Extra Credits
              <ArrowUpRight size={14} />
            </Button>
          </div>
        </Card>
      </div>

      {/* Plan Selection */}
      <h2 className="text-xl font-bold text-white mb-8">Compare Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          { 
            name: "Free", 
            price: "$0", 
            features: ["1,000 tokens/mo", "GPT-3.5 access", "Basic history", "Single workspace"],
            current: false 
          },
          { 
            name: "Pro", 
            price: "$19", 
            features: ["50,000 tokens/mo", "GPT-4o access", "Advanced history", "3 workspaces", "Basic RAG"],
            current: false 
          },
          { 
            name: "Enterprise", 
            price: "$49", 
            features: ["Unlimited tokens*", "Priority GPT-4o", "Full RAG pipeline", "Unlimited workspaces", "Custom personas"],
            current: true 
          }
        ].map((plan, i) => (
          <Card key={i} className={`p-6 flex flex-col ${plan.current ? "border-purple-500/50 bg-purple-500/[0.05]" : "border-white/5 bg-white/[0.02]"}`}>
            <h3 className="text-lg font-bold text-white mb-2">{plan.name}</h3>
            <div className="text-3xl font-bold text-white mb-6">{plan.price}<span className="text-sm text-zinc-500 font-normal">/mo</span></div>
            <div className="space-y-4 flex-1 mb-8">
              {plan.features.map((feature, j) => (
                <div key={j} className="flex items-center gap-3 text-sm text-zinc-400">
                  <Check size={16} className="text-purple-500 shrink-0" />
                  {feature}
                </div>
              ))}
            </div>
            <Button 
              className={plan.current ? "bg-white text-black hover:bg-white/90" : "glass border-white/5"}
              disabled={plan.current}
            >
              {plan.current ? "Current Plan" : "Upgrade"}
            </Button>
          </Card>
        ))}
      </div>

      {/* Billing History */}
      <Card className="glass-dark border-white/5 bg-white/[0.02] overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <History size={16} />
            Billing History
          </h3>
          <Button variant="ghost" size="sm" className="text-xs text-purple-400">Download All</Button>
        </div>
        <div className="divide-y divide-white/5">
          {[
            { id: "INV-2026-001", date: "May 12, 2026", amount: "$49.00", status: "Paid" },
            { id: "INV-2026-002", date: "April 12, 2026", amount: "$49.00", status: "Paid" },
            { id: "INV-2026-003", date: "March 12, 2026", amount: "$19.00", status: "Paid" },
          ].map((invoice, i) => (
            <div key={i} className="p-4 flex items-center justify-between hover:bg-white/[0.01] transition-colors">
              <div className="flex items-center gap-6">
                <div className="text-sm font-medium text-white">{invoice.id}</div>
                <div className="text-xs text-zinc-500">{invoice.date}</div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-sm font-bold text-white">{invoice.amount}</div>
                <div className="text-[10px] bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                  {invoice.status}
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-600 hover:text-white">
                  <ExternalLink size={14} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
