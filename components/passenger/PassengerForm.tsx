"use client";

import {
  createPassenger,
  editPassenger,
} from "@/common/actions/passenger.action";
import {
  Passenger,
  PassengerDTO,
} from "@/common/interfaces/passengers.interface";
import { useState } from "react";

interface PassengerFormProps {
  passenger?: Passenger; // optional for edit mode
}

export function PassengerForm({ passenger }: PassengerFormProps) {
  const [firstname, setFirstname] = useState(passenger?.firstname || "");
  const [lastname, setLastname] = useState(passenger?.lastname || "");
  const [email, setEmail] = useState(passenger?.email || "");
  const [phonenumber, setPhonenumber] = useState(passenger?.phonenumber || "");

  const action = async (formData: FormData) => {
    if (passenger?.passenger_id) {
      await editPassenger(passenger.passenger_id, formData);
    } else {
      await createPassenger(formData);
    }
  };

  return (
    <form
      action={action}
      className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">
        {passenger ? "Edit Passenger" : "Add Passenger"}
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <input
          name="firstname"
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <input
          type="text"
          name="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Phone Number
        </label>
        <input
          name="phonenumber"
          type="tel"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        {passenger ? "Update Passenger" : "Add Passenger"}
      </button>
    </form>
  );
}
