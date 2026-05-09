const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function check() {
  const users = await prisma.user.findMany()
  console.log("Users in DB:", users)
}

check()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect())
