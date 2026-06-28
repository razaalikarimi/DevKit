"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { acceptInvite } from "@/actions/team"

export default function AcceptInviteClient({ inviteId }: { inviteId: string }) {
  const [isAccepting, setIsAccepting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleAccept = async () => {
    setIsAccepting(true)
    setError(null)
    
    const result = await acceptInvite(inviteId)
    
    if (result.success) {
      // Redirect to team dashboard
      router.push("/team")
      router.refresh()
    } else {
      setError(result.error || "Failed to accept invite")
      setIsAccepting(false)
    }
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
          {error}
        </div>
      )}
      <button
        onClick={handleAccept}
        disabled={isAccepting}
        className="w-full bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {isAccepting ? (
          <>
            <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Accepting...
          </>
        ) : (
          "Accept Invitation"
        )}
      </button>
    </div>
  )
}
