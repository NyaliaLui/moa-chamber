'use client'; // Error boundaries must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string; statusCode?: number };
  reset: () => void;
}) {
  return (
    <section className="w-full h-dvh flex items-center justify-center bg-[#1a56db]">
      <div className="container mx-auto text-center">
        {error.statusCode && (
          <p className="text-6xl font-bold text-white mb-4">
            {error.statusCode}
          </p>
        )}
        <h1 className="text-4xl font-bold text-white mb-4">
          Something went wrong!
        </h1>
        {error.message && (
          <p className="text-lg text-white mb-6">{error.message}</p>
        )}
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-white text-[#1a56db] rounded hover:bg-gray-100 transition-colors"
        >
          Try again
        </button>
      </div>
    </section>
  );
}
