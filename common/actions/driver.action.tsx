"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { DriverDTO } from "../interfaces/drivers.interface";
import { create, deleteDriver, updateById } from "../prisma/drivers";

export async function editDriverAction(id: number, formData: FormData) {
  // Extract form fields safely
  const driverDTO: DriverDTO = {
    firstname: formData.get("firstname")?.toString() || "",
    lastname: formData.get("lastname")?.toString() || "",
    email: formData.get("email")?.toString() || null,
    phonenumber: formData.get("phonenumber")?.toString() || null,
    license: formData.get("license")?.toString() || "",
  };

  // Call your DB or API update function
  try {
    await updateById(id, driverDTO);
    revalidatePath(`/drivers/${id}`);
    revalidatePath(`/drivers`);
  } catch (err: any) {
    throw new Error(`Update failed: ${err.message}`);
  }
  redirect("/drivers");
}

export async function createDriverAction(formData: FormData) {
  // Extract form fields safely
  const driverDTO: DriverDTO = {
    firstname: formData.get("firstname")?.toString() || "",
    lastname: formData.get("lastname")?.toString() || "",
    email: formData.get("email")?.toString() || null,
    phonenumber: formData.get("phonenumber")?.toString() || null,
    license: formData.get("license")?.toString() || "",
  };

  // Call your DB or API update function
  try {
    await create(driverDTO);
    revalidatePath(`/drivers`);
  } catch (err: any) {
    throw new Error(`Creation failed: ${err.message}`);
  }
  redirect("/drivers");
}

export async function deleteDriverAction(id: number) {
  // Extract form fields safely

  // Call your DB or API update function

  try {
    await deleteDriver(id);
    revalidatePath(`/drivers`);
  } catch (err: any) {
    throw new Error(`Deletion failed: ${err.message}`);
  }
  redirect("/drivers");
}
