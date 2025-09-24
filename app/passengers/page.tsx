import { SearchProps, PageProps } from "@/common/interfaces/filter.interface";
import { Passenger } from "@/common/interfaces/passengers.interface";
import { getPassengers, searchPassengers } from "@/common/prisma/passengers";
import MainHeader from "@/components/CustomHeader";
import Filters from "@/components/Filter";
import Pagination from "@/components/Pagination";
import PassengerItem from "@/components/passenger/PassengerItem";
import Link from "next/link";
import { Suspense } from "react";

async function Passengers({ searchParams }: SearchProps) {
  const params = await searchParams;
  const filters = {
    search: params.search,
    sort: params.sort || "firstname",
    page: params.page ? parseInt(params.page) : 1,
    isdeleted: params.isdeleted === "true",
    limit: 12,
  };

  const { passengers, totalCount, totalPages, currentPage } =
    await searchPassengers(filters);
  return (
    <>
      <div className="mb-6">
        <Filters route="passengers" />
      </div>

      <div className="mb-4 text-sm text-gray-600">
        Showing {(currentPage - 1) * 12 + 1} to{" "}
        {Math.min(currentPage * 12, totalCount)} of {totalCount} drivers
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {passengers.map((elem) => (
          <PassengerItem key={elem.passenger_id} passanger={elem} />
        ))}
      </div>

      {/* No Results */}
      {passengers.length === 0 && (
        <p className="text-gray-500 col-span-full text-center py-8">
          {filters.search
            ? "No passengers found matching your criteria."
            : "No passengers available."}
        </p>
      )}

      {/* Pagination */}
      <Pagination
        route="passengers"
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
      />
    </>
  );
}

export default async function PassengerssPage({ searchParams }: PageProps) {
  //const passengers = await getPassengers();
  //console.log(passengers);

  return (
    <>
      <MainHeader name="Passengers" route="passengers" />

      <main className="mt-8 px-10">
        <Suspense
          fallback={
            <p className="text-gray-900 text-lg animate-pulse">
              Fetching passengers...
            </p>
          }
        >
          <Passengers searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  );
}
