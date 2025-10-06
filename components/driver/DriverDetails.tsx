import { Car } from "@/common/interfaces/cars.interface";
import { DriverFull } from "@/common/interfaces/drivers.interface";
import Link from "next/link";

export default function DriverDetails({
  driver,
  cars,
}: {
  driver: DriverFull;
  cars?: Car[];
}) {
  return (
    <>
      <h1 className="text-2xl font-bold mb-2">Id: {driver.driver_id}</h1>

      <h1 className="text-3xl font-bold mb-2">{driver.firstname}</h1>
      <h1 className="text-3xl font-bold mb-2">{driver.lastname}</h1>

      <p className="text-gray-700 mb-4">Email: {driver.email}</p>
      <p className="text-gray-700 mb-4">Phone: {driver.phonenumber}</p>
      <p className="text-gray-700 mb-4">License: {driver.license}</p>

      <p className="text-gray-700 mb-4">
        Registartion date: {driver.registrationdate?.toISOString()}
      </p>

      <p className="text-gray-700 mb-4">
        Updated at: {driver.updated_at?.toISOString()}
      </p>

      <div className="text-gray-700 mb-4 p-6 bg-stone-200 rounded-b-sm">
        Reviews :{" "}
        {driver.reviews && driver.reviews.length != 0
          ? driver.reviews?.map((elem) => (
              <p key={elem.review_id}>
                {elem.passengers.firstname}: {elem.content}
                <span className="text-gray-600">Rating: {elem.stars}/5</span>
              </p>
            ))
          : "No reviews yet :("}
      </div>

      <div className="text-gray-700 mb-4 p-6 bg-stone-200 rounded-b-sm flex flex-col">
        Cars :
        {cars && cars.length != 0
          ? cars?.map((elem) => (
              <Link
                key={elem.car_id}
                href={`/cars?search=${elem.sign_number}`}
                className="text-blue-600 hover:text-blue-900 font-bold"
              >
                {elem.sign_number}: {elem.make} {elem.model}
              </Link>
            )) || " No cars asigned"
          : " No cars asigned"}
      </div>
    </>
  );
}
