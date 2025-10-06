import {
  Passenger,
  PassengerFull,
} from "@/common/interfaces/passengers.interface";
import Link from "next/link";

export default function PassengerDetails({
  passenger,
}: {
  passenger: PassengerFull;
}) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">Id: {passenger.passenger_id}</h1>

      <h1 className="text-3xl font-bold mb-2">{passenger.firstname}</h1>
      <h1 className="text-3xl font-bold mb-2">{passenger.lastname}</h1>

      <p className="text-gray-700 mb-4">Email: {passenger.email}</p>
      <p className="text-gray-700 mb-4">Phone: {passenger.phonenumber}</p>

      <p className="text-gray-700 mb-4">
        Registartion date: {passenger.registrationdate?.toISOString()}
      </p>

      <p className="text-gray-700 mb-4">
        Updated at: {passenger.updated_at?.toISOString()}
      </p>

      <div className="text-gray-700 mb-4 p-6 bg-stone-200 rounded-b-sm">
        Trips :{" "}
        {passenger.trips_passengers?.map((elem) => (
          <p key={elem.trip_id} className="ml-5">
            At :
            <Link
              href={`/trips/${elem.trip_id}`}
              className="text-blue-600 hover:text-blue-900 font-bold"
            >
              {elem.trips.startdatetime.toLocaleDateString() + " "}
              See details
            </Link>
          </p>
        ))}
      </div>
    </>
  );
}
