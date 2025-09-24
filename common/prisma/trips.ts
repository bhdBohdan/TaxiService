import { TripDTO } from "../interfaces/trips.interface";
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

export async function deleteTrip(id: number) {
  const result = prisma.trips.update({
    where: { trip_id: id },
    data: { is_deleted: true },
  });

  return result;
}
