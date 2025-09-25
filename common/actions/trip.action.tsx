"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { TripDTO } from "../interfaces/trips.interface";
import { create, createRaw, deleteTrip, endTrip } from "../prisma/trips";
import { createReview, createReviewRaw } from "../prisma/review";
import { ReviewDTO } from "../interfaces/reviews.interface";

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
  try {
    await createRaw(tripDTO);
  } catch (err: any) {
    throw new Error(`creation failed: ${err.message}`);
  }

  redirect("/trips");
}

export async function deleteTripAction(id: number) {
  // Extract form fields safely

  // Call your DB or API update function
  try {
    await deleteTrip(id);
  } catch (err: any) {
    throw new Error(`deletion failed: ${err.message}`);
  }

  redirect("/trips");
}

export async function createReviewAction(formData: FormData) {
  const reviewDTO: ReviewDTO = {
    trip_id: Number(formData.get("trip_id")),
    driver_id: Number(formData.get("driver_id")),
    passenger_id: Number(formData.get("passenger_id")),
    content: String(formData.get("content") || ""),
    stars: Number(formData.get("stars")),
  };

  try {
    await createReviewRaw(reviewDTO);
  } catch (err: any) {
    throw new Error(`review creation failed: ${err.message}`);
  }

  redirect("/trips");
}

export async function endTripAction(id: number) {
  try {
    await endTrip(id);
  } catch (err: any) {
    throw new Error(`deletion failed: ${err.message}`);
  }

  redirect(`/trips/${id}`);
}
