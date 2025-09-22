"use client";

import {
  createDriverAction,
  editDriverAction,
} from "@/common/actions/driver.action";
import { Driver, DriverDTO } from "@/common/interfaces/drivers.interface";
import { useState } from "react";

interface DriverFormProps {
  driver?: Driver; // optional for edit mode
}

export function DriverForm({ driver }: DriverFormProps) {
  const [firstname, setFirstname] = useState(driver?.firstname || "");
  const [lastname, setLastname] = useState(driver?.lastname || "");
  const [email, setEmail] = useState(driver?.email || "");
  const [phonenumber, setPhonenumber] = useState(driver?.phonenumber || "");
  const [license, setLicense] = useState(driver?.license || "");

  const action = async (formData: FormData) => {
    if (driver?.driver_id) {
      await editDriverAction(driver.driver_id, formData);
    } else {
      await createDriverAction(formData);
    }
  };

  return (
    <form
      action={action}
      className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">
        {driver ? "Edit Driver" : "Add Driver"}
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

      <div>
        <label className="block text-sm font-medium text-gray-700">
          License Id
        </label>
        <input
          type="text"
          name="license"
          value={license}
          onChange={(e) => setLicense(e.target.value)}
          required
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        {driver ? "Update Driver" : "Add Driver"}
      </button>
    </form>
  );
}
