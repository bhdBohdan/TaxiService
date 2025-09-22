import { DriverDTO } from "../interfaces/drivers.interface";
import { prisma } from "./prisma";

export async function getDrivers() {
  return await prisma.drivers.findMany({ where: { is_deleted: false } });
}

export async function getDriverById(id: number) {
  return await prisma.drivers.findUnique({
    where: { driver_id: id, is_deleted: false },
    include: {
      reviews: {
        include: {
          passengers: true,
        },
      },
    },
  });
}

export async function updateById(id: number, payload: DriverDTO) {
  console.log(payload);

  const result = await prisma.drivers.update({
    where: {
      driver_id: id,
    },
    data: payload,
  });

  return true;
}

export async function create(payload: DriverDTO) {
  const result = await prisma.drivers.create({
    data: payload,
  });

  return result;
}

export async function deleteDriver(id: number) {
  const result = prisma.drivers.update({
    where: { driver_id: id },
    data: { is_deleted: true },
  });

  return result;
}
