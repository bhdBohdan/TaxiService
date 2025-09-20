import { PassengerDTO } from "../interfaces/passengers.interface";
import { prisma } from "./prisma";

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

export async function updateById(id: number, payload: PassengerDTO) {
  console.log(payload);

  const result = await prisma.passengers.update({
    where: {
      passenger_id: id,
    },
    data: payload,
  });

  return true;
}

export async function create(payload: PassengerDTO) {
  const result = await prisma.passengers.create({
    data: payload,
  });

  return result;
}

export async function hardDelPass(id: number) {
  const result = await prisma.passengers.delete({
    where: { passenger_id: id },
  });

  return result;
}
