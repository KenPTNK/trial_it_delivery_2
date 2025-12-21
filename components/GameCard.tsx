type GameCardProps = {
  name: string
  genre: string
  platform: string
  releaseYear: number
  rating: number
}

export default function GameCard({
  name,
  genre,
  platform,
  releaseYear,
  rating,
}: GameCardProps) {
  return (
    <div className="group w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-lg dark:border-gray-800 dark:bg-gray-900">
      
      {/* Game Title */}
      <h2 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
        {name}
      </h2>

      {/* Meta info */}
      <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
        <p>
          <span className="font-medium text-gray-800 dark:text-gray-300">
            Genre:
          </span>{' '}
          {genre}
        </p>
        <p>
          <span className="font-medium text-gray-800 dark:text-gray-300">
            Platform:
          </span>{' '}
          {platform}
        </p>
        <p>
          <span className="font-medium text-gray-800 dark:text-gray-300">
            Release:
          </span>{' '}
          {releaseYear}
        </p>
      </div>

      {/* Rating */}
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          User Rating
        </span>

        <div className="flex items-center gap-1">
          <span className="text-lg font-bold text-yellow-500">
            {rating}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            / 10
          </span>
        </div>
      </div>
    </div>
  )
}
