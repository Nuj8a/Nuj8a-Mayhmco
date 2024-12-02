import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const validRoles = [1, 2, 3, 4];

  const role = 4;

  if (!validRoles.includes(role)) {
    throw new Error('Invalid role. Allowed roles are: 1, 2, 3, 4.');
  }

  const existingSuperadmin = await prisma.admin.findUnique({
    where: {
      email: 'gaurab@gmail.com'
    }
  });

  if (!existingSuperadmin) {
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash('1234567890', salt);

    await prisma.admin.create({
      data: {
        name: 'Gaurab Sunar',
        email: 'gaurab@gmail.com',
        passwordHash: hashedPassword,
        phoneNumber: '9810325922',
        role: 4,
        status: 'active',
        verified: true
      }
    });

    console.log('Developer user created!');
  } else {
    console.log('Developer already exists.');
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
