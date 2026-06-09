import React from "react";

// Client-side mocks
export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useUser() {
  return {
    isSignedIn: true,
    isLoaded: true,
    user: {
      id: "demo-user-id",
      fullName: "Admin User",
      imageUrl: "https://github.com/shadcn.png",
      primaryEmailAddress: { emailAddress: "demo@example.com" },
    },
  };
}

export function UserButton() {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-primary/30">
        A
      </div>
    </div>
  );
}

export function SignInButton({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function SignUpButton({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function SignIn() {
  return (
    <div className="p-8 border border-border bg-white rounded-xl shadow-lg space-y-4 max-w-sm w-full text-center">
      <h2 className="text-xl font-bold">Sign In (Mocked)</h2>
      <p className="text-sm text-muted-foreground">This is a mock authentication page for offline local testing.</p>
    </div>
  );
}

export function SignUp() {
  return (
    <div className="p-8 border border-border bg-white rounded-xl shadow-lg space-y-4 max-w-sm w-full text-center">
      <h2 className="text-xl font-bold">Sign Up (Mocked)</h2>
      <p className="text-sm text-muted-foreground">This is a mock authentication page for offline local testing.</p>
    </div>
  );
}

// Server-side mocks
export const auth = async () => {
  return {
    userId: "demo-user-id",
    sessionClaims: {},
  };
};

export function clerkMiddleware(handler?: any) {
  return async (req: any, event: any) => {
    // Return a dummy resolver/middleware response
    return;
  };
}

export function createRouteMatcher(routes: string[]) {
  return (req: any) => false;
}
