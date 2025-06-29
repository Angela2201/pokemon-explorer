export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
  };
  stats: Array<{
    base_stat: number;
    stat: {
      name: string;
    };
  }>;
  types: Array<{
    slot: number;
    type: {
      name: string;
    };
  }>;
  base_health?: number | string;
  base_attack?: number | string;
  base_defense?: number | string;
  special_attack?: number | string;
  special_defense?: number | string;
  speed?: number | string;
  type1?: string;
  type2?: string;
  types_array?: string[];
  showPokemonDetailModal: boolean;
  setShowPokemonDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
};