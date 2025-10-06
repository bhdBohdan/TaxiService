// app/passengers/[id]/page.tsx
import { getPassengerById, updateById } from "@/common/prisma/passengers";
import { PassengerForm } from "@/components/passenger/PassengerForm";
import NotFound from "@/app/not-found";

export default async function EditPassengerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const passenger = await getPassengerById(+slug);

  if (!passenger) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <p>Error : Invalid Passenger </p>
      </div>
    );
  }

  return (
    <div>
      <PassengerForm passenger={passenger} />
    </div>
  );
}
