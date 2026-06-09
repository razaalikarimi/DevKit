import { SignUp } from "@/lib/mock-clerk";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50">
      <SignUp />
    </div>
  );
}
