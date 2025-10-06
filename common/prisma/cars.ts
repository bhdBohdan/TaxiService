import { CarDTO } from "../interfaces/cars.interface";
import { Filters } from "../interfaces/filter.interface";
import { prisma } from "./prisma";
import { unstable_noStore as noStore } from "next/cache";

export async function searchCars(filters: Filters) {
  const {
    search,
    sort = "sign_number",
    make,
    page = 1,
    limit = 12, // default val
  } = filters;

  const where: any = {};

  if (make) {
    where.make = { contains: make, mode: "insensitive" };
  }
  // Text search across multiple fields
  if (search) {
    where.OR = [
      { model: { contains: search, mode: "insensitive" } },
      { make: { contains: search, mode: "insensitive" } },
      { sign_number: { contains: search, mode: "insensitive" } },
    ];
  }

  // Sort options
  const orderBy: any = {};
  switch (sort) {
    case "sign_number":
      orderBy.sign_number = "desc";
      break;
    case "model":
      orderBy.model = "desc";
      break;
    case "model_asc":
      orderBy.model = "asc";
      break;
    case "sign_number_asc":
    default:
      orderBy.sign_number = "asc";
      break;
  }

  // Pagination calculations
  const skip = (page - 1) * limit;

  // Get cars and total count in parallel
  const [cars, totalCount] = await Promise.all([
    prisma.cars.findMany({
      where,
      orderBy,
      skip,
      take: limit,
      include: {
        drivers: true,
      },
    }),
    prisma.cars.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    cars,
    totalCount,
    totalPages,
    currentPage: page,
  };
}

export async function getCars() {
  return await prisma.cars.findMany({
    include: {
      drivers: true,
    },
  });
}

export async function getCarById(id: number) {
  noStore();
  return await prisma.cars.findUnique({
    where: { car_id: id },
    include: {
      drivers: true,
    },
  });
}

export async function updateById(id: number, payload: CarDTO) {
  console.log(payload);

  const result = await prisma.cars.update({
    where: {
      car_id: id,
    },
    data: payload,
  });

  return true;
}

export async function create(payload: CarDTO) {
  const result = await prisma.cars.create({
    data: payload,
  });

  return result;
}

export async function deleteCar(id: number) {
  const result = prisma.cars.delete({
    where: { car_id: id },
  });

  return result;
}
