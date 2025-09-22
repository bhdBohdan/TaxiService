import { Driver } from "@/common/interfaces/drivers.interface";
import { getDrivers } from "@/common/prisma/drivers";
import MainHeader from "@/components/CustomHeader";
import DriverItem from "@/components/driver/DriverItem";
import Link from "next/link";
import { Suspense } from "react";

async function Drivers() {
  const fetchedDrivers: Driver[] = await getDrivers();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {fetchedDrivers.map((elem) => (
        <DriverItem key={elem.driver_id} driver={elem} />
      ))}
    </div>
  );
}

export default async function DriversPage() {
  //const drivers = await getDrivers();
  //console.log(drivers);

  return (
    <>
      <MainHeader name="Drivers" route="drivers" />

      <main className="mt-8 px-10">
        <Suspense
          fallback={
            <p className="text-gray-900 text-lg animate-pulse">
              Fetching drivers...
            </p>
          }
        >
          <Drivers />
        </Suspense>
      </main>
    </>
  );
}
