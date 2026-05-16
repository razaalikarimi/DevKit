const fs = require('fs');
const path = require('path');

const tools = [
  'linkedin-post',
  'code-generator',
  'youtube-script',
  'seo-optimizer',
  'resume-builder',
  'image-prompt'
];

const template = `import { Card } from "@/components/ui/card"

export default function PlaceholderTool() {
  return (
    <div className="p-10 h-full">
      <Card className="p-10 text-center space-y-4">
        <h2 className="text-2xl font-bold">Coming Soon</h2>
        <p className="text-muted-foreground">This tool is currently under development.</p>
      </Card>
    </div>
  )
}
`;

tools.forEach(tool => {
  const dir = path.join(__dirname, 'src/app/(dashboard)/tools', tool);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(path.join(dir, 'page.tsx'), template);
});

console.log('Dummy pages created.');
