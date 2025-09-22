import { DriverDTO } from "../interfaces/drivers.interface";
import { prisma } from "./prisma";

interface DriverFilters {
  search?: string;
  status?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export async function searchDrivers(filters: DriverFilters) {
  const {
    search,
    status,
    sort = "name",
    page = 1,
    limit = 12, // Match grid layout (3x4, 4x3, etc.)
  } = filters;

  const where: any = {};

  // Text search across multiple fields
  if (search) {
    where.OR = [
      { firstname: { contains: search, mode: "insensitive" } },
      { lastname: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { phonenumber: { contains: search } },
      { license: { contains: search, mode: "insensitive" } },
    ];
  }

  // Sort options
  const orderBy: any = {};
  switch (sort) {
    case "name_desc":
      orderBy.firstname = "desc";
      break;
    case "created":
      orderBy.registrationdate = "desc";
      break;
    case "created_asc":
      orderBy.registrationdate = "asc";
      break;
    case "name":
    default:
      orderBy.firstname = "asc";
      break;
  }

  // Pagination calculations
  const skip = (page - 1) * limit;

  // Get drivers and total count in parallel
  const [drivers, totalCount] = await Promise.all([
    prisma.drivers.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    }),
    prisma.drivers.count({ where }),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    drivers,
    totalCount,
    totalPages,
    currentPage: page,
  };
}

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

// common/prisma/drivers.ts
// export async function searchDrivers(query: string) {
//   return prisma.drivers.findMany({
//     where: {
//       is_deleted: false,
//       OR: [
//         { firstname: { contains: query, mode: "insensitive" } },
//         { lastname: { contains: query, mode: "insensitive" } },
//         { email: { contains: query, mode: "insensitive" } },
//         { phonenumber: { contains: query } },
//         { license: { contains: query, mode: "insensitive" } },
//       ],
//     },
//   });
// }
