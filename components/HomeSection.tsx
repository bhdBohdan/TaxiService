import Link from "next/link";

export default function HomeSection() {
  return (
    <section className="py-12 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to Taxi Service App Manager
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A comprehensive platform for managing your transportation services.
            Handle passengers, drivers, and trips with powerful CRUD operations,
            search, and pagination features.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1  gap-6 mb-14">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col justify-between ">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <i className="fas fa-users text-blue-600 text-xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Passengers</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Manage your passenger database with full CRUD operations. Search,
              filter, and paginate through passenger records.
            </p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li className="flex items-center">
                <i className="fas fa-plus-circle text-green-500 mr-2"></i>
                Add new passengers
              </li>
              <li className="flex items-center">
                <i className="fas fa-edit text-blue-500 mr-2"></i>
                Update passenger information
              </li>
              <li className="flex items-center">
                <i className="fas fa-search text-purple-500 mr-2"></i>
                Search and filter functionality
              </li>
            </ul>
            <Link
              href="/passengers"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Manage Passengers
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col justify-between ">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <i className="fas fa-id-card-alt text-green-600 text-xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Drivers</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Maintain your driver roster with complete CRUD capabilities. Add
              reviews and manage driver profiles efficiently.
            </p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li className="flex items-center">
                <i className="fas fa-plus-circle text-green-500 mr-2"></i>
                Register new drivers
              </li>
              <li className="flex items-center">
                <i className="fas fa-star text-yellow-500 mr-2"></i>
                Add driver reviews
              </li>
              <li className="flex items-center">
                <i className="fas fa-filter text-purple-500 mr-2"></i>
                Advanced filtering options
              </li>
            </ul>
            <Link
              href="/drivers"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Manage Drivers
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col justify-between ">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <i className="fas fa-route text-purple-600 text-xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Trips</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Track and manage all trips. View detailed information, assign
              passengers, and add reviews for drivers.
            </p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li className="flex items-center">
                <i className="fas fa-info-circle text-blue-500 mr-2"></i>
                View trip details
              </li>
              <li className="flex items-center">
                <i className="fas fa-user-check text-green-500 mr-2"></i>
                Assign passengers to trips
              </li>
              <li className="flex items-center">
                <i className="fas fa-star text-yellow-500 mr-2"></i>
                Rate and review drivers
              </li>
            </ul>
            <Link
              href="/trips"
              className="inline-block bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition-colors"
            >
              View Trips
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col justify-between ">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <i className="fas fa-id-card-alt text-green-600 text-xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Drivers</h2>
            </div>
            <p className="text-gray-600 mb-4">
              Maintain Cars roster with complete CRUD capabilities..
            </p>
            <ul className="text-gray-600 space-y-2 mb-6">
              <li className="flex items-center">
                <i className="fas fa-plus-circle text-green-500 mr-2"></i>
                Register new cars
              </li>
              <li className="flex items-center">
                <i className="fas fa-star text-yellow-500 mr-2"></i>
                Add driver to them
              </li>
              <li className="flex items-center">
                <i className="fas fa-filter text-purple-500 mr-2"></i>
                Advanced filtering options
              </li>
            </ul>
            <Link
              href="/drivers"
              className="inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Manage Cars
            </Link>
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
            Powerful Management Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Advanced Features
              </h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span>Full CRUD operations for all entities</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span>Responsive pagination for large datasets</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span>Real-time search and filtering</span>
                </li>
                <li className="flex items-start">
                  <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
                  <span>Intuitive user interface</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                How It Works
              </h3>
              <ol className="text-gray-600 space-y-2 list-decimal pl-5">
                <li>
                  Navigate to the desired section (Passengers, Drivers, or
                  Trips)
                </li>
                <li>Use search and filters to find specific records</li>
                <li>View details, edit information, or add new entries</li>
                <li>For trips, assign passengers and add driver reviews</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
