import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GitBranch, GitMerge, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function PRReviewPage() {
  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <GitMerge className="h-8 w-8" />
          Pull Request Reviews
        </h1>
        <p className="text-muted-foreground mt-1">Autonomous PR analysis and code reviews.</p>
      </div>
      <div className="grid gap-4">
        {[
          { pr: "#42", title: "feat: implement bullmq worker", status: "Review Complete", issues: 0 },
          { pr: "#41", title: "fix: update stripe webhook", status: "Changes Requested", issues: 2 },
          { pr: "#40", title: "refactor: clean up dashboard", status: "Reviewing...", issues: 0 },
        ].map((pr, i) => (
          <Card key={i} className="bg-background/60 backdrop-blur-sm border-white/10 hover:bg-accent/50 cursor-pointer transition-colors">
            <CardHeader className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GitBranch className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <CardTitle className="text-lg">
                      <span className="text-muted-foreground font-normal mr-2">{pr.pr}</span>
                      {pr.title}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <span className="flex items-center gap-1">
                        {pr.status === 'Reviewing...' ? <Clock className="h-3 w-3 animate-spin" /> : null}
                        {pr.status}
                      </span>
                      {pr.issues > 0 && <span className="text-rose-500 font-medium">{pr.issues} risks found</span>}
                    </CardDescription>
                  </div>
                </div>
                <Badge variant={pr.status === 'Review Complete' ? 'default' : pr.status === 'Reviewing...' ? 'secondary' : 'destructive'}>
                  {pr.status}
                </Badge>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
