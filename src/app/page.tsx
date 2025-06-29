"use client";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TableChartIcon from '@mui/icons-material/TableChart';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import Link from 'next/link';


export default function Home() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">Pokédex</h1>
          <div className='mt-10'>
            <p className="text-xl text-white/90 mb-8 drop-shadow">Descubre los 151 Pokémon de la primera generación</p>
          </div>
          <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full" />
        </div>

        <div className="max-w-xl lg:max-w-4xl mx-auto grid lg:grid-cols-2 gap-8">
          <Card className="group hover:scale-105 transition-all duration-300 shadow-2xl border-0 bg-white/95 backdrop-blur">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                <TableChartIcon className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Vista de Tabla</h2>
              <p className="text-gray-600 mb-6">
                Explora todos los Pokémon en una tabla detallada
              </p>
              <Link href="/table">
                <button className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-md cursor-pointer">
                  Ver Tabla
                </button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:scale-105 transition-all duration-300 shadow-2xl border-0 bg-white/95 backdrop-blur">
            <CardContent className="p-8 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300">
                <ViewModuleIcon className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Vista de Cuadrícula</h2>
              <p className="text-gray-600 mb-6">
                Navega por los Pokémon en tarjetas visuales con información detallada
              </p>
              <Link href="/grid">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md cursor-pointer">
                  Ver Cuadrícula
                </button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
