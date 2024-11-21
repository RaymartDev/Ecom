import { PrismaClient } from '@prisma/client';

// Create a single Prisma Client instance to be reused throughout the app
const prisma = new PrismaClient();

// Handle clean shutdown of the Prisma Client during app termination
process.on('SIGINT', async () => {
  console.log('Closing Prisma Client...');
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('Closing Prisma Client...');
  await prisma.$disconnect();
  process.exit(0);
});

export default prisma;