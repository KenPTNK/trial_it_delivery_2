"use client";

import { useState } from "react";
import { supabase } from "@/src/supabaseClient";
import { useRouter } from "next/navigation";

type GameFormProps = {
  mode?: "add" | "update";
  initialData?: {
    name: string;
    genre: string;
    platform: string;
    year: number;
    rating: number;
  };
  onSubmit?: (data: any) => void;
};

export default function GameForm({
  mode = "add",
  initialData,
  onSubmit,
}: GameFormProps) {
  const router = useRouter();
  const [name, setName] = useState(initialData?.name ?? "");
  const [genre, setGenre] = useState(initialData?.genre ?? "");
  const [platform, setPlatform] = useState(initialData?.platform ?? "");
  const [year, setReleaseYear] = useState(
    initialData?.year ?? ""
  );
  const [rating, setRating] = useState(initialData?.rating ?? "");
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !genre || !platform || !year) {
      setFormError("Please fill in all required fields.");
      return;
    }

    const { error } = await supabase
      .from("games")
      .insert(
        { name, genre, platform, year, rating }
      )
    
    if (error) {
      setFormError("Error saving game. Please try again.");
      console.log("Supabase insert error:", error);
    }

    alert("Game saved successfully!");
    router.push("/game");
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-6">
        {mode === "add" ? "Create Game" : "Update Game"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name */}
        <input
          type="text"
          placeholder="Game name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 border rounded"
          required
        />

        {/* Genre */}
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="p-3 border rounded"
          required
        />

        {/* Platform */}
        <input
          type="text"
          placeholder="Platform"
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="p-3 border rounded"
          required
        />

        {/* Release Year */}
        <input
          type="number"
          placeholder="Release year"
          value={year}
          onChange={(e) => setReleaseYear(Number(e.target.value))}
          className="p-3 border rounded"
          min={1970}
          max={2100}
          required
        />

        {/* Rating */}
        <input
          type="number"
          placeholder="Rating (0 – 10)"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          className="p-3 border rounded"
          min={0}
          max={10}
          step={0.1}
        />

        <button
          type="submit"
          className={`mt-2 py-2 rounded text-white ${
            mode === "add"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {mode === "add" ? "Create Game" : "Update Game"}
        </button>
      </form>
    </div>
  );
}
