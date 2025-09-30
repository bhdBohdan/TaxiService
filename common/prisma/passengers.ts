import { Filters } from "../interfaces/filter.interface";
import { PassengerDTO } from "../interfaces/passengers.interface";
import { prisma } from "./prisma";

export async function searchPassengers(filters: Filters) {
  const {
    search,
    sort = "created",
    isdeleted,
    page = 1,
    limit = 12, // default val
  } = filters;

  const where: any = {};

  // Text search across multiple fields
  where.is_deleted = isdeleted;
  if (search) {
    where.OR = [
      { firstname: { contains: search, mode: "insensitive" } },
      { lastname: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phonenumber: { contains: search } },
    ];
  }

  // Sort options
  const orderBy: any = {};
  switch (sort) {
    case "firstname_desc":
      orderBy.firstname = "desc";
      break;
    case "created":
      orderBy.registrationdate = "desc";
      break;
    case "created_asc":
      orderBy.registrationdate = "asc";
      break;
    case "firstname":
    default:
      orderBy.registrationdate = "asc";
      break;
  }

  // Pagination calculations
  const skip = (page - 1) * limit;

  // Get passengers and total count in parallel
  const [passengers, totalCount] = await Promise.all([
    prisma.passengers.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    }),
    prisma.passengers.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    passengers,
    totalCount,
    totalPages,
    currentPage: page,
  };
}

export async function getPassengers() {
  //await new Promise((resolve) => setTimeout(resolve, 2000)); //delay for loading state
  //throw new Error("Failled");
  return await prisma.passengers.findMany({ where: { is_deleted: false } });
}

export async function getPassengerById(id: number) {
  return await prisma.passengers.findUnique({
    where: { passenger_id: id, is_deleted: false },
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

export async function deletePassenger(id: number) {
  const result = prisma.passengers.update({
    where: { passenger_id: id },
    data: { is_deleted: true },
  });

  return result;
}
