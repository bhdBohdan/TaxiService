import Link from "next/link";

export default function MainHeader() {
  return (
    <header className="ml-10 mt-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Quizzes</h1>
      <p className="text-gray-700">
        <Link
          href="/create"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors duration-200"
        >
          Create your own quiz
        </Link>
      </p>
    </header>
  );
}
