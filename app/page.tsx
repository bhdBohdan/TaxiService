import MainHeader from "@/components/CustomHeader";
import HomeSection from "@/components/HomeSection";
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
      <HomeSection />
    </>
  );
}
