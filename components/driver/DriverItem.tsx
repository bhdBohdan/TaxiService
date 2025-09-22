import { Driver } from "@/common/interfaces/drivers.interface";
import Link from "next/link";

// Define the type for a pass

export default function DriverItem({ driver }: { driver: Driver }) {
  return (
    <Link href={`/drivers/${driver.driver_id}`}>
      <div className="bg-blue-100 shadow-md rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 overflow-x-hidden">
        <p className="text-2xl font-bold md:text-xl">
          {driver.firstname} {driver.lastname}
        </p>
        <p className="text-xl font-light">{driver.email}</p>
      </div>
    </Link>
  );
}
