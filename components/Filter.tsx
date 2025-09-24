// components/driver/DriverFilters.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Filters({ route }: { route: string }) {
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

      router.replace(`/${route}?${params.toString()}`);
    },
    300
  );

  return (
    <div className="space-y-4 mb-6">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, email, phone"
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => updateFilters({ search: e.target.value })}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Filters Row */}
      <div className="flex gap-4 flex-wrap">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            onChange={(e) =>
              updateFilters({
                isdeleted: e.target.checked ? "true" : "",
              })
            }
            type="checkbox"
            name="isdeleted"
            checked={searchParams.get("isdeleted") === "true"}
          />
          Show Deleted
        </label>

        <select
          defaultValue={searchParams.get("sort")?.toString() || "created"}
          onChange={(e) => updateFilters({ sort: e.target.value })}
          className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="firstname">Sort by Name (A-Z)</option>
          <option value="firstname_desc">Sort by Name (Z-A)</option>
          <option value="created">Sort from Newest</option>
          <option value="created_asc">Sort from Oldest</option>
        </select>
      </div>
    </div>
  );
}
