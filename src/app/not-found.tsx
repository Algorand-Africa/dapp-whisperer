import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400">
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="mb-6 text-5xl md:text-7xl font-bold text-white">
          Not Found
        </h1>
        <p className="mb-8 text-xl md:text-2xl text-white/90">
          Could not find requested resource
        </p>
        <Link href="/">
          <button
            className="px-8 py-3 bg-white text-purple-600 rounded-full font-semibold 
          hover:bg-purple-100 transform hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            Return Home
          </button>
        </Link>
      </section>
    </div>
  );
}
