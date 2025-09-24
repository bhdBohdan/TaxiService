import { SearchProps, PageProps } from "@/common/interfaces/filter.interface";
import { searchDrivers } from "@/common/prisma/drivers";
import MainHeader from "@/components/CustomHeader";
import DriverItem from "@/components/driver/DriverItem";
import Filters from "@/components/Filter";
import Pagination from "@/components/Pagination";
import { Suspense } from "react";

async function Drivers({ searchParams }: SearchProps) {
  const params = await searchParams;
  const filters = {
    search: params.search,
    sort: params.sort || "firstname",
    page: params.page ? parseInt(params.page) : 1,
    isdeleted: params.isdeleted === "true",
    limit: 12,
  };

  const { drivers, totalCount, totalPages, currentPage } = await searchDrivers(
    filters
  );

  return (
    <>
      <div className="mb-6">
        <Filters route="drivers" />
      </div>

      <div className="mb-4 text-sm text-gray-600">
        Showing {(currentPage - 1) * 12 + 1} to{" "}
        {Math.min(currentPage * 12, totalCount)} of {totalCount} drivers
      </div>

      {/* Drivers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {drivers.map((elem) => (
          <DriverItem key={elem.driver_id} driver={elem} />
        ))}
      </div>

      {/* No Results */}
      {drivers.length === 0 && (
        <p className="text-gray-500 col-span-full text-center py-8">
          {filters.search
            ? "No drivers found matching your criteria."
            : "No drivers available."}
        </p>
      )}

      {/* Pagination */}
      <Pagination
        route="drivers"
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
      />
    </>
  );
}

export default async function DriversPage({ searchParams }: PageProps) {
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
          <Drivers searchParams={searchParams} />
        </Suspense>
      </main>
    </>
  );
}
