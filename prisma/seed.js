const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { clerkId: "demo-user-id" },
    update: {},
    create: {
      clerkId: "demo-user-id",
      email: "demo@aura.ai",
      name: "Demo Admin",
      plan: "ENTERPRISE",
      credits: 999999
    }
  })
  console.log("Demo user created!")
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
