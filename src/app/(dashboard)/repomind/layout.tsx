import { Metadata } from "next";

export const metadata: Metadata = {
  title: "RepoMind AI - Autonomous Repository Intelligence",
  description: "Enterprise-grade autonomous repository intelligence system.",
};

export default function RepoMindLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-background">
      {children}
    </div>
  );
}
