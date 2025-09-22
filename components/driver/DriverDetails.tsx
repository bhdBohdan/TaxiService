import { DriverFull } from "@/common/interfaces/drivers.interface";

export default function DriverDetails({ driver }: { driver: DriverFull }) {
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
        {driver.reviews?.map((elem) => (
          <p key={elem.review_id}>
            {elem.passengers.firstname}: {elem.content} // Rating:{elem.stars}/5{" "}
          </p>
        ))}
      </div>
    </>
  );
}
