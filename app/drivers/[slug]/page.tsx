//import { Quiz, QuizDetailsProps } from "@/common/interfaces";
//import DeleteQuizButton from "@/componets/deleteButton";
//import QuizDetails from "@/componets/quizDetails";
import { DriverFull } from "@/common/interfaces/drivers.interface";
import { getDriverById, getDriversCars } from "@/common/prisma/drivers";
import DeleteDriverButton from "@/components/driver/DeleteButton";
import DriverDetails from "@/components/driver/DriverDetails";
import Link from "next/link";
import React from "react";

export type DriverDetailsProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function DriverDetailsPage({
  params,
}: DriverDetailsProps) {
  const { slug } = await params;

  const driver = await getDriverById(+slug);
  const cars = await getDriversCars(+slug);

  if (!driver) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <p>Driver not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <DriverDetails driver={driver} cars={cars} />
      <div className="flex justify-between w-full">
        <Link
          href={`${slug}/edit`}
          className=" bg-blue-600 hover:bg-blue-700 mb-6
       text-white font-medium px-4 py-2 rounded-md transition-colors duration-200 "
        >
          Edit
        </Link>
        <DeleteDriverButton id={driver?.driver_id} />
      </div>
    </div>
  );
}
