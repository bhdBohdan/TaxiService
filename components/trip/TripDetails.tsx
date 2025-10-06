import { Trip, TripsFull } from "@/common/interfaces/trips.interface";
import Link from "next/link";

export default function TripDetails({ trip }: { trip: TripsFull }) {
  const start_Address = trip.addresses_trips_startaddressidToaddresses;
  const end_Address = trip.addresses_trips_endaddressidToaddresses;

  return (
    <>
      <h1 className="text-2xl font-bold mb-2">Id: {trip.trip_id}</h1>

      <h1 className="text-3xl font-bold mb-2">
        Driver :{" "}
        <Link
          href={`/drivers/${trip.driver_id}`}
          className="text-blue-600 hover:text-blue-900 font-bold"
        >
          {trip.drivers?.firstname} {trip.drivers?.lastname ?? "— (no driver)"}
        </Link>
      </h1>

      <p className="text-gray-700 mb-4">
        Start Address: {start_Address.city} {start_Address.street}{" "}
        {start_Address.building}
      </p>
      <p className="text-gray-700 mb-4">
        End Address: {end_Address.city} {end_Address.street}{" "}
        {end_Address.building}
      </p>

      <p className="text-gray-700 mb-4">
        Start at: {trip.startdatetime?.toUTCString()}
      </p>

      <p className="text-gray-700 mb-4">
        End at: {trip.enddatetime?.toLocaleString()}
      </p>

      <div className="text-gray-700 mb-4 p-6 bg-stone-200 rounded-b-sm flex flex-col">
        Passengers :{" "}
        {trip.trips_passengers?.map((elem) => (
          <Link
            key={elem.passenger_id}
            href={`/drivers/${elem.passenger_id}`}
            className="ml-2 text-blue-600 hover:text-blue-900 font-bold"
          >
            {elem.passengers.firstname} {elem.passengers.lastname}
          </Link>
        ))}
      </div>
    </>
  );
}
