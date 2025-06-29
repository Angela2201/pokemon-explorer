"use client";

import Image from 'next/image';
import PokemonDetailModal from './PokemonDetailModal';
import { Pokemon } from "@/types/pokemon";
import { useState } from 'react';

function PokemonCard({ id, name, sprites, types, height, weight, stats, base_experience }: Pokemon) {

  const [showPokemonDetailModal, setShowPokemonDetailModal] = useState(false);

  return (
    <div className="group cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-xl border-2 hover:border-blue-300 rounded-lg" onClick={() => setShowPokemonDetailModal(true)}>
      <div className="p-4 relative">
        <div className="absolute top-2 right-2 bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded-full">
          {id}
        </div>
        <div className="flex justify-center mb-4 mt-2">
          <Image
            src={sprites.front_default}
            alt="pokemon"
            width={100}
            height={100}
          />
        </div>
        <h3 className="text-center font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">
          {name}
        </h3>
      </div>

      <PokemonDetailModal
        id={id}
        name={name}
        sprites={sprites}
        types={types}
        height={height}
        weight={weight}
        stats={stats}
        base_experience={base_experience}
        showPokemonDetailModal={showPokemonDetailModal}
        setShowPokemonDetailModal={setShowPokemonDetailModal}
      />
    </div>
  );
}

export default PokemonCard;
