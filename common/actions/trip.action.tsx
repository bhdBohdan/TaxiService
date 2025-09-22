"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { TripDTO } from "../interfaces/trips.interface";
import { create, deleteTrip } from "../prisma/trips";

export async function createTripAction(formData: FormData) {
  // Extract form fields safely

  const passenger_ids = formData
    .getAll("passenger_ids")
    .map((id) => Number(id));

  const tripDTO: TripDTO = {
    driver_id: Number(formData.get("driver_id")),
    startaddressid: Number(formData.get("startaddressid")),
    endaddressid: Number(formData.get("endaddressid")),
    passenger_ids, // already converted to numbers
  };

  // Call your DB or API update function
  await create(tripDTO);
  redirect("/trips");
}

export async function deleteTripAction(id: number) {
  // Extract form fields safely

  // Call your DB or API update function
  await deleteTrip(id);
  redirect("/trips");
}
