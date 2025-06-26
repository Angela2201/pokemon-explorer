"use client";

import { createContext, useContext, useState } from "react";
import { Pokemon } from "@/types/pokemon";

const PokemonContext = createContext<any>(null);

export const PokemonProvider = ({ children }: { children: React.ReactNode }) => {
  const [dataPokemons, setDataPokemons] = useState<Pokemon[]>([]);

  const fetchPokemons = async () => {
    const url = "https://pokeapi.co/api/v2/pokemon?offset=151&limit=151";
    const res = await fetch(url);
    const data = await res.json();
    const urls = data.results.map((pokemon: { url: string }) => pokemon.url);
    const details = await Promise.all(urls.map((url: string) => fetch(url).then(res => res.json())));
    setDataPokemons(details);
  };

  return (
    <PokemonContext.Provider value={{ dataPokemons, fetchPokemons }}>
      {children}
    </PokemonContext.Provider>
  );
};

export const usePokemon = () => useContext(PokemonContext);

