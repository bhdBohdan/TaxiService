// app/passengers/[id]/page.tsx
import { getPassengerById, updateById } from "@/common/prisma/passengers";
import { PassengerForm } from "@/components/passenger/PassengerForm";
import NotFound from "@/app/not-found";

export default async function EditPassengerPage({
  params,
}: {
  params: { slug: string };
}) {
  const passenger = await getPassengerById(+params.slug);

  if (!passenger) {
    NotFound("No passenger like this");
    return;
  }

  return (
    <div>
      <h1>Edit Passenger</h1>
      <PassengerForm passenger={passenger} />
    </div>
  );
}
