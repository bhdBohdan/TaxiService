import { PassengerDTO } from "./passengers.interface";
import { Review } from "./reviews.interface";

export interface Driver {
  driver_id: number;
  firstname: string;
  lastname: string;
  email: string | null;
  phonenumber: string | null;
  registrationdate: Date | null;
  updated_at: Date | null;
  license: string;
  is_deleted: boolean;
}

export interface DriverFull extends Driver {
  reviews: Review[];
}

export interface DriverDTO extends PassengerDTO {
  license: string;
}
