// app/passengers/[id]/page.tsx
import { getPassengerById, updateById } from "@/common/prisma/passengers";
import { PassengerForm } from "@/components/passenger/PassengerForm";
import NotFound from "@/app/not-found";
import { editPassenger } from "@/common/actions/passenger.action";

export default async function AddPassengerPage() {
  return (
    <div>
      <PassengerForm />
    </div>
  );
}
