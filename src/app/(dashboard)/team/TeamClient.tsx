"use client"

import { useState } from "react"
import { Users, Mail, MoreVertical, UserPlus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { inviteMember, revokeInvite, removeMember } from "@/actions/team"

export default function TeamClient({ initialMembers, initialInvites }: { initialMembers: any[], initialInvites: any[] }) {
  const [members, setMembers] = useState(initialMembers)
  const [invites, setInvites] = useState(initialInvites)
  const [isInviting, setIsInviting] = useState(false)

  const handleInvite = async () => {
    const email = prompt("Enter email address to invite:")
    if (!email) return;

    setIsInviting(true)
    const result = await inviteMember(email)
    setIsInviting(false)

    if (result.success && result.inviteId) {
      setInvites([{ id: result.inviteId, email, sentAt: new Date() }, ...invites])
      const inviteLink = `${window.location.origin}/invite/${result.inviteId}`
      alert(`Invite created successfully!\n\nSend this link to your friend:\n${inviteLink}\n\n(In production, this would be emailed automatically)`)
    } else {
      alert(result.error || "Failed to send invite.")
    }
  }

  const handleRevoke = async (id: string) => {
    if (!confirm("Are you sure you want to revoke this invite?")) return;
    setInvites(invites.filter(i => i.id !== id))
    await revokeInvite(id)
  }

  const handleRemoveMember = async (id: string, isMe: boolean) => {
    if (isMe) {
      alert("You cannot remove yourself.")
      return;
    }
    if (!confirm("Are you sure you want to remove this member?")) return;
    setMembers(members.filter(m => m.id !== id))
    await removeMember(id)
  }

  return (
    <div className="p-8 h-full overflow-y-auto bg-slate-50/50">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Manage Team</h1>
            <p className="text-slate-500 text-sm mt-1">Manage your team members and their roles.</p>
          </div>
          <Button onClick={handleInvite} disabled={isInviting} className="h-10 px-5 rounded-lg text-sm font-medium flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
            <UserPlus size={16} />
            {isInviting ? "Inviting..." : "Invite Member"}
          </Button>
        </div>

        <div className="space-y-6">
          {/* Members List */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="text-sm font-semibold text-slate-800">Team Members</h3>
              <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 px-2.5 py-1 rounded-md">{members.length} Members</span>
            </div>
            <div className="divide-y divide-slate-100">
              {members.length === 0 && (
                <div className="p-8 text-center text-slate-500 text-sm">No members found.</div>
              )}
              {members.map((member) => (
                <div key={member.id} className="p-5 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border border-slate-200">
                      <AvatarImage src={member.image} />
                      <AvatarFallback className="bg-indigo-50 text-indigo-600 font-medium text-sm">
                        {member.name ? member.name.split(" ").map((n: string) => n[0]).join("").substring(0,2) : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                        {member.name} {member.isMe && <span className="text-xs text-slate-400 font-normal">(You)</span>}
                      </div>
                      <div className="text-sm text-slate-500 mt-0.5">{member.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      member.role === 'Owner' || member.role === 'OWNER' ? 'bg-indigo-50 text-indigo-700' :
                      member.role === 'Admin' || member.role === 'ADMIN' ? 'bg-emerald-50 text-emerald-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {member.role || 'Member'}
                    </span>
                    <Button 
                      onClick={() => handleRemoveMember(member.id, member.isMe)}
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-400 hover:text-red-600 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Invites */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-sm font-semibold text-slate-800">Pending Invites</h3>
            </div>
            <div className="p-2">
              {invites.length === 0 && (
                <div className="p-6 text-center text-slate-500 text-sm">No pending invites.</div>
              )}
              {invites.map((invite) => (
                <div key={invite.id} className="flex items-center justify-between p-4 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center">
                      <Mail className="text-slate-500" size={16} />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">{invite.email}</div>
                      <div className="text-xs text-slate-500 mt-0.5">Invited recently</div>
                    </div>
                  </div>
                  <Button onClick={() => handleRevoke(invite.id)} variant="ghost" size="sm" className="text-xs font-medium text-red-600 hover:text-red-700 hover:bg-red-50 h-8 px-3 rounded-md">
                    Revoke
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
