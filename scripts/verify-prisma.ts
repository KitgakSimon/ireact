import { prisma } from '../lib/prisma';

async function verify() {
  try {
    // Run a simple query to verify the connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Connected');
  } catch (error) {
    console.error('Failed to connect to Prisma Postgres:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

verify();
