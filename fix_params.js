const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src/app/(dashboard)/repomind/[repoId]');

function processFile(filePath, isClient) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already fixed
  if (content.includes('await params') || content.includes('React.use(params)')) return;

  if (isClient) {
    // Client Component: add React.use
    if (!content.includes('import * as React')) {
      content = 'import * as React from "react";\n' + content;
    }
    // Replace: export default function RepoChat({ params }: { params: { repoId: string } }) {
    content = content.replace(/export default function (\w+)\(\{\s*params\s*\}\s*:\s*\{\s*params\s*:\s*\{\s*repoId\s*:\s*string\s*\}\s*\}\)\s*\{/, 
      "export default function $1({ params }: { params: Promise<{ repoId: string }> }) {\n  const resolvedParams = React.use(params);\n  const params_repoId = resolvedParams.repoId;");
    
    // Replace all remaining params.repoId with params_repoId
    content = content.replace(/params\.repoId/g, 'params_repoId');

  } else {
    // Server Component: make async and await
    // Replace: export default function RepoDetailLayout({ children, params }: { children: React.ReactNode, params: { repoId: string } }) {
    content = content.replace(/export default function (\w+)\(([^)]*params[^)]*)\)\s*\{/, (match, name, args) => {
      // Modify args to make params a Promise
      let newArgs = args.replace(/params\s*:\s*\{\s*repoId\s*:\s*string\s*\}/, 'params: Promise<{ repoId: string }>');
      return `export default async function ${name}(${newArgs}) {\n  const resolvedParams = await params;\n  const params_repoId = resolvedParams.repoId;`;
    });

    // Replace all remaining params.repoId with params_repoId
    content = content.replace(/params\.repoId/g, 'params_repoId');
  }

  fs.writeFileSync(filePath, content);
  console.log('Fixed:', filePath);
}

// Layout (Server)
processFile(path.join(dir, 'layout.tsx'), false);

// Page (Server)
processFile(path.join(dir, 'page.tsx'), false);

// Architecture (Server)
processFile(path.join(dir, 'architecture/page.tsx'), false);

// PRs (Server)
processFile(path.join(dir, 'pull-requests/page.tsx'), false);

// Security (Server)
processFile(path.join(dir, 'security/page.tsx'), false);

// Chat (Client)
processFile(path.join(dir, 'chat/page.tsx'), true);

