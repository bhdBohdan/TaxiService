import { prisma } from "../lib/prisma";

export async function getPassengers() {
  //await new Promise((resolve) => setTimeout(resolve, 2000)); //delay for loading state
  //throw new Error("Failled");
  return await prisma.passengers.findMany();
}

export async function getPassengerById(id: number) {
  return await prisma.passengers.findUnique({
    where: { passenger_id: id },
    include: {
      trips_passengers: { include: { trips: true } },
    },
  });
}
