"use client"

import { Dialog, DialogPanel, Transition, TransitionChild } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import { Pokemon } from "@/types/pokemon";

function PokemonDetailModal({ id, name, sprites, types, height, weight, stats, showPokemonDetailModal, setShowPokemonDetailModal }: Pokemon) {

  const statLabels: Record<string, string> = {
    hp: "Salud Base",
    attack: "Ataque",
    defense: "Defensa",
    "special-attack": "Ataque Especial",
    "special-defense": "Defensa Especial",
    speed: "Velocidad"
  };

  return (
    <>
      <Transition appear show={showPokemonDetailModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowPokemonDetailModal(false)}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/60" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <button
                    className="absolute top-3 right-3 z-10 bg-gray-100 p-2 rounded-full hover:bg-gray-200 cursor-pointer"
                    onClick={() => setShowPokemonDetailModal(false)}
                  >
                    <Image src="/icons/ic-times.svg" alt="Cerrar" width={24} height={24} />
                  </button>

                  <div className="space-y-6">
                    <div className="text-center">
                      <Image
                        src={sprites.front_default}
                        alt={name}
                        width={100}
                        height={100}
                        className="mx-auto"
                      />
                      <h2 className="text-2xl text-black font-bold">{name}</h2>
                      <p className="text-gray-500 font-bold">#{id}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-black">Tipos:</h4>
                      <div className="flex gap-2 justify-center">
                        {Array.isArray(types) && types.length > 0 && types[0]?.type ? (
                          types.map((item, id) => (
                            <div key={id}>
                              <p className="text-[#575B52] font-medium text-lg">
                                {item.type?.name ?? "Desconocido"}
                              </p>
                            </div>
                          ))
                        ) : Array.isArray(types) ? (
                          types.map((name, id) => (
                            <div key={id}>
                              <p className="text-[#575B52] font-medium text-base">
                                {name}
                              </p>
                            </div>
                          ))
                        ) : (
                          <p className="text-[#575B52] font-medium text-base">No disponible</p>
                        )}
                      </div>
                    </div>

                    <div className="flex justify-around">
                      <div>
                        <h4 className="font-semibold text-center text-black">Altura</h4>
                        <p className="text-center text-lg text-blue-600 font-bold">{height}m</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-center text-black">Peso</h4>
                        <p className="text-center text-lg text-green-600 font-bold">{weight}kg</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-black">Estadísticas Base:</h4>
                      <div className="space-y-2">
                        {stats.map((s, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="capitalize font-medium text-black">
                              {statLabels[s.stat.name] ?? s.stat.name}:
                            </span>
                            <div className="flex items-center gap-2">
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                                  style={{ width: `${(s.base_stat / 150) * 100}%` }}
                                ></div>
                              </div>
                              <span className="font-bold text-sm w-8 text-black">{s.base_stat}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default PokemonDetailModal;
