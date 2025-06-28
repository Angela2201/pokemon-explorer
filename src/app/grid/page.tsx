"use client";

import PokemonCard from "@/components/PokemonCard";
import { useState, useEffect } from "react";

function Page() {

  const [apiData, setApiData] = useState({
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
    <div className='mt-8 w-full grid grid-cols-2 gap-10'>
      {
        pokemons.map((item) => (
          <PokemonCard
            key={item.id}
            id={item.id}
            name={item.name}
            sprites={item.sprites}
            types={[]}
            height={item.height}
            weight={item.weight}
            stats={[]}
          />
        ))
      }
    </div>
  );
}

export default Page;
