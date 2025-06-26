"use client";

import Image from 'next/image';
import PokemonDetailModal from './PokemonDetailModal';
import { Pokemon } from "@/types/pokemon";
import { useState } from 'react';

function PokemonCard({ id, name, sprites, types, height, weight, stats }: Pokemon) {

  const [showPokemonDetailModal, setShowPokemonDetailModal] = useState(false);

  return (
    <div className='flex flex-row w-full cursor-pointer' onClick={() => setShowPokemonDetailModal(true)}>
      <div className='h-full relative'>
        <div className=''>
          <Image
            src={sprites.front_default}
            alt="pokemon"
            width={140}
            height={137}
            className='w-full h-full'
          />
        </div>
      </div>
      <div className='flex flex-col pt-3 px-4 pb-4 bg-white rounded-r-2xl w-full'>
        <div className='flex flex-row justify-between'>
          <div>
            <h3 className='text-[#333630] font-semibold text-lg'>
              {name}
            </h3>
          </div>
        </div>
        <div>
          <p className='text-[#575B52] font-medium text-sm'>
            {id}
          </p>
        </div>
        <div>
          <PokemonDetailModal
            id={id}
            name={name}
            sprites={sprites}
            types={types}
            height={height}
            weight={weight}
            stats={stats}
            showPokemonDetailModal={showPokemonDetailModal}
            setShowPokemonDetailModal={setShowPokemonDetailModal}
          />
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
