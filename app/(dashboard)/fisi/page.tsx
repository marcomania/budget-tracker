import Image from "next/image";
import { ChevronDown } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#6b1212] text-white">
      {/* Header with logo and navigation */}
      <header className="border-b border-[#7a1818]">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Image
              src="/logo-fisi.png"
              alt="Facultad de Ingeniería de Sistemas e Informática"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div className="text-sm leading-tight">
              <div className="font-semibold">FACULTAD DE INGENIERÍA DE</div>
              <div className="font-semibold">SISTEMAS E INFORMÁTICA</div>
            </div>
          </div>

          <nav className="hidden md:flex">
            <ul className="flex">
              <li className="relative group">
                <button className="px-3 py-2 flex items-center">
                  Facultad
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </li>
              <li className="relative group">
                <button className="px-3 py-2 flex items-center">
                  Pregrado
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </li>
              <li>
                <a href="#" className="px-3 py-2 block">
                  Posgrado
                </a>
              </li>
              <li className="relative group">
                <button className="px-3 py-2 flex items-center">
                  Investigación
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </li>
              <li className="relative group">
                <button className="px-3 py-2 flex items-center">
                  Docentes
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </li>
              <li className="relative group">
                <button className="px-3 py-2 flex items-center">
                  Estudiantes
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </li>
              <li className="relative group">
                <button className="px-3 py-2 flex items-center">
                  Egresados
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </li>
              <li className="relative group">
                <button className="px-3 py-2 flex items-center">
                  CERSEU
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="bg-[#5a1010] text-center py-1 text-sm">
          <a href="#" className="flex items-center justify-center">
            <span className="mr-1">📱</span> Smart-Campus
          </a>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left column - Conference title */}
          <div>
            <h1 className="text-4xl font-bold mb-4">
              {`Conferencia virtual "La evaluación en la Universidad"`}
            </h1>
            <div className="bg-[#3d0c0c] p-4 mt-4">
              <p>La Oficina de Calidad Académica y Acreditación...</p>
            </div>
          </div>

          {/* Right column - Conference banner */}
          <div>
            <div className="bg-[#8b1a1a] p-4 rounded-lg">
              <div className="bg-gradient-to-b from-[#8b1a1a] to-[#6b1212] p-4 rounded-lg">
                <div className="flex justify-between items-start mb-4">
                  <Image
                    src="/logo-fisi.png"
                    alt="UNMSM"
                    width={80}
                    height={80}
                  />
                  <div className="text-right">
                    <div className="text-sm">OFICINA DE CALIDAD</div>
                    <div className="text-sm">ACADÉMICA Y ACREDITACIÓN</div>
                    <div className="text-sm text-yellow-400">
                      Jueves de Calidad
                    </div>
                  </div>
                </div>

                <div className="text-center mb-4">
                  <div className="text-xl">Conferencia Virtual</div>
                  <div className="text-4xl font-bold mt-2">
                    LA EVALUACIÓN EN
                  </div>
                  <div className="text-4xl font-bold">LA UNIVERSIDAD</div>
                </div>

                <div className="bg-red-700 rounded-full text-center py-2 px-4 mt-6">
                  <span>Jueves 5 de junio, 2025</span>
                  <span className="mx-2">/</span>
                  <span>17:00 hrs.</span>
                  <span className="mx-2">/</span>
                  <span>Transmisión vía meet</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 my-12">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className={`h-1 w-8 ${i === 1 ? "bg-red-500" : "bg-white"}`}
            ></div>
          ))}
        </div>
      </main>

      {/* News section */}
      <section className="bg-gray-100 text-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mr-4">
              <span className="text-2xl">📰</span>
            </div>
            <h2 className="text-2xl font-bold">Noticias</h2>

            <div className="ml-auto flex gap-1">
              {[...Array(10)].map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full ${
                    i === 0 ? "bg-gray-500" : "bg-gray-300"
                  }`}
                ></div>
              ))}
              <div className="flex gap-1 ml-2">
                <button className="px-2">←</button>
                <button className="px-2">→</button>
                <button className="px-2">⏸</button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border border-gray-300 p-4">
                <div className="font-bold text-sm text-red-800 mb-2">
                  IMPORTANTE
                </div>
                <p className="text-sm">
                  {i === 0 && "Comunicado urgente: Carné"}
                  {i === 1 && "Programación de fecha de"}
                  {i === 2 && "Alumnos que registran datos"}
                  {i === 3 && "Lineamientos para el ingreso diario"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
