import { prisma } from '../lib/prisma';

async function main() {
  console.log('Seeding database...');
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin User',
      password: 'hashed-password-here',
      role: 'ADMIN',
    },
  });

  const post = await prisma.post.upsert({
    where: { slug: 'hello-world' },
    update: {},
    create: {
      title: 'Hello World',
      slug: 'hello-world',
      content: 'This is a seeded post.',
      authorId: user.id,
      published: true,
    },
  });

  console.log('Database seeded successfully!', { user, post });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
