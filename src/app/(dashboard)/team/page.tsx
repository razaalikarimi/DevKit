import { getTeamMembers, getPendingInvites } from "@/actions/team"
import TeamClient from "./TeamClient"

export default async function TeamPage() {
  const members = await getTeamMembers()
  const invites = await getPendingInvites()
  
  return <TeamClient initialMembers={members} initialInvites={invites} />
}

