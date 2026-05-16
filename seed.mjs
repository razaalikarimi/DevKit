import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.upsert({
    where: { id: "demo-user-id" },
    update: {},
    create: {
      id: "demo-user-id",
      email: "demo@example.com",
      name: "Admin User",
      clerkId: "demo-clerk-id",
    }
  });
  console.log("Database seeded successfully.");
}

main().catch(e => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
