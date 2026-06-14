import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center w-full">
      <SignIn appearance={{ elements: { rootBox: "mx-auto w-full", card: "shadow-none bg-transparent" } }} />
    </div>
  );
}
