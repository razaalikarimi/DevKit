const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const userId = "demo-user-id"
  
  // Create demo user if it doesn't exist
  const user = await prisma.user.upsert({
    where: { id: userId },
    update: {},
    create: {
      id: userId,
      email: "demo@aura-ai.com",
      clerkId: "demo-clerk-id",
      name: "Admin User",
      updatedAt: new Date()
    }
  })
  
  console.log("Demo user created/verified:", user.id)

  // Create a default workspace
  const workspace = await prisma.workspace.upsert({
    where: { slug: "default" },
    update: {},
    create: {
      id: "default-workspace-id",
      name: "Default Workspace",
      slug: "default",
      inviteCode: Math.random().toString(36).substring(7),
      updatedAt: new Date()
    }
  })
  console.log("Default workspace created/verified:", workspace.id)

  // Add user to workspace
  await prisma.workspaceMember.upsert({
    where: { userId_workspaceId: { userId, workspaceId: workspace.id } },
    update: {},
    create: {
      id: "demo-member-id",
      userId,
      workspaceId: workspace.id,
      role: "ADMIN",
      updatedAt: new Date()
    }
  })
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
