"use client"

import { use } from "react"
import { Printer, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function InvoicePage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ amount: string, date: string, plan: string }> }) {
  const unwrappedParams = use(params)
  const unwrappedSearch = use(searchParams)
  
  const id = unwrappedParams.id
  const amount = unwrappedSearch.amount || "$19"
  const date = unwrappedSearch.date || new Date().toLocaleDateString()
  const plan = unwrappedSearch.plan || "Pro Plan"

  return (
    <div className="h-full overflow-y-auto min-h-screen bg-slate-50 py-10 px-4 md:px-10 font-sans text-slate-900">
      <div className="max-w-3xl mx-auto">
        
        {/* Controls (Hidden when printing) */}
        <div className="flex items-center justify-between mb-8 print:hidden">
          <Button variant="ghost" onClick={() => window.close()} className="text-slate-500">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
          </Button>
          <Button onClick={() => window.print()} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Printer className="mr-2 h-4 w-4" /> Save as PDF
          </Button>
        </div>
        
        {/* Invoice Paper */}
        <div className="bg-white p-10 md:p-16 shadow-lg border border-slate-200">
          <div className="flex justify-between items-start mb-16">
            <div>
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-6">
                <span className="text-white font-black text-2xl">D</span>
              </div>
              <h1 className="text-4xl font-light text-slate-900 tracking-tight">INVOICE</h1>
              <p className="text-slate-500 mt-2 text-sm font-medium">#{id}</p>
            </div>
            <div className="text-right text-sm text-slate-500 space-y-1">
              <h3 className="font-bold text-slate-900 text-base mb-2">DevKit AI Platform</h3>
              <p>123 Innovation Drive</p>
              <p>San Francisco, CA 94103</p>
              <p>billing@devkit.io</p>
            </div>
          </div>

          <div className="flex justify-between mb-16 border-b border-slate-100 pb-10">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Billed To</h3>
              <p className="font-semibold text-slate-900">DevKit User</p>
              <p className="text-sm text-slate-500">user@devkit.io</p>
            </div>
            <div className="text-right">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Date Issued</h3>
              <p className="font-medium text-slate-900">{date}</p>
              <p className="text-sm font-bold text-emerald-600 mt-1 uppercase tracking-widest">Paid via Razorpay</p>
            </div>
          </div>

          <table className="w-full text-left mb-16">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-widest">
                <th className="pb-4">Description</th>
                <th className="pb-4 text-center">Period</th>
                <th className="pb-4 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-6">
                  <p className="font-semibold text-slate-900 mb-1">DevKit Subscription - {plan}</p>
                  <p className="text-xs text-slate-500">Access to AI models, priority compute, and premium features.</p>
                </td>
                <td className="py-6 text-center text-sm text-slate-600">1 Month</td>
                <td className="py-6 text-right font-medium text-slate-900">{amount}</td>
              </tr>
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between text-sm text-slate-500 mb-3">
                <span>Subtotal</span>
                <span>{amount}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-500 mb-3">
                <span>Tax (0%)</span>
                <span>$0.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-slate-900 border-t border-slate-200 pt-3">
                <span>Total</span>
                <span>{amount}</span>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-8 border-t border-slate-100 text-center text-xs text-slate-400">
            <p>Thank you for doing business with DevKit AI.</p>
            <p>If you have any questions regarding this invoice, please contact support@devkit.io</p>
          </div>
        </div>
        
      </div>
    </div>
  )
}
