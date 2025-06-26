"use client";

import { usePokemon } from "@/context/PokemonContext";
import PokemonCard from "@/components/PokemonCard";

function Page() {

  const { dataPokemons } = usePokemon();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Pokémon en la tabla</h1>

      {dataPokemons.length === 0 ? (
        <p className="text-gray-500">No hay datos de Pokémon. Ve a la página principal y presiona el botón CUADRÍCULA para cargar.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {dataPokemons.map((item: {
            id: number; name: string; sprites: { front_default: string; }; types: { type: { name: string; }; }[]; height: number; weight: number; stats: { base_stat: number; stat: { name: string; }; }[];
          }) => (
            <PokemonCard
              key={item.id}
              id={item.id}
              name={item.name}
              sprites={item.sprites}
              types={item.types}
              height={item.height}
              weight={item.weight}
              stats={item.stats}
            />
          ))}
        </div>
      )}
    </div>
    // <div className='mt-8 w-full grid grid-cols-2 gap-10'>
    //   {
    //     pokemons.map((item) => (
    //       <PokemonCard
    //         key={item.id}
    //         id={item.id}
    //         name={item.name}
    //         sprites={item.sprites}
    //         types={[]}
    //         height={item.height}
    //         weight={item.weight}
    //         stats={[]}
    //       />
    //     ))
    //   }
    // </div>
  );
}

export default Page;
