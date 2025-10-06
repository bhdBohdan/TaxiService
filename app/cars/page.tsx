import { SearchProps, PageProps } from "@/common/interfaces/filter.interface";
import { searchCars } from "@/common/prisma/cars";
import MainHeader from "@/components/CustomHeader";
import CarItem from "@/components/car/CarItem";
import Pagination from "@/components/Pagination";
import { Suspense } from "react";
import CarFilter from "@/components/car/CarFilter";
import AddCarForm from "@/components/car/AddCarForm";

async function Cars({ searchParams }: SearchProps) {
  const params = searchParams;
  const filters = {
    search: params.search,
    sort: params.sort || "sign_number",
    page: params.page ? parseInt(params.page) : 1,
    make: params.make,
    limit: 12,
  };

  const { cars, totalCount, totalPages, currentPage } = await searchCars(
    filters
  );

  return (
    <>
      <div className="mb-6">
        <AddCarForm />
      </div>
      <div className="mb-6">
        <CarFilter />
      </div>

      <div className="mb-4 text-sm text-gray-600">
        Showing {(currentPage - 1) * 12 + 1} to{" "}
        {Math.min(currentPage * 12, totalCount)} of {totalCount} cars
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-4">
        {cars.map((elem) => (
          <CarItem key={elem.car_id} car={elem} />
        ))}
      </div>

      {/* No Results */}
      {cars.length === 0 && (
        <p className="text-gray-500 col-span-full text-center py-8">
          {filters.search
            ? "No cars found matching your criteria."
            : "No cars available."}
        </p>
      )}

      {/* Pagination */}
      <Pagination
        route="cars"
        currentPage={currentPage}
        totalPages={totalPages}
        totalCount={totalCount}
      />
    </>
  );
}

export default async function CarsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  return (
    <>
      {/* <MainHeader name="Cars" route="cars" /> */}

      <main className="mt-8 px-10">
        <Suspense
          fallback={
            <p className="text-gray-900 text-lg animate-pulse">
              Fetching cars...
            </p>
          }
        >
          <Cars searchParams={params} />
        </Suspense>
      </main>
    </>
  );
}
