import { TripPassenger } from "./trips.interface";

export interface PassengerFull extends Passenger {
  trips_passengers: TripPassenger[] | null;
}
export interface Passenger {
  passenger_id: number;
  firstname: string;
  lastname: string;
  email: string | null;
  phonenumber: string | null;
  registrationdate: Date | null;
  updated_at: Date | null;
}
