import MainHeader from "@/components/CustomHeader";
import Link from "next/link";
import { Suspense } from "react";

// Define the type for a Quiz
interface Quiz {
  id: string;
  title: string;
  description?: string;
  questionsCount?: number; // optional if your API returns counts
}

export default async function QuizzesPage() {
  return (
    <>
      <MainHeader name="Home" route="no" />

      <main className="mt-8 px-10">
        <Suspense
          fallback={
            <p className="text-gray-900 text-lg animate-pulse">
              Fetching quizzes...
            </p>
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <p className="text-gray-900 text-lg animate-pulse">
              Fetching quizzes...
            </p>
          </div>
        </Suspense>
      </main>
    </>
  );
}
