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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function TeamPage() {
  return (
    <div className="p-8 h-full overflow-y-auto max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Team Management</h1>
          <p className="text-zinc-500 mt-1 text-sm">Manage your workspace members and their permissions.</p>
        </div>
        <Button className="ai-gradient border-none gap-2">
          <UserPlus size={16} />
          Invite Member
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Members List */}
        <div className="md:col-span-2 space-y-6">
          <Card className="glass-dark border-white/5 bg-white/[0.02] overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/[0.01]">
              <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Active Members</h3>
            </div>
            <div className="divide-y divide-white/5">
              {[
                { name: "Alex Rivers", email: "alex@aura.ai", role: "Owner", image: "https://github.com/shadcn.png" },
                { name: "Sarah Chen", email: "sarah@aura.ai", role: "Admin", image: "" },
                { name: "Michael Scott", email: "michael@aura.ai", role: "Member", image: "" },
              ].map((member, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-white/[0.01] transition-colors group">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border border-white/10">
                      <AvatarImage src={member.image} />
                      <AvatarFallback className="bg-purple-500/10 text-purple-400">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-medium text-white flex items-center gap-2">
                        {member.name}
                        {member.role === "Owner" && (
                          <span className="text-[10px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-tighter">
                            Owner
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-zinc-500">{member.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-zinc-600 font-medium">{member.role}</span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-600 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Pending Invites */}
          <Card className="glass-dark border-white/5 bg-white/[0.02] overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/[0.01]">
              <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Pending Invites</h3>
            </div>
            <div className="p-4 space-y-4">
              {[
                { email: "david.beck@gmail.com", sent: "2 days ago" },
              ].map((invite, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.01] border border-white/5">
                  <div className="flex items-center gap-3">
                    <Mail className="text-zinc-500" size={16} />
                    <div>
                      <div className="text-sm text-white font-medium">{invite.email}</div>
                      <div className="text-[10px] text-zinc-600">Sent {invite.sent}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs text-red-500 hover:text-red-400 hover:bg-red-500/10">
                    Cancel
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Workspace Settings Sidebar */}
        <div className="space-y-6">
          <Card className="p-6 glass-dark border-white/5 bg-white/[0.02]">
            <h3 className="font-bold text-white mb-6">Workspace Overview</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">Workspace Name</Label>
                <Input value="Aura Enterprise" className="bg-white/5 border-white/5 text-sm h-9" readOnly />
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">Plan</Label>
                <div className="flex items-center justify-between p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
                  <div className="flex items-center gap-2">
                    <Shield className="text-purple-400" size={16} />
                    <span className="text-sm font-bold text-white">Enterprise</span>
                  </div>
                  <span className="text-[10px] text-purple-400 font-bold underline cursor-pointer">Manage</span>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-8 border-white/5 glass text-xs font-bold uppercase tracking-widest">
              Workspace Settings
            </Button>
          </Card>

          <Card className="p-6 glass-dark border-white/5 bg-white/[0.02]">
            <h3 className="font-bold text-white mb-4">Sharing Features</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Shared Chats</span>
                <CheckCircle2 className="text-emerald-500" size={14} />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Global Knowledge</span>
                <CheckCircle2 className="text-emerald-500" size={14} />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500">Admin Controls</span>
                <CheckCircle2 className="text-emerald-500" size={14} />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
