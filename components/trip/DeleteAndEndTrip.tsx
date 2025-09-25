"use client";

import { deleteTripAction, endTripAction } from "@/common/actions/trip.action";

export default function DeleteTripButton({ id }: { id: string | number }) {
  async function handleDelete(formData: FormData) {
    if (window.confirm("Are you sure?")) {
      await deleteTripAction(+id);
    }
  }

  return (
    <form action={handleDelete}>
      <button
        type="submit"
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 mb-6"
      >
        Delete
      </button>
    </form>
  );
}

export function EndTripBtn({ id }: { id: string | number }) {
  async function handleEnd() {
    if (window.confirm("Are you sure?")) {
      await endTripAction(+id);
    }
  }

  return (
    <form action={handleEnd}>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mb-6"
      >
        End Trip
      </button>
    </form>
  );
}
