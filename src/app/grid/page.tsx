"use client";

import PokemonCard from "@/components/PokemonCard";
import { useState, useEffect } from "react";
import { Pokemon } from '@/types/pokemon';
import Link from 'next/link';
import WestIcon from '@mui/icons-material/West';

function Page() {

  const [apiData] = useState({
    url: "https://pokeapi.co/api/v2/pokemon?offset=151&limit=151"
  })

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    fetch(apiData.url)
      .then((res) => res.json())
      .then((data) => {
        const urls = data.results.map((pokemon: { url: string }) => pokemon.url)
        Promise.all(urls.map((url: string) => fetch(url).then(res => res.json())))
          .then((detailedPokemons) => {
            setPokemons(detailedPokemons);
          })
          .catch((error) => console.error("Error fetching Pokémon details", error));
      })
      .catch((error) => console.error("Error fetching list Pokemon", error))
  }, [apiData])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/" className='flex flex-row gap-1 md:gap-3 items-center text-xs md:text-lg font-bold text-gray-800 border border-gray-500/35 p-2 rounded-lg'>
              <WestIcon className='w-2 h-2' />
              Volver
            </Link>
            <h1 className="text-2xl md:text-3xl font-semibold md:font-bold text-gray-800">Vista de Cuadrícula</h1>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {
            pokemons.map((item) => (
              <PokemonCard
                key={item.id}
                id={item.id}
                name={item.name}
                sprites={item.sprites}
                types={item.types}
                height={item.height}
                weight={item.weight}
                stats={item.stats}
                base_experience={item.base_experience}
                types_array={item.types_array ?? []}
                showPokemonDetailModal={item.showPokemonDetailModal ?? false}
                setShowPokemonDetailModal={item.setShowPokemonDetailModal ?? (() => {})}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Page;
