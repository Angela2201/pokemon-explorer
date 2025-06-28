"use client"

import { Dialog, DialogPanel, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Image from "next/image";
import { Pokemon } from "@/types/pokemon";

function PokemonDetailModal({ id, name, sprites, types, height, weight, stats, showPokemonDetailModal, setShowPokemonDetailModal }: Pokemon) {
  return (
    <>
      <Transition appear show={showPokemonDetailModal} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setShowPokemonDetailModal(false)}>
          <div className="fixed inset-0 bg-black/60 bg-opacity-60" />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <DialogPanel className="bg-[#E6E7E3] rounded-lg shadow-xl w-[600px] pb-6 max-h-full overflow-y-auto">
              <div className="bg-cover bg-top h-32 rounded-t-lg relative" style={{ backgroundImage: "url(/images/banner-modal.jpeg)" }}>
                <button
                  onClick={() => setShowPokemonDetailModal(false)}
                  className="bg-[#FAFAFA] p-3 rounded-full absolute z-10 right-2.5 top-2 cursor-pointer">
                  <Image
                    src="/icons/ic-times.svg"
                    alt="Close"
                    width={20}
                    height={20} />
                </button>
              </div>
              <div className="px-6">
                <div className="flex flex-row items-center gap-6">
                  <div className="relative z-10 bottom-12">
                    <Image
                      src={sprites.front_default}
                      alt={"character"}
                      width={128}
                      height={128}
                      className="rounded-full border-4 border-[#FAFAFA]"
                    />
                  </div>
                  <div className="w-full flex flex-row justify-between items-center bottom-6">
                    <div className="flex flex-col items-start relative">
                      <div className="flex flex-row gap-2 items-center">
                        <div>
                          <h3 className="text-[#333630] font-semibold text-lg">
                            {name}
                          </h3>
                        </div>
                      </div>
                      <div>
                        <p className="text-[#575B52] font-medium text-sm">
                          {id}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-4">
                  <div className="w-1/4 bg-[#FAFAFA] p-4 rounded-xl flex flex-col">
                    <p className="text-[#333630] text-base font-semibold">
                      Información
                    </p>
                    <div className="flex flex-col gap-6 mt-6">
                      <div className="flex flex-col gap-1">
                        <div>
                          <p className="text-[#828282] font-bold text-xs">
                            Tipo
                          </p>
                        </div>
                        <div>
                          {Array.isArray(types) && types.length > 0 ? (
                            types.map((item, id) => (
                              <div key={id}>
                                <p className="text-[#575B52] font-medium text-base">
                                  {item.type?.name ?? "Desconocido"}
                                </p>
                              </div>
                            ))
                          ) : (
                            <p className="text-[#575B52] font-medium text-base">No disponible</p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div>
                          <p className="text-[#828282] font-bold text-xs">
                            Altura
                          </p>
                        </div>
                        <div>
                          <p className="text-[#575B52] font-medium text-base">
                            {height}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div>
                          <p className="text-[#828282] font-bold text-xs">
                            Peso
                          </p>
                        </div>
                        <div>
                          <p className="text-[#575B52] font-medium text-base">
                            {weight}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="w-3/4 bg-[#FAFAFA] p-4 rounded-xl flex flex-col">
                    <div>
                      <p className="text-[#333630] text-base font-semibold">
                        Estadísticas base
                      </p>
                    </div>
                    {
                      stats.map((item, id) => (
                        <div key={id}>
                          <p className="text-black">
                            {item.base_stat}
                          </p>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default PokemonDetailModal;
