"use client";

import { createTripAction } from "@/common/actions/trip.action";
import { Trip, TripDTO } from "@/common/interfaces/trips.interface";
import { useState } from "react";

export function TripForm() {
  const [driver_id, setDriver_id] = useState("");
  const [startAddressId, setStartAddressId] = useState("");
  const [endAddressId, setEndAddressId] = useState("");
  const [passenger_ids, setPassenger_ids] = useState<string[]>([""]);

  const addPassenger = () => setPassenger_ids([...passenger_ids, ""]);
  const removePassenger = (idx: number) =>
    setPassenger_ids(passenger_ids.filter((_, i) => i !== idx));
  const handlePassengerChange = (idx: number, value: any) => {
    const updated = [...passenger_ids];
    updated[idx] = value;
    setPassenger_ids(updated);
  };

  const action = async (formData: FormData) => {
    console.log(formData);
    await createTripAction(formData);
  };

  return (
    <form
      action={action}
      className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">{"Add Trip"}</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Driver Id
        </label>
        <input
          name="driver_id"
          type="text"
          value={driver_id}
          onChange={(e) => setDriver_id(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          startAddressId
        </label>
        <input
          type="text"
          name="startaddressid"
          value={startAddressId}
          onChange={(e) => setStartAddressId(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          endaddressid
        </label>
        <input
          name="endaddressid"
          type="text"
          value={endAddressId}
          onChange={(e) => setEndAddressId(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {passenger_ids.map((q, qIdx) => (
        <div key={qIdx}>
          <label className="block text-sm font-medium text-gray-700">
            Pass {qIdx + 1}
          </label>
          {passenger_ids.length > 1 && (
            <button
              type="button"
              className="text-red-500 text-xs"
              onClick={() => removePassenger(qIdx)}
            >
              Remove
            </button>
          )}
          <input
            name="passenger_ids"
            type="text"
            value={q}
            onChange={(e) => handlePassengerChange(qIdx, e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      ))}
      {passenger_ids.length < 4 && (
        <button
          type="button"
          className="bg-gray-200 px-3 py-1 rounded mr-2"
          onClick={addPassenger}
        >
          + Add passenger
        </button>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        {"Add Trip"}
      </button>
    </form>
  );
}
