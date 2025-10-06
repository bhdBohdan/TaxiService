"use client";

import { useState, FormEvent } from "react";
import { createCarAction } from "@/common/actions/car.action";

export default function AddCarForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    model: "",
    make: "",
    sign_number: "",
    driver_id: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("model", form.model);
    formData.append("make", form.make);
    formData.append("sign_number", form.sign_number);
    formData.append("driver_id", form.driver_id || "0");

    setIsOpen(false);
    await createCarAction(formData);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md font-semibold"
      >
        + Add Car
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2  p-4 rounded-lg bg-blue-100 w-full max-w-sm"
    >
      <input
        type="text"
        name="make"
        placeholder="Make"
        value={form.make}
        onChange={handleChange}
        className="border rounded p-2 bg-gray-800 text-white placeholder-gray-400"
      />
      <input
        type="text"
        name="model"
        placeholder="Model"
        value={form.model}
        onChange={handleChange}
        className="border rounded p-2 bg-gray-800 text-white placeholder-gray-400"
      />
      <input
        type="text"
        name="sign_number"
        placeholder="Sign number"
        value={form.sign_number}
        onChange={handleChange}
        className="border rounded p-2 bg-gray-800 text-white placeholder-gray-400"
      />
      <input
        type="number"
        name="driver_id"
        placeholder="Driver ID"
        value={form.driver_id}
        onChange={handleChange}
        className="border rounded p-2 bg-gray-800 text-white placeholder-gray-400"
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-3 py-1 bg-gray-600 text-white rounded-md hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
