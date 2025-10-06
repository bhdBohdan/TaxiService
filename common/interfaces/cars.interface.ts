import { Driver } from "./drivers.interface";

export interface Car extends CarDTO {
  car_id: number;
}

export interface CarWithDriver extends Car {
  drivers: Driver;
}

export interface CarDTO {
  model: string | null;
  driver_id: number | null;
  make: string | null;
  sign_number: string | null;
}
