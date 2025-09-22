import { Passenger } from "./passengers.interface";

export interface Review {
  review_id: number;
  trip_id: number | null;
  driver_id: number;
  passenger_id: number;
  content: string;
  stars: number;
  created_at: Date | null;
  updated_at: Date | null;
  passengers: Passenger;
}
