"use client";

import { useState, FormEvent } from "react";
import { Car, CarWithDriver } from "@/common/interfaces/cars.interface";
import { editCarAction, deleteCarAction } from "@/common/actions/car.action";
import Link from "next/link";

interface CarItemProps {
  car: Car | CarWithDriver;
}

export default function CarItem({ car }: CarItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    model: car.model ?? "",
    make: car.make ?? "",
    sign_number: car.sign_number ?? "",
    driver_id: car.driver_id ?? 0,
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
    formData.append("driver_id", form.driver_id.toString());

    setIsEditing(false);

    await editCarAction(car.car_id, formData);
  };

  const handleDelete = async () => {
    if (confirm(`Delete car ${car.sign_number}?`)) {
      await deleteCarAction(car.car_id);
    }
  };

  return (
    <div className="bg-blue-100 shadow-md rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300 overflow-x-hidden justify-between h-full">
      {!isEditing ? (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          {/* ─── Info section ─── */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold">
              {car.make} {car.model}
            </h2>
            <p className="text-sm text-gray-800">
              Plate: <span className="text-gray-400">{car.sign_number}</span>
            </p>
            {"drivers" in car && (
              <p className="text-sm text-gray-800">
                Driver:{" "}
                <span className="text-gray-400">
                  <Link
                    href={`/drivers/${car.driver_id}`}
                    className="text-blue-600 hover:text-blue-900 font-bold"
                  >
                    {car.drivers?.firstname}{" "}
                    {car.drivers?.lastname ?? "— (no driver)"}
                  </Link>
                </span>
              </p>
            )}
          </div>

          {/* ─── Buttons section ─── */}
          <div className="flex gap-2 sm:ml-auto">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            name="make"
            placeholder="Make"
            value={form.make}
            onChange={handleChange}
            className="border rounded p-2 bg-gray-800 text-white"
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={form.model}
            onChange={handleChange}
            className="border rounded p-2 bg-gray-800 text-white"
          />
          <input
            type="text"
            name="sign_number"
            placeholder="Sign number"
            value={form.sign_number}
            onChange={handleChange}
            className="border rounded p-2 bg-gray-800 text-white"
          />
          <input
            type="number"
            name="driver_id"
            placeholder="Driver ID"
            value={form.driver_id}
            onChange={handleChange}
            className="border rounded p-2 bg-gray-800 text-white"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
