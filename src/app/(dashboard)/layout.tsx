import { Sidebar } from "@/components/chat/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#030303]">
      <Sidebar />
      <main className="flex-1 h-full overflow-hidden">
        {children}
      </main>
    </div>
  )
}
