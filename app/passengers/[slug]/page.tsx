//import { Quiz, QuizDetailsProps } from "@/common/interfaces";
//import DeleteQuizButton from "@/componets/deleteButton";
//import QuizDetails from "@/componets/quizDetails";
import { PassengerFull } from "@/common/interfaces/passengers.interface";
import { getPassengerById } from "@/common/prisma/passengers";
import PassengerDetails from "@/components/passenger/PassengersDetails";
import React from "react";

export type PassDetailsProps = {
  params: {
    slug: string;
  };
};

export default async function PassengerDetailsPage({
  params,
}: PassDetailsProps) {
  const passenger = await getPassengerById(+params.slug);

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
    </div>
  );
}
