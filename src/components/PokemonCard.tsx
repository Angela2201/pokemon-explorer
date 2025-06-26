"use client";

import Image from 'next/image';

interface PokemonCardProps {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

function PokemonCard({ id, name, sprites, type, height, weight, basicStatistics }: PokemonCardProps) {

  // console.log(sprites.front_default, 'images')
  return (
    <div className='flex flex-row w-full cursor-pointer'>
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
          {/* <div className='bg-[#E7F3D8] py-1.5 px-2 rounded-4xl flex flex-rows justify-center items-center gap-1'>
            <div>
              <Image
                src="/icons/ic_tick-circle.svg"
                alt="ic_tick-circle"
                width={16}
                height={16}
              />
            </div>
            <div>
              <p className='text-[#354E18] font-medium text-sm'>
                {state}
              </p>
            </div>
          </div> */}
        </div>
        <div>
          <p className='text-[#575B52] font-medium text-sm'>
            {id}
          </p>
        </div>
        {/* <div>
          <CharacterDetailModal
            image={image}
            name={name}
            species={species}
            gender={gender}
            origin={origin.name}
            state={state}
            location={location}
            episodesId={episodesId}
            showCharacterDetailModal={showCharacterDetailModal}
            setShowCharacterDetailModal={setShowCharacterDetailModal}
          />
        </div> */}
      </div>
    </div>
  );
}

export default PokemonCard;
