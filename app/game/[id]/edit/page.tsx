"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/src/supabaseClient";
import GameForm from "@/components/GameForm";

type Game = {
  id: number;
  name: string;
  genre: string;
  platform: string;
  year: number;
  rating: number;
};

export default function EditGamePage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [session, setSession] = useState<Session | null>(null);
  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 🔐 Check auth
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace("/auth");
        return;
      }
      setSession(data.session);
    });
  }, [router]);

  // 🎮 Fetch game data
  useEffect(() => {
    if (!id) return;

    const fetchGame = async () => {
      const { data, error } = await supabase
        .from("games")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error(error);
        setError("Game not found");
        setLoading(false);
        return;
      }

      setGame(data);
      setLoading(false);
    };

    fetchGame();
  }, [id]);

  // 💾 Update handler
  const handleUpdate = async (updatedGame: {
    name: string;
    genre: string;
    platform: string;
    year: number;
    rating: number;
  }) => {
    const { error } = await supabase
      .from("games")
      .update({
        name: updatedGame.name,
        genre: updatedGame.genre,
        platform: updatedGame.platform,
        year: updatedGame.year, // ✅ aligned
        rating: updatedGame.rating,
      })
      .eq("id", id);

    if (error) {
      console.error(error);
      alert("Failed to update game");
      return;
    }

    router.push("/game");
  };

  if (loading) {
    return <p className="mt-10 text-center">Loading game...</p>;
  }

  if (error || !game) {
    return (
      <p className="mt-10 text-center text-red-500">
        {error ?? "Game not found"}
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <GameForm
        mode="update"
        initialData={{
          name: game.name,
          genre: game.genre,
          platform: game.platform,
          year: game.year,
          rating: game.rating,
        }}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
