import { Passenger } from "./passengers.interface";

export interface Trip {
  trip_id: number;
  driver_id: number | null;
  startaddressid: number;
  endaddressid: number;
  startdatetime: Date;
  enddatetime: Date | null;
  is_deleted: boolean;
}

export interface TripsFull extends Trip {
  trips_passengers: TripPassengerFull[];
}

export interface TripPassenger {
  trip_id: number;
  passenger_id: number;
  trips: Trip;
}

export interface TripPassengerFull {
  trip_id: number;
  passenger_id: number;
  passengers: Passenger;
}

export interface TripDTO {
  driver_id: number | null;
  startaddressid: number;
  endaddressid: number;
  passenger_ids: number[];
}
