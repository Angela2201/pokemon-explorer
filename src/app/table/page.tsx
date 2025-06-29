"use client";

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { Pokemon } from '@/types/pokemon';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText
} from '@mui/material';
import WestIcon from '@mui/icons-material/West';
import PokemonDetailModal from '@/components/PokemonDetailModal';

function Page() {

  const [apiData] = useState({
    url: "https://pokeapi.co/api/v2/pokemon?offset=151&limit=151"
  });

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPokemon, setSelectedPokemon] = useState<Pokemon | null>(null);
  const [showPokemonDetailModal, setShowPokemonDetailModal] = useState(false);

  useEffect(() => {
    fetch(apiData.url)
      .then((res) => res.json())
      .then((data) => {
        const urls = data.results.map((pokemon: { url: string }) => pokemon.url);

        Promise.all(urls.map((url: string) => fetch(url).then(res => res.json())))
          .then((detailedPokemons) => {
            const enrichedPokemons = detailedPokemons.map((pokemon: Pokemon) => {
              const statsMap = Object.fromEntries(
                pokemon.stats.map((s: { stat: { name: string }, base_stat: number }) => [s.stat.name, s.base_stat])
              );

              const type1 = pokemon.types?.[0]?.type.name ?? "";
              const type2 = pokemon.types?.[1]?.type.name ?? "";
              const types_display = type2 ? `${type1} / ${type2}` : type1;

              return {
                ...pokemon,
                base_health: statsMap['hp'] ?? '',
                base_attack: statsMap['attack'] ?? '',
                base_defense: statsMap['defense'] ?? '',
                special_attack: statsMap['special-attack'] ?? '',
                special_defense: statsMap['special-defense'] ?? '',
                speed: statsMap['speed'] ?? '',
                type1,
                type2,
                types_display,
                types_array: [type1, type2].filter(Boolean),
              };
            });

            setPokemons(enrichedPokemons);
          })
          .catch((error) => console.error("Error fetching Pokémon details", error));
      })
      .catch((error) => console.error("Error fetching list of Pokémon", error));
  }, [apiData]);

  const allTypes = Array.from(
    new Set(pokemons.flatMap((p) => p.types_array ?? []))
  ).sort();

  const filteredPokemons = selectedTypes.length === 0
    ? pokemons
    : pokemons.filter((p) =>
      p.types_array?.some((type: string) => selectedTypes.includes(type))
    );

  const columns: GridColDef[] = [
    {
      field: 'image',
      headerName: 'Imagen',
      width: 100,
      renderCell: (params) => (
        <Image
          width={60}
          height={60}
          src={params.row.sprites.front_default}
          alt={params.row.name}
          className="flex justify-center items-center"
        />
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: 'name',
      headerName: 'Nombre',
      width: 125
    },
    {
      field: 'types_display',
      headerName: 'Tipo(s)',
      width: 120,
      sortComparator: (a, b) => a.localeCompare(b),
    },
    {
      field: 'weight',
      headerName: 'Peso(Kg)',
      width: 80
    },
    {
      field: 'height',
      headerName: 'Altura (m)',
      width: 80
    },
    {
      field: 'base_health',
      headerName: 'Salud base',
      width: 90
    },
    {
      field: 'base_experience',
      headerName: 'Experiencia base',
      width: 125
    },
    {
      field: 'base_attack',
      headerName: 'Ataque base',
      width: 100,
    },
    {
      field: 'base_defense',
      headerName: 'Defensa base',
      width: 110
    },
    {
      field: 'special_attack',
      headerName: 'Ataque especial',
      width: 125
    },
    {
      field: 'special_defense',
      headerName: 'Defensa especial',
      width: 130
    },
    {
      field: 'speed',
      headerName: 'Velocidad',
      width: 80
    },
    {
      field: 'see-details',
      headerName: 'Ver detalles',
      width: 100,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            setSelectedPokemon(params.row);
            setShowPokemonDetailModal(true);
          }}
        >
          Ver
        </Button>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className='flex flex-row gap-1 md:gap-3 items-center text-xs md:text-lg font-bold text-gray-800 border border-gray-500/35 p-2 rounded-lg'>
              <WestIcon className='w-2 h-2' />
              Volver
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Vista de Tabla</h1>
          </div>
        </div>
        <Box sx={{ height: 600, width: '100%', paddingY: 4 }}>
          <Box display="flex" alignItems="center" gap={2} mb={2}>
            <FormControl sx={{ minWidth: 300 }}>
              <InputLabel id="type-filter-label">Filtrar por tipo</InputLabel>
              <Select
                labelId="type-filter-label"
                multiple
                value={selectedTypes}
                onChange={(e) => setSelectedTypes(e.target.value as string[])}
                renderValue={(selected) => selected.join(", ")}
                label="Filtrar por tipo"
              >
                {allTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    <Checkbox checked={selectedTypes.includes(type)} />
                    <ListItemText primary={type} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button variant="outlined" onClick={() => setSelectedTypes([])}>
              Limpiar filtro
            </Button>
          </Box>

          <DataGrid
            rows={filteredPokemons}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[10, 20, 30, 40, 50]}
            pagination
            getRowId={(row) => row.id}
          />

          {selectedPokemon && (
            <PokemonDetailModal
              id={selectedPokemon.id}
              name={selectedPokemon.name}
              sprites={selectedPokemon.sprites}
              types={selectedPokemon.types}
              height={selectedPokemon.height}
              weight={selectedPokemon.weight}
              stats={selectedPokemon.stats}
              base_experience={selectedPokemon.base_experience}
              showPokemonDetailModal={showPokemonDetailModal}
              setShowPokemonDetailModal={setShowPokemonDetailModal}
              types_array={[]}
            />
          )}
        </Box>
      </div>
    </div>
  );
}

export default Page;
