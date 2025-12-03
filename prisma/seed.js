import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seed() {
  await prisma.user.createMany({
    data: [
      {
        email: "admin@example.com",
        username: "admin",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
      },
      {
        email: "user@example.com",
        username: "user",
        password: await bcrypt.hash("user123", 10),
        role: "user",
      },
    ],
    skipDuplicates: true, // optional
  });
  await prisma.item.createMany({
    data: [
      { name: "Item 1" },
      { name: "Item 2" },
      { name: "Item 3" },
      { name: "Item 4" },
      { name: "Item 5" },
    ],
    skipDuplicates: true,
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
