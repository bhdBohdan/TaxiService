"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { PassengerDTO } from "../interfaces/passengers.interface";
import { create, hardDelPass, updateById } from "../prisma/passengers";

export async function editPassenger(id: number, formData: FormData) {
  // Extract form fields safely
  const passDTO: PassengerDTO = {
    firstname: formData.get("firstname")?.toString() || "",
    lastname: formData.get("lastname")?.toString() || "",
    email: formData.get("email")?.toString() || null,
    phonenumber: formData.get("phonenumber")?.toString() || null,
  };

  // Call your DB or API update function
  await updateById(id, passDTO);
  redirect("/passengers");
}

export async function createPassenger(formData: FormData) {
  // Extract form fields safely
  const passDTO: PassengerDTO = {
    firstname: formData.get("firstname")?.toString() || "",
    lastname: formData.get("lastname")?.toString() || "",
    email: formData.get("email")?.toString() || null,
    phonenumber: formData.get("phonenumber")?.toString() || null,
  };

  // Call your DB or API update function
  await create(passDTO);
  redirect("/passengers");
}

export async function hardDeletePassenger(id: number) {
  // Extract form fields safely

  // Call your DB or API update function
  await hardDelPass(id);
  redirect("/passengers");
}
