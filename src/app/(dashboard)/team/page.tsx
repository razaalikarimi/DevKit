"use client"

import { 
  Users, 
  Plus, 
  Mail, 
  Shield, 
  MoreVertical, 
  UserPlus,
  Trash2,
  CheckCircle2
} from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function TeamPage() {
  return (
    <div className="p-10 h-full overflow-y-auto max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-12">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Identity & Access</h1>
          <p className="text-muted-foreground text-sm">Manage organizational structure, member roles, and system permissions.</p>
        </div>
        <Button className="enterprise-btn h-12 px-8">
          <UserPlus size={18} />
          Provision Member
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Members List */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white border border-border">
            <div className="p-6 border-b border-border bg-secondary/30">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Workforce Inventory</h3>
            </div>
            <div className="divide-y divide-border">
              {[
                { name: "Alex Rivers", email: "alex@aura.ai", role: "Owner", image: "https://github.com/shadcn.png" },
                { name: "Sarah Chen", email: "sarah@aura.ai", role: "Admin", image: "" },
                { name: "Michael Scott", email: "michael@aura.ai", role: "Associate", image: "" },
              ].map((member, i) => (
                <div key={i} className="p-6 flex items-center justify-between hover:bg-secondary/30 transition-colors group">
                  <div className="flex items-center gap-6">
                    <Avatar className="h-12 w-12 border border-border rounded-none">
                      <AvatarImage src={member.image} />
                      <AvatarFallback className="bg-primary/10 text-primary rounded-none font-bold">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-bold flex items-center gap-3">
                        {member.name}
                        {member.role === "Owner" && (
                          <span className="text-[8px] bg-primary text-white px-2 py-0.5 font-bold uppercase tracking-widest">
                            Master
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest mt-1">{member.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">{member.role}</span>
                    <Button variant="ghost" size="icon" className="h-10 w-10 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Invites */}
          <div className="bg-white border border-border">
            <div className="p-6 border-b border-border bg-secondary/30">
              <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Pending Authorizations</h3>
            </div>
            <div className="p-6 space-y-4">
              {[
                { email: "david.beck@gmail.com", sent: "48 HOURS AGO" },
              ].map((invite, i) => (
                <div key={i} className="flex items-center justify-between p-4 border border-border bg-secondary/10">
                  <div className="flex items-center gap-4">
                    <Mail className="text-primary" size={18} />
                    <div>
                      <div className="text-sm font-bold">{invite.email}</div>
                      <div className="text-[8px] text-muted-foreground font-bold tracking-[0.2em] uppercase mt-1">REQUESTED {invite.sent}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest text-destructive hover:bg-destructive/5">
                    Revoke
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Workspace Settings Sidebar */}
        <div className="space-y-8">
          <div className="p-8 border border-border bg-white">
            <h3 className="font-bold text-lg mb-8">Asset Parameters</h3>
            <div className="space-y-8">
              <div className="space-y-3">
                <Label className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">Asset Name</Label>
                <Input value="Aura Enterprise Instance" className="bg-secondary/20 border-border rounded-none h-12 text-sm font-medium" readOnly />
              </div>
              <div className="space-y-3">
                <Label className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.2em]">Service Level</Label>
                <div className="flex items-center justify-between p-4 border border-primary/20 bg-primary/5">
                  <div className="flex items-center gap-3">
                    <Shield className="text-primary" size={18} />
                    <span className="text-xs font-bold uppercase tracking-widest text-primary">Enterprise</span>
                  </div>
                  <span className="text-[10px] text-primary font-bold underline cursor-pointer uppercase tracking-widest">Upgrade</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-10 border-border rounded-none h-12 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-secondary">
              Instance Configurations
            </Button>
          </div>

          <div className="p-8 border border-border bg-white">
            <h3 className="font-bold text-lg mb-6">Security Protocol</h3>
            <div className="space-y-6">
              {[
                { label: "Shared Assets", status: true },
                { label: "Global Context", status: true },
                { label: "Audit Logging", status: true },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-muted-foreground">{item.label}</span>
                  <CheckCircle2 className="text-primary" size={16} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
