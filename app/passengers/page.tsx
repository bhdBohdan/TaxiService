import { Passenger } from "@/common/interfaces/passengers.interface";
import { getPassengers } from "@/common/prisma/passengers";
import MainHeader from "@/components/mainHeader";
import PassengerItem from "@/components/passenger/PassengerItem";
import Link from "next/link";
import { Suspense } from "react";

// Define the type for a Quiz
interface passenger {
  id: string;
  name: string; // optional if your API returns counts
}

const PASSENGERS: passenger[] = [
  { id: "1234", name: "Bohdan" },
  { id: "12234", name: "Vlad" },
  { id: "121234", name: "Ihor" },
];

async function Passengers() {
  const fetchedPassengers: Passenger[] = await getPassengers();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {fetchedPassengers.map((elem) => (
        <PassengerItem key={elem.passenger_id} passanger={elem} />
      ))}
    </div>
  );
}

export default async function PassengerssPage() {
  //const passengers = await getPassengers();
  //console.log(passengers);

  return (
    <>
      <MainHeader />

      <main className="mt-8 px-10">
        <Suspense
          fallback={
            <p className="text-gray-900 text-lg animate-pulse">
              Fetching passengers...
            </p>
          }
        >
          <Passengers />
        </Suspense>
      </main>
    </>
  );
}
