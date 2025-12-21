type GameCardProps = {
  name: string;
  genre: string;
  platform: string;
  releaseYear: number;
  rating: number;
  isAuthenticated: boolean;
  onEdit: () => void;
  onDelete: () => void;
};

export default function GameCard({
  name,
  genre,
  platform,
  releaseYear,
  rating,
  isAuthenticated,
  onEdit,
  onDelete,
}: GameCardProps) {
  return (
    <div className="relative flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
      {/* Header */}
      <div className="mb-3">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {name}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {genre} • {platform}
        </p>
      </div>

      {/* Meta */}
      <div className="flex flex-1 items-center justify-between">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>
            <span className="font-medium text-gray-800 dark:text-gray-300">
              Released:
            </span>{" "}
            {releaseYear}
          </p>
        </div>

        {/* Rating Badge */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
          <span className="text-lg font-bold">{rating}</span>
        </div>
      </div>

      {/* Actions */}
      {isAuthenticated && (
        <div className="mt-5 flex gap-2 border-t border-gray-200 pt-4 dark:border-gray-800">
          <button
            onClick={onEdit}
            className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            className="flex-1 rounded-lg bg-red-600 py-2 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
