import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { getInviteDetails } from "@/actions/team"
import AcceptInviteClient from "./AcceptInviteClient"

export default async function InvitePage({ params }: { params: { id: string } }) {
  const { id } = params
  
  // Get invite details from the database
  const invite = await getInviteDetails(id)
  
  if (!invite) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-md w-full text-center">
          <div className="h-12 w-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mb-2">Invalid Invite</h1>
          <p className="text-slate-500 mb-6">This invite link is invalid, expired, or has already been used.</p>
          <a href="/" className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
            Go Home
          </a>
        </div>
      </div>
    )
  }

  // Check auth
  const { userId } = await auth();
  
  if (!userId) {
    // Redirect to sign in, then come back here
    const redirectUrl = `/sign-in?redirect_url=/invite/${id}`
    redirect(redirectUrl)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 max-w-md w-full text-center">
        <div className="h-12 w-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/></svg>
        </div>
        <h1 className="text-xl font-bold text-slate-900 mb-2">You've been invited!</h1>
        <p className="text-slate-500 mb-6">
          You have been invited to join the <span className="font-semibold text-slate-700">{invite.workspaceName}</span> workspace.
        </p>
        
        <AcceptInviteClient inviteId={id} />
      </div>
    </div>
  )
}
