"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { PassengerDTO } from "../interfaces/passengers.interface";
import { create, deletePassenger, updateById } from "../prisma/passengers";

export async function editPassengerAction(id: number, formData: FormData) {
  // Extract form fields safely
  const passDTO: PassengerDTO = {
    firstname: formData.get("firstname")?.toString() || "",
    lastname: formData.get("lastname")?.toString() || "",
    email: formData.get("email")?.toString() || null,
    phonenumber: formData.get("phonenumber")?.toString() || null,
  };

  // Call your DB or API update function

  try {
    await updateById(id, passDTO);
    revalidatePath(`/passengers/${id}`);
    revalidatePath(`/passengers`);
  } catch (err: any) {
    throw new Error(`Update failed: ${err.message}`);
  }
  redirect(`/passengers/${id}`);
}

export async function createPassengerAction(formData: FormData) {
  // Extract form fields safely
  const passDTO: PassengerDTO = {
    firstname: formData.get("firstname")?.toString() || "",
    lastname: formData.get("lastname")?.toString() || "",
    email: formData.get("email")?.toString() || null,
    phonenumber: formData.get("phonenumber")?.toString() || null,
  };

  // Call your DB or API update function
  try {
    await create(passDTO);
    revalidatePath(`/passengers`);
  } catch (err: any) {
    throw new Error(`Creation failed: ${err.message}`);
  }

  redirect("/passengers");
}

export async function deletePassengerAction(id: number) {
  // Extract form fields safely

  // Call your DB or API update function

  try {
    await deletePassenger(id);
    revalidatePath(`/passengers`);
  } catch (err: any) {
    throw new Error(`Deletion failed: ${err.message}`);
  }
  redirect("/passengers");
}
