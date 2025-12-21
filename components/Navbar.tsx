import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-gray-900 text-white">
      <h1 className="text-xl font-bold">GameFinder</h1>
      <div className="flex items-center gap-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/search" className="hover:underline">
          Search Game
        </Link>
        <Link
          href="/auth"
          className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700"
        >
          Signup
        </Link>
      </div>
    </nav>
  );
}
