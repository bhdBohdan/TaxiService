import { Driver } from "@/common/interfaces/drivers.interface";
import { getDrivers, searchDrivers } from "@/common/prisma/drivers";
import MainHeader from "@/components/CustomHeader";
import DriverItem from "@/components/driver/DriverItem";
import DriverFilters from "@/components/Filter";
import Pagination from "@/components/Pagination";
import DriverSearch from "@/components/SearchBar";
import { Suspense } from "react";

interface DriversPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

interface DriversProps {
  searchParams: {
    search?: string;
    status?: string;
    sort?: string;
    page?: string;
  };
}

async function Drivers({ searchParams }: DriversProps) {
  const filters = {
    search: searchParams.search,
    status: searchParams.status,
    sort: searchParams.sort || "name",
    page: searchParams.page ? parseInt(searchParams.page) : 1,
    limit: 3,
  };

  const { drivers, totalCount, totalPages, currentPage } = await searchDrivers(
    filters
  );

  return (
    <>
      <div className="mb-6">
        <DriverFilters />
      </div>

      {/* Results Count */}
      <div className="mb-4 text-sm text-gray-600">
        Showing {(currentPage - 1) * 3 + 1} to{" "}
        {Math.min(currentPage * 3, totalCount)} of {totalCount} drivers
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
          {filters.search || filters.status
            ? "No drivers found matching your criteria."
            : "No drivers available."}
        </p>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
      />
    </>
  );
}

export default async function DriversPage({ searchParams }: DriversPageProps) {
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
