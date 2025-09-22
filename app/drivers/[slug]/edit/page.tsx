// app/drivers/[id]/page.tsx
import { getDriverById, updateById } from "@/common/prisma/drivers";
import NotFound from "@/app/not-found";
import { DriverForm } from "@/components/driver/DriverForm";

export default async function EditDriverPage({
  params,
}: {
  params: { slug: string };
}) {
  const driver = await getDriverById(+params.slug);

  if (!driver) {
    NotFound("No driver like this");
    return;
  }

  return (
    <div>
      <h1>Edit Driver</h1>
      <DriverForm driver={driver} />
    </div>
  );
}
