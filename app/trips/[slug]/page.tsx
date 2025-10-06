//import { Quiz, QuizDetailsProps } from "@/common/interfaces";
//import DeleteQuizButton from "@/componets/deleteButton";
//import QuizDetails from "@/componets/quizDetails";
import { getTripById } from "@/common/prisma/trips";
import DeleteTripButton, {
  EndTripBtn,
} from "@/components/trip/DeleteAndEndTrip";
import { ReviewForm } from "@/components/trip/ReviewForm";

import TripDetails from "@/components/trip/TripDetails";

import Link from "next/link";
import React from "react";

export type PassDetailsProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function TripDetailsPage({ params }: PassDetailsProps) {
  const { slug } = await params;
  const trip = await getTripById(+slug);

  if (!trip) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <p>Trip not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <TripDetails trip={trip} />
      <div className="flex justify-between w-full">
        {/* <Link
          href={`${slug}/edit`}
          className=" bg-blue-600 hover:bg-blue-700 mb-6
       text-white font-medium px-4 py-2 rounded-md transition-colors duration-200 "
        >
          Edit
        </Link> */}
        {!trip.enddatetime && <EndTripBtn id={trip?.trip_id} />}
        <DeleteTripButton id={trip?.trip_id} />
      </div>
      <ReviewForm trip={trip} />
    </div>
  );
}
