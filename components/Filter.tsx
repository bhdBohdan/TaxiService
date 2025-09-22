// components/driver/DriverFilters.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function DriverFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilters = useDebouncedCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams);

      // Reset to page 1 when filters change
      params.set("page", "1");

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      });

      router.replace(`/drivers?${params.toString()}`);
    },
    300
  );

  return (
    <div className="space-y-4 mb-6">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, email, phone, license..."
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => updateFilters({ search: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Filters Row */}
      <div className="flex gap-4 flex-wrap">
        <select
          defaultValue={searchParams.get("status")?.toString() || ""}
          onChange={(e) => updateFilters({ status: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <select
          defaultValue={searchParams.get("sort")?.toString() || "name"}
          onChange={(e) => updateFilters({ sort: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="name">Sort by Name (A-Z)</option>
          <option value="name_desc">Sort by Name (Z-A)</option>
          <option value="created">Sort by Newest</option>
        </select>
      </div>
    </div>
  );
}
