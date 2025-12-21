"use client";

import GameCard from "@/components/GameCard";
import { supabase } from "@/src/supabaseClient";
import { useState, useEffect } from "react";
import type { Session } from "@supabase/supabase-js";
import Link from "next/link";

function roundToNearestTenth(value: number): number {
  return Math.round(value * 10) / 10;
}

export default function GamePage() {
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [games, setGames] = useState<Array<any> | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  // 🔹 Get auth session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // 🔹 Fetch games from Supabase
  useEffect(() => {
    const fetchGames = async () => {
      const { data, error } = await supabase.from("games").select();

      if (error) {
        setFetchError("Could not fetch the games");
        setGames(null);
        console.log("error fetching", error);
      }

      if (data) {
        setGames(data);
        setFetchError(null);
      }
    };

    fetchGames();
  }, []);

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
      {/* 🔹 Header row */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Games</h2>

        {/* 🔹 Create button only when signed in */}
        {session && (
          <Link
            href="/game/create"
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            + Create
          </Link>
        )}
      </div>

      {fetchError && <p className="text-red-500 mb-4">{fetchError}</p>}

      {games && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <GameCard
              key={game.id}
              name={game.name}
              genre={game.genre}
              platform={game.platform}
              releaseYear={game.year}
              rating={roundToNearestTenth(game.rating)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
