"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function CarFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = useDebouncedCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams);

      params.set("page", "1");

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      router.replace(`/cars?${params.toString()}`);
    },
    300
  );

  return (
    <div className="space-y-4 mb-6">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by sign number, make, model"
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => updateFilters({ search: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Filters Row */}
      <div className="flex gap-4 flex-wrap">
        <select
          defaultValue={searchParams.get("make")?.toString() || ""}
          onChange={(e) => updateFilters({ make: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-</option>
          <option value="audi">Audi</option>
          <option value="bmw">Bmw</option>
          <option value="toyota">Toyota</option>
          <option value="opel">Opel</option>
        </select>

        <select
          defaultValue={searchParams.get("sort")?.toString() || "sign_number"}
          onChange={(e) => updateFilters({ sort: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="sign_number">Sort by sign number (Z-A)</option>
          <option value="sign_number_desc">Sort by sign number (A-Z)</option>
          <option value="model">Sort by model</option>
          <option value="model_asc">Sort by model asc</option>
        </select>
      </div>
    </div>
  );
}
