"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GitPullRequest, RefreshCcw, Loader2, PlayCircle } from "lucide-react";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

export default function PRReviewsPage() {
  const params = useParams<{ repoId: string }>();
  const repoId = params?.repoId || "";
  
  const [loadingPRs, setLoadingPRs] = useState(false);
  const [prs, setPrs] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const [reviewingId, setReviewingId] = useState<number | null>(null);
  const [reviews, setReviews] = useState<Record<number, string>>({});
  
  const fetchPRs = async () => {
    setLoadingPRs(true);
    setError(null);
    try {
      const response = await fetch(`/api/repomind/pr-review?repoId=${repoId}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch PRs");
      }
      
      setPrs(data.prs || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingPRs(false);
    }
  };

  const runReview = async (prNumber: number) => {
    setReviewingId(prNumber);
    try {
      const response = await fetch("/api/repomind/pr-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ repoId, prNumber }),
      });
      
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to run review");
      }
      
      setReviews(prev => ({ ...prev, [prNumber]: data.review }));
    } catch (err: any) {
      setReviews(prev => ({ ...prev, [prNumber]: `**Error:** ${err.message}` }));
    } finally {
      setReviewingId(null);
    }
  };

  useEffect(() => {
    if (repoId) {
      fetchPRs();
    }
  }, [repoId]);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-slate-900 tracking-tight flex items-center gap-2">
            <GitPullRequest className="h-8 w-8 text-teal-500" />
            AI PR Reviews
          </h1>
          <p className="text-slate-500 mt-1">
            Analyze open Pull Requests for bugs, performance, and best practices.
          </p>
        </div>
        <Button onClick={fetchPRs} disabled={loadingPRs} variant="outline">
          {loadingPRs ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCcw className="mr-2 h-4 w-4" />}
          Refresh PRs
        </Button>
      </div>

      <div className="grid gap-6">
        {error && (
           <Card className="bg-red-50 border-red-200 shadow-sm">
              <CardContent className="p-6 text-red-600">
                 <p className="font-semibold">Error Fetching PRs</p>
                 <p className="text-sm">{error}</p>
              </CardContent>
           </Card>
        )}
        
        {loadingPRs ? (
           <Card className="bg-white border-slate-200 shadow-sm">
             <CardContent className="flex flex-col items-center justify-center h-[200px] text-slate-500 space-y-4">
               <Loader2 className="h-8 w-8 animate-spin text-teal-500" />
               <p>Fetching open pull requests from GitHub...</p>
             </CardContent>
           </Card>
        ) : prs.length === 0 && !error ? (
           <Card className="bg-white border-slate-200 shadow-sm">
             <CardContent className="flex flex-col items-center justify-center h-[200px] text-slate-500 space-y-4">
               <GitPullRequest className="h-12 w-12 text-slate-200" />
               <p>No open Pull Requests found for this repository.</p>
             </CardContent>
           </Card>
        ) : (
           prs.map((pr) => (
             <Card key={pr.number} className="bg-white border-slate-200 shadow-sm overflow-hidden">
               <CardHeader className="bg-slate-50 border-b border-slate-100 flex flex-row justify-between items-start">
                 <div>
                   <CardTitle className="text-lg flex items-center gap-2">
                     #{pr.number} {pr.title}
                   </CardTitle>
                   <CardDescription className="mt-1">
                     Opened by <span className="font-medium text-slate-700">{pr.user.login}</span>
                   </CardDescription>
                 </div>
                 <Button 
                   onClick={() => runReview(pr.number)} 
                   disabled={reviewingId === pr.number} 
                   className="bg-teal-600 hover:bg-teal-700 shrink-0"
                 >
                   {reviewingId === pr.number ? (
                     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                   ) : (
                     <PlayCircle className="mr-2 h-4 w-4" />
                   )}
                   Run AI Review
                 </Button>
               </CardHeader>
               
               {reviews[pr.number] && (
                 <CardContent className="p-6 bg-slate-900 text-slate-100">
                   <div className="prose prose-sm prose-invert max-w-none">
                     <ReactMarkdown
                       components={{
                         h1: ({node, ...props}) => <h1 className="text-xl font-bold text-teal-400 mb-4" {...props} />,
                         h2: ({node, ...props}) => <h2 className="text-lg font-bold text-teal-300 mt-6 mb-3" {...props} />,
                         h3: ({node, ...props}) => <h3 className="text-base font-semibold text-teal-200 mt-4 mb-2" {...props} />,
                         ul: ({node, ...props}) => <ul className="list-disc ml-5 mb-4 space-y-1 text-slate-300" {...props} />,
                         ol: ({node, ...props}) => <ol className="list-decimal ml-5 mb-4 space-y-1 text-slate-300" {...props} />,
                         li: ({node, ...props}) => <li {...props} />,
                         p: ({node, ...props}) => <p className="mb-4 text-slate-300 leading-relaxed" {...props} />,
                         strong: ({node, ...props}) => <strong className="font-semibold text-white" {...props} />,
                         code: ({node, inline, ...props}: any) => 
                           inline 
                             ? <code className="bg-slate-800 text-teal-300 px-1.5 py-0.5 rounded text-xs font-mono" {...props} />
                             : <pre className="bg-black/50 p-4 rounded-lg my-4 overflow-x-auto text-xs font-mono border border-slate-800 text-slate-300"><code {...props} /></pre>
                       }}
                     >
                       {reviews[pr.number]}
                     </ReactMarkdown>
                   </div>
                 </CardContent>
               )}
             </Card>
           ))
        )}
      </div>
    </div>
  );
}
