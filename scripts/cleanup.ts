import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function cleanup() {
  console.log("Finding conversations with no messages...")
  
  // Find conversations that have no messages
  const emptyConversations = await prisma.conversation.findMany({
    where: {
      messages: {
        none: {}
      }
    }
  })

  console.log(`Found ${emptyConversations.length} empty conversations. Deleting...`)

  if (emptyConversations.length > 0) {
    const ids = emptyConversations.map(c => c.id)
    const result = await prisma.conversation.deleteMany({
      where: {
        id: { in: ids }
      }
    })
    console.log(`Deleted ${result.count} empty conversations!`)
  }

  await prisma.$disconnect()
}

cleanup().catch(e => {
  console.error(e)
  prisma.$disconnect()
  process.exit(1)
})
