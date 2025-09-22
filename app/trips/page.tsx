import { Trip } from "@/common/interfaces/trips.interface";
import { getTrips } from "@/common/prisma/trips";
import MainHeader from "@/components/CustomHeader";
import TripItem from "@/components/trip/TripItem";
import Link from "next/link";
import { Suspense } from "react";

async function Trips() {
  const fetchedTrips: Trip[] = await getTrips();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {fetchedTrips.map((elem, i) => (
        <TripItem key={i} trip={elem} />
      ))}
    </div>
  );
}

export default async function TripsPage() {
  //const trips = await getTrips();
  //console.log(trips);

  return (
    <>
      <MainHeader name="Trips" route="trips" />

      <main className="mt-8 px-10">
        <Suspense
          fallback={
            <p className="text-gray-900 text-lg animate-pulse">
              Fetching trips...
            </p>
          }
        >
          <Trips />
        </Suspense>
      </main>
    </>
  );
}
