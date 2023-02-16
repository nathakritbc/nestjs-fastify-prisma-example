import { PrismaClient } from '@prisma/client';
import { users } from './seeds/users.seed';

const prisma = new PrismaClient();

async function main() {
  await prisma.users.createMany({ data: users });
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
