import { Passenger } from "@/common/interfaces/passengers.interface";
import Link from "next/link";

// Define the type for a pass

export default function PassengerItem({ passanger }: { passanger: Passenger }) {
  return (
    <Link href={`/passengers/${passanger.passenger_id}`}>
      <div className="bg-blue-100 shadow-md rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 overflow-x-hidden">
        <p className="text-2xl font-bold md:text-xl">
          {passanger.firstname} {passanger.lastname}
        </p>
        <p className="text-xl font-light">{passanger.email}</p>
      </div>
    </Link>
  );
}
