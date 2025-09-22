"use client";

import { deleteDriverAction } from "@/common/actions/driver.action";

export default function DeleteDriverButton({ id }: { id: string | number }) {
  async function handleDelete(formData: FormData) {
    if (window.confirm("Are you sure?")) {
      await deleteDriverAction(+id);
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
