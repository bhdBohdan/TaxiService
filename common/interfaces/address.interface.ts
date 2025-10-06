export interface Address {
  address_id: number;
  building: number | null;
  street: string | null;
  city: string;
  latitude: number | null;
  longitude: number | null;
}
