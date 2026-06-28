"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner"
import Script from "next/script"
import { Zap, Check } from "lucide-react"

type UsageContextType = {
  chatCount: number
  toolCount: number
  isProUser: boolean
  isPaywallOpen: boolean
  incrementChat: () => boolean // returns false if blocked
  incrementTool: () => boolean // returns false if blocked
  openPaywall: () => void
  closePaywall: () => void
  upgradeToPro: () => void
}

const UsageContext = createContext<UsageContextType | undefined>(undefined)

export const UsageProvider = ({ children }: { children: React.ReactNode }) => {
  const [chatCount, setChatCount] = useState(0)
  const [toolCount, setToolCount] = useState(0)
  const [isProUser, setIsProUser] = useState(false)
  const [isPaywallOpen, setIsPaywallOpen] = useState(false)
  const [isInitialized, setIsInitialized] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedChat = localStorage.getItem("devkit_chat_count")
    const savedTool = localStorage.getItem("devkit_tool_count")
    const savedPro = localStorage.getItem("devkit_is_pro")

    if (savedChat) setChatCount(parseInt(savedChat))
    if (savedTool) setToolCount(parseInt(savedTool))
    if (savedPro === "true") setIsProUser(true)

    setIsInitialized(true)
  }, [])

  // Sync to localStorage
  useEffect(() => {
    if (!isInitialized) return
    localStorage.setItem("devkit_chat_count", chatCount.toString())
    localStorage.setItem("devkit_tool_count", toolCount.toString())
    localStorage.setItem("devkit_is_pro", isProUser.toString())
  }, [chatCount, toolCount, isProUser, isInitialized])

  const CHAT_LIMIT = 5
  const TOOL_LIMIT = 2

  const openPaywall = () => setIsPaywallOpen(true)
  const closePaywall = () => setIsPaywallOpen(false)
  const upgradeToPro = () => {
    setIsProUser(true)
    closePaywall()
    toast.success("Successfully upgraded to Pro!", {
      description: "You now have unlimited access."
    })
  }

  const incrementChat = () => {
    if (isProUser) return true
    if (chatCount >= CHAT_LIMIT) {
      openPaywall()
      return false
    }
    setChatCount(prev => prev + 1)
    return true
  }

  const incrementTool = () => {
    if (isProUser) return true
    if (toolCount >= TOOL_LIMIT) {
      openPaywall()
      return false
    }
    setToolCount(prev => prev + 1)
    return true
  }

  const handleRazorpayPayment = async () => {
    setIsProcessing(true)
    try {
      const response = await fetch('/api/razorpay', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: 1900, planName: "Pro Plan (Upgrade)" }),
      })

      const order = await response.json()

      if (order.error) {
        toast.error("Failed to initialize payment")
        setIsProcessing(false)
        return
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "DevKit AI",
        description: `Upgrade to Pro`,
        order_id: order.id,
        handler: function (response: any) {
          upgradeToPro()
          setIsProcessing(false)
        },
        prefill: {
          name: "DevKit User",
          email: "user@devkit.io",
          contact: "9999999999"
        },
        theme: {
          color: "#4f46e5"
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false)
          }
        }
      }

      // @ts-ignore
      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', function (response: any){
        toast.error("Payment failed", {
          description: response.error.description
        })
        setIsProcessing(false)
      })
      
      rzp.open()
    } catch (error) {
      console.error(error)
      toast.error("Network error during payment")
      setIsProcessing(false)
    }
  }

  return (
    <UsageContext.Provider value={{
      chatCount,
      toolCount,
      isProUser,
      isPaywallOpen,
      incrementChat,
      incrementTool,
      openPaywall,
      closePaywall,
      upgradeToPro
    }}>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      {children}

      {/* Global Paywall Modal */}
      {isPaywallOpen && !isProUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl relative overflow-hidden">
            
            <div className="px-6 py-6 border-b border-slate-100 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Upgrade Required</h2>
              <button 
                onClick={closePaywall}
                className="text-slate-400 hover:text-slate-600 hover:bg-slate-100 p-1.5 rounded-md transition-colors"
              >
                &times;
              </button>
            </div>

            <div className="p-6">
              <p className="text-slate-500 text-sm mb-6">
                You've reached your free usage limit. Upgrade to the Pro Plan to unlock uninterrupted access to all features.
              </p>

              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mb-6">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-semibold text-slate-900 text-sm">Pro Plan</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Billed monthly</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-bold text-slate-900">$19</span>
                    <span className="text-xs text-slate-500 font-medium">/mo</span>
                  </div>
                </div>
                <ul className="text-sm text-slate-600 space-y-3">
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-indigo-600" /> 
                    <span>Unlimited AI Chat</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-indigo-600" /> 
                    <span>Unlimited AI Tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={14} className="text-indigo-600" /> 
                    <span>Advanced Reasoning Models</span>
                  </li>
                </ul>
              </div>

              <button 
                onClick={handleRazorpayPayment}
                disabled={isProcessing}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium h-11 rounded-lg transition-colors disabled:opacity-70 flex items-center justify-center gap-2 shadow-sm"
              >
                {isProcessing ? "Processing..." : "Upgrade to Pro"}
              </button>
              
              <p className="text-center text-xs text-slate-400 mt-4">
                Secure payment powered by Razorpay
              </p>
            </div>
          </div>
        </div>
      )}
    </UsageContext.Provider>
  )
}

export const useUsage = () => {
  const context = useContext(UsageContext)
  if (context === undefined) {
    throw new Error("useUsage must be used within a UsageProvider")
  }
  return context
}
