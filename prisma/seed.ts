import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding passengers...");

  // Insert passengers
  await prisma.passengers.createMany({
    data: [
      {
        firstname: "Rose",
        lastname: "Robinson",
        email: "rose.robinson@example.com",
        phonenumber: "555-0020",
      },
      {
        firstname: "Sam",
        lastname: "Clark",
        email: "sam.clark@example.com",
        phonenumber: "555-0021",
      },
      {
        firstname: "Tina",
        lastname: "Rodriguez",
        email: "tina.rodriguez@example.com",
        phonenumber: "555-0022",
      },
      {
        firstname: "Uma",
        lastname: "Lewis",
        email: "uma.lewis@example.com",
        phonenumber: "555-0023",
      },
      {
        firstname: "Victor",
        lastname: "Lee",
        email: "victor.lee@example.com",
        phonenumber: "555-0024",
      },
      {
        firstname: "Wendy",
        lastname: "Walker",
        email: "wendy.walker@example.com",
        phonenumber: "555-0025",
      },
    ],
    skipDuplicates: true, // skip if email/phonenumber already exists
  });

  console.log("Seeding drivers...");

  // Insert drivers
  await prisma.drivers.createMany({
    data: [
      {
        firstname: "Adam",
        lastname: "King",
        email: "adam.king@example.com",
        phonenumber: "555-0101",
        license: "LIC-1001",
      },
      {
        firstname: "Bella",
        lastname: "Scott",
        email: "bella.scott@example.com",
        phonenumber: "555-0102",
        license: "LIC-1002",
      },
      {
        firstname: "Chris",
        lastname: "Young",
        email: "chris.young@example.com",
        phonenumber: "555-0103",
        license: "LIC-1003",
      },
      {
        firstname: "Diana",
        lastname: "Allen",
        email: "diana.allen@example.com",
        phonenumber: "555-0104",
        license: "LIC-1004",
      },
      {
        firstname: "Ethan",
        lastname: "Perez",
        email: "ethan.perez@example.com",
        phonenumber: "555-0105",
        license: "LIC-1005",
      },
      {
        firstname: "Fiona",
        lastname: "Hall",
        email: "fiona.hall@example.com",
        phonenumber: "555-0106",
        license: "LIC-1006",
      },
    ],
    skipDuplicates: true, // skip if unique fields already exist
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
