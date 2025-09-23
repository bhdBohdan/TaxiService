"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="p-6 text-red-600">
      <h1 className="text-xl font-bold">Something went wrong</h1>
      <p>{error.message}</p>
    </div>
  );
}
