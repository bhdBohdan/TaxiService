import { Trip, TripDTO } from "../interfaces/trips.interface";
import { prisma } from "./prisma";

export async function getTrips() {
  return await prisma.trips.findMany({ where: { is_deleted: false } });
}

export async function getTripById(id: number) {
  return await prisma.trips.findUnique({
    where: { trip_id: id, is_deleted: false },
    include: { trips_passengers: { include: { passengers: true } } },
  });
}

// export async function updateById(id: number, payload: TripDTO) {
//   console.log(payload);

//   await prisma.trips.update({
//     where: {
//       trip_id: id,
//     },
//     data: payload,
//   });

//   //idk how but id need update passengers
//   await prisma.trips_passengers.update({
//     where: {trip_id: id},

//     data: {passenger_id: payload.passenger_ids[0]}
//   })

//   return true;
// }

export async function create(payload: TripDTO) {
  const { driver_id, passenger_ids, endaddressid, startaddressid } = payload;

  const result = await prisma.trips.create({
    data: { driver_id, endaddressid, startaddressid },
  });

  await Promise.all(
    passenger_ids.map((pass_id) =>
      prisma.trips_passengers.create({
        data: { trip_id: result.trip_id, passenger_id: pass_id },
      })
    )
  );

  return result;
}

export async function createRaw(payload: TripDTO) {
  const { driver_id, passenger_ids, endaddressid, startaddressid } = payload;

  try {
    await prisma.$transaction(async (tx) => {
      const [trip] = await tx.$queryRaw<{ trip_id: number }[]>`
    INSERT INTO trips (driver_id, endaddressid, startaddressid)
    VALUES (${driver_id}, ${endaddressid}, ${startaddressid})
    RETURNING trip_id;
  `;

      await Promise.all(
        passenger_ids.map(
          (pass_id) =>
            tx.$executeRaw`
        INSERT INTO trips_passengers (trip_id, passenger_id)
        VALUES (${trip.trip_id}, ${pass_id});
      `
        )
      );
    });
  } catch (error: any) {
    throw new Error(
      `Could not create trip. Transaction failed bcause: ${error?.message}`
    );
  }
}

export async function deleteTrip(id: number) {
  const result = prisma.trips.update({
    where: { trip_id: id },
    data: { is_deleted: true },
  });

  return result;
}

export async function endTrip(id: number) {
  const result = prisma.trips.update({
    where: { trip_id: id },
    data: { enddatetime: new Date() },
  });

  return result;
}
