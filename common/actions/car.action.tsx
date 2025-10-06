"use server";

import { redirect } from "next/navigation";
import { CarDTO } from "../interfaces/cars.interface";
import { create, deleteCar, updateById } from "../prisma/cars";
import { revalidatePath } from "next/cache";

export async function editCarAction(id: number, formData: FormData) {
  // Extract form fields safely
  const carDTO: CarDTO = {
    driver_id: Number(formData.get("driver_id")),
    make: String(formData.get("make")),
    model: String(formData.get("model")),
    sign_number: String(formData.get("sign_number")),
  };

  // Call your DB or API update function
  try {
    await updateById(id, carDTO);
    revalidatePath("/cars");
  } catch (err: any) {
    throw new Error(`Update failed: ${err.message}`);
  }
  redirect("/cars");
}

export async function createCarAction(formData: FormData) {
  // Extract form fields safely
  const carDTO: CarDTO = {
    driver_id: Number(formData.get("driver_id")),
    make: String(formData.get("make")),
    model: String(formData.get("model")),
    sign_number: String(formData.get("sign_number")),
  };

  // Call your DB or API update function
  try {
    await create(carDTO);
    revalidatePath("/cars");
  } catch (err: any) {
    throw new Error(`Creation failed: ${err.message}`);
  }
  redirect("/cars");
}

export async function deleteCarAction(id: number) {
  try {
    await deleteCar(id);
    revalidatePath("/cars");
  } catch (err: any) {
    throw new Error(`Deletion failed: ${err.message}`);
  }
  redirect("/cars");
}
