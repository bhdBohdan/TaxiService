"use client";

import { createReviewAction } from "@/common/actions/trip.action";
import {
  Review,
  //ReviewDTO,
} from "@/common/interfaces/reviews.interface";
import { Trip, TripsFull } from "@/common/interfaces/trips.interface";
import { useState } from "react";

interface ReviewFormProps {
  trip?: TripsFull; // optional for edit mode
}

export function ReviewForm({ trip }: ReviewFormProps) {
  const [driverid, setDriverid] = useState(trip?.driver_id || "");
  const [tripid, setTripid] = useState(trip?.trip_id || "");
  const [trips_passengers, setTrips_passengers] = useState(
    trip?.trips_passengers
  );
  const [content, setContent] = useState("");
  const [stars, setStars] = useState(0);

  const action = async (formData: FormData) => {
    formData.append("trip_id", String(tripid));
    formData.append("driver_id", String(driverid));
    await createReviewAction(formData);
  };

  return (
    <form
      action={action}
      className="max-w-md mx-auto bg-white p-6 rounded shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">Add Review</h2>

      <div>
        <label className="block text-sm text-gray-900 font-bold">
          Rate {trip?.drivers?.firstname} {trip?.drivers?.lastname}
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Choose passenger
        </label>
        <select name="passenger_id" id="">
          {trips_passengers?.map((elem) => (
            <option
              key={elem.passenger_id}
              value={elem.passengers.passenger_id}
            >
              {elem.passengers.firstname + " " + elem.passengers.lastname}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <input
          name="content"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Stars</label>
        <input
          name="stars"
          type="number"
          min="0"
          max="5"
          defaultValue="0"
          value={stars}
          onChange={(e) => setStars(+e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
      >
        {"Add Review"}
      </button>
    </form>
  );
}
