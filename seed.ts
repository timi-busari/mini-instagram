import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const logger = new Logger('SeedScript');

async function main() {
  try {
    logger.log('Seeding database with sample data...');

    // Create users
    const user1 = await prisma.user.create({
      data: {
        username: 'timi_busari',
        email: 'timi@example.com',
        password: 'password123',
      },
    });

    logger.log(`Created user: ${user1.username}`);

    const user2 = await prisma.user.create({
      data: {
        username: 'gina_brace',
        email: 'gina@example.com',
        password: 'password456',
      },
    });

    logger.log(`Created user: ${user2.username}`);

    // Create 10 posts for user1
    for (let i = 1; i <= 10; i++) {
      await prisma.post.create({
        data: {
          caption: `Post ${i} by Timi`,
          imageUrl: `https://example.com/image${i}.jpg`,
          userId: user1.id,
        },
      });
      logger.log(`Created post ${i} for Timi`);
    }

    // Create 10 posts for user2
    for (let i = 1; i <= 10; i++) {
      await prisma.post.create({
        data: {
          caption: `Post ${i} by Gina`,
          imageUrl: `https://example.com/image${i + 10}.jpg`,
          userId: user2.id,
        },
      });
      logger.log(`Created post ${i} for Gina`);
    }

    logger.log('Sample data created successfully');
  } catch (error) {
    logger.error('An error occurred while seeding the database', error);
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    logger.error('An unexpected error occurred', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
