import { Trip } from "@/common/interfaces/trips.interface";
import Link from "next/link";

// Define the type for a pass

export default function TripItem({ trip }: { trip: Trip }) {
  return (
    <Link href={`/trips/${trip.trip_id}`}>
      <div className="bg-blue-100 shadow-md rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 overflow-x-hidden">
        <h2>{trip.trip_id}</h2>
        <p className="text-2xl font-bold md:text-xl">
          {trip.enddatetime?.toISOString() || "now"}
        </p>
      </div>
    </Link>
  );
}
