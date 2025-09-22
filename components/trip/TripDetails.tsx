import { Trip, TripsFull } from "@/common/interfaces/trips.interface";

export default function TripDetails({ trip }: { trip: TripsFull }) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">Id: {trip.trip_id}</h1>

      <h1 className="text-3xl font-bold mb-2">DriverId : {trip.driver_id}</h1>

      <p className="text-gray-700 mb-4">StartId: {trip.startaddressid}</p>
      <p className="text-gray-700 mb-4">EndId: {trip.endaddressid}</p>

      <p className="text-gray-700 mb-4">
        Start at: {trip.startdatetime?.toISOString()}
      </p>

      <p className="text-gray-700 mb-4">
        End at: {trip.enddatetime?.toISOString()}
      </p>

      <div className="text-gray-700 mb-4 p-6 bg-stone-200 rounded-b-sm">
        Passengers :{" "}
        {trip.trips_passengers?.map((elem) => (
          <p key={elem.trip_id}>
            {elem.passengers.firstname} {elem.passengers.lastname}
          </p>
        ))}
      </div>
    </>
  );
}
