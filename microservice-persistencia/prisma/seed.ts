import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: { username: "alice", email: "alice@gmail.com", age: 18, city: "Medellin", photoUrl: "https://randomuser.me/api/portraits/women/56.jpg" },
  });

  const user2 = await prisma.user.create({
    data: { username: "harry", email: "harry@gmail.com", age: 27, city: "Bogotá", photoUrl: "https://randomuser.me/api/portraits/men/52.jpg" },
  });

  await prisma.post.createMany({
    data: [
      { content: "Primera publicación de alice", likes: 10, userId: user1.id },
      { content: "Segunda publicación de alice", likes: 5, userId: user1.id },
      { content: "Primera publicación de harry", likes: 3, userId: user2.id },
      { content: "Segunda publicación de harry", likes: 8, userId: user2.id },
    ],
  });

  console.log("Datos insertados!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
