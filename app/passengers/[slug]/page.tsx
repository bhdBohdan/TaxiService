//import { Quiz, QuizDetailsProps } from "@/common/interfaces";
//import DeleteQuizButton from "@/componets/deleteButton";
//import QuizDetails from "@/componets/quizDetails";
import { PassengerFull } from "@/common/interfaces/passengers.interface";
import { getPassengerById } from "@/common/prisma/passengers";
import DeletePassengerButton from "@/components/passenger/DeleteButton";
import PassengerDetails from "@/components/passenger/PassengersDetails";
import Link from "next/link";
import React from "react";

export type PassDetailsProps = {
  params: {
    slug: string;
  };
};

export default async function PassengerDetailsPage({
  params,
}: PassDetailsProps) {
  const { slug } = await params;
  const passenger = await getPassengerById(+slug);

  if (!passenger) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <p>Passenger not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <PassengerDetails passenger={passenger} />
      <div className="flex justify-between w-full">
        <Link
          href={`${slug}/edit`}
          className=" bg-blue-600 hover:bg-blue-700 mb-6
       text-white font-medium px-4 py-2 rounded-md transition-colors duration-200 "
        >
          Edit
        </Link>
        <DeletePassengerButton id={passenger?.passenger_id} />
      </div>
    </div>
  );
}
