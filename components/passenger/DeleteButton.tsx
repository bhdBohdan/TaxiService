"use client";

import { hardDeletePassenger } from "@/common/actions/passenger.action";

export default function DeletePassengerButton({ id }: { id: string | number }) {
  async function handleDelete(formData: FormData) {
    if (window.confirm("Are you sure?")) {
      await hardDeletePassenger(+id);
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
