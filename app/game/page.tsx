import GameCard from '@/components/GameCard';
import SearchBar from '@/components/SearchBar';

export default function SearchPage() {
  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-6">Search Games</h2>

      <SearchBar />

      <GameCard />

      <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
        Search
      </button>
    </div>
  );
}
