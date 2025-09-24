// app/passengers/[id]/page.tsx
import { TripForm } from "@/components/trip/TripForm";

export default async function AddPassengerPage() {
  return (
    <div>
      <TripForm />
    </div>
  );
}
