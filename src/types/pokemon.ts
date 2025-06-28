export interface Pokemon {
  types_array: never[];
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
  showPokemonDetailModal: boolean;
  setShowPokemonDetailModal: (value: boolean) => void;
}