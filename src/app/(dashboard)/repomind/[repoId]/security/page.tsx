import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SecurityPage() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-rose-500 flex items-center gap-2">
            <ShieldAlert className="h-8 w-8" />
            Security Audit
          </h1>
          <p className="text-muted-foreground mt-1">Vulnerabilities and hardcoded secrets detected by the Security Agent.</p>
        </div>
        <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Download Report</Button>
      </div>
      <div className="grid gap-4">
        {[
          { title: "Hardcoded API Key in Stripe Webhook", severity: "High", file: "src/app/api/stripe/route.ts:12" },
          { title: "Outdated NextAuth dependency", severity: "Medium", file: "package.json:24" },
          { title: "Insecure JWT parsing", severity: "Low", file: "src/lib/auth.ts:45" },
        ].map((vuln, i) => (
          <Card key={i} className="bg-background/60 backdrop-blur-sm border-rose-500/20">
            <CardHeader className="py-4">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg text-rose-400">{vuln.title}</CardTitle>
                  <CardDescription className="font-mono text-xs mt-1">{vuln.file}</CardDescription>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${vuln.severity === 'High' ? 'bg-rose-500/20 text-rose-500' : vuln.severity === 'Medium' ? 'bg-amber-500/20 text-amber-500' : 'bg-blue-500/20 text-blue-500'}`}>
                  {vuln.severity}
                </span>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
