export interface Trip {
  trip_id: number;
  driver_id: number | null;
  startaddressid: number;
  endaddressid: number;
  startdatetime: Date;
  enddatetime: Date | null;
}

export interface TripPassenger {
  trip_id: number;
  passenger_id: number;
  trips: Trip;
}
