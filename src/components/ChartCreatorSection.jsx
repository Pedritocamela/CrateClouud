import { useState } from 'react';

const ChartCreatorSection = () => {
  const [chartName, setChartName] = useState('');
  const [chartSize, setChartSize] = useState('4x4');
  const [dataSource, setDataSource] = useState('lastfm');

  // Arreglo para previsualización de cuadrícula (solo visual)
  const gridSizes = {
    '3x3': Array(9).fill(0),
    '4x4': Array(16).fill(0),
    '5x5': Array(25).fill(0)
  };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Fondo con gradiente purpúra/violeta */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1D0B26] to-[#0D060F] opacity-95"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-full h-64 bg-purple-700 rounded-full filter blur-[180px] opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-64 bg-pink-500 rounded-full filter blur-[180px] opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="relative mb-8">
              <h2 className="text-3xl md:text-4xl font-bold font-unbounded leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-400 to-pink-300">
                Crea tus propios charts musicales
              </h2>
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-purple-600/20 rounded-full blur-xl"></div>
            </div>
            
            <p className="text-[rgba(255,255,255,0.8)] mb-10 text-lg">
              Muestra al mundo tus álbumes favoritos con nuestro creador de charts. Personaliza el tamaño, elige tus álbumes y comparte tu colección visual con tus amigos.
            </p>
            
            {/* Características del creador de charts */}
            <div className="space-y-6 mb-10">
              <div className="flex items-start glass p-4 rounded-xl border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg shadow-purple-500/20">
                  <i className="ri-layout-grid-line text-white"></i>
                </div>
                <div>
                  <h3 className="font-medium text-white text-lg">Múltiples configuraciones</h3>
                  <p className="text-sm text-[rgba(255,255,255,0.7)] mt-1">
                    Elige entre formatos 3×3, 4×4 y 5×5 para mostrar tus álbumes favoritos según tus preferencias.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start glass p-4 rounded-xl border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg shadow-purple-500/20">
                  <i className="ri-cloud-line text-white"></i>
                </div>
                <div>
                  <h3 className="font-medium text-white text-lg">Integración con Last.fm</h3>
                  <p className="text-sm text-[rgba(255,255,255,0.7)] mt-1">
                    Importa automáticamente tus álbumes más escuchados desde tu cuenta de Last.fm con un solo clic.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start glass p-4 rounded-xl border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-800 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg shadow-purple-500/20">
                  <i className="ri-share-line text-white"></i>
                </div>
                <div>
                  <h3 className="font-medium text-white text-lg">Compartir fácilmente</h3>
                  <p className="text-sm text-[rgba(255,255,255,0.7)] mt-1">
                    Exporta y comparte tus charts en redes sociales con un solo clic, o descárgalos en alta calidad.
                  </p>
                </div>
              </div>
            </div>
            
            <button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-full transition-all shadow-lg shadow-purple-700/30 hover:shadow-purple-700/50 flex items-center">
              <i className="ri-add-line mr-2"></i>
              <span>Crear mi primer chart</span>
            </button>
          </div>
          
          <div className="lg:w-1/2 mt-10 lg:mt-0">
            {/* Creador de charts */}
            <div className="glass rounded-xl overflow-hidden max-w-lg mx-auto border border-purple-500/30 backdrop-blur-lg shadow-xl shadow-purple-900/10">
              <div className="bg-[rgba(91,33,182,0.2)] p-5 border-b border-purple-500/20">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-500 rounded-lg flex items-center justify-center mr-3 shadow-lg shadow-purple-500/30">
                    <i className="ri-add-line text-white"></i>
                  </div>
                  <h3 className="font-unbounded font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
                    Crear nuevo chart
                  </h3>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm mb-2 text-purple-100 font-medium">Nombre del chart</label>
                  <input 
                    type="text" 
                    placeholder="Ej: Mis favoritos de 2023" 
                    className="w-full bg-[rgba(91,33,182,0.1)] border border-purple-500/30 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder-purple-300/50"
                    value={chartName}
                    onChange={(e) => setChartName(e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm mb-3 text-purple-100 font-medium">Configuración</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button 
                      className={`glass hover:bg-purple-600/20 rounded-lg p-3 text-center transition-all border ${
                        chartSize === '3x3' 
                          ? 'bg-purple-600/30 border-purple-500 shadow-lg shadow-purple-500/20' 
                          : 'border-purple-500/20 hover:border-purple-500/50'
                      }`}
                      onClick={() => setChartSize('3x3')}
                    >
                      <div className="font-unbounded font-medium text-white">3×3</div>
                      <div className="text-xs text-purple-200/70 mt-1">9 álbumes</div>
                    </button>
                    
                    <button 
                      className={`glass hover:bg-purple-600/20 rounded-lg p-3 text-center transition-all border ${
                        chartSize === '4x4' 
                          ? 'bg-purple-600/30 border-purple-500 shadow-lg shadow-purple-500/20' 
                          : 'border-purple-500/20 hover:border-purple-500/50'
                      }`}
                      onClick={() => setChartSize('4x4')}
                    >
                      <div className="font-unbounded font-medium text-white">4×4</div>
                      <div className="text-xs text-purple-200/70 mt-1">16 álbumes</div>
                    </button>
                    
                    <button 
                      className={`glass hover:bg-purple-600/20 rounded-lg p-3 text-center transition-all border ${
                        chartSize === '5x5' 
                          ? 'bg-purple-600/30 border-purple-500 shadow-lg shadow-purple-500/20' 
                          : 'border-purple-500/20 hover:border-purple-500/50'
                      }`}
                      onClick={() => setChartSize('5x5')}
                    >
                      <div className="font-unbounded font-medium text-white">5×5</div>
                      <div className="text-xs text-purple-200/70 mt-1">25 álbumes</div>
                    </button>
                  </div>
                </div>
                
                {/* Previsualización de la cuadrícula */}
                <div className="flex justify-center my-4">
                  <div className={`grid gap-1 ${
                    chartSize === '3x3' ? 'grid-cols-3 w-24 h-24' : 
                    chartSize === '4x4' ? 'grid-cols-4 w-28 h-28' : 
                    'grid-cols-5 w-32 h-32'
                  }`}>
                    {gridSizes[chartSize].map((_, i) => (
                      <div 
                        key={i} 
                        className="bg-purple-600/20 border border-purple-500/30 rounded-sm"
                      ></div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm mb-3 text-purple-100 font-medium">Fuente de datos</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button 
                      className={`glass hover:bg-purple-600/20 rounded-lg p-3 flex items-center justify-center transition-all border ${
                        dataSource === 'lastfm' 
                          ? 'bg-purple-600/30 border-purple-500' 
                          : 'border-purple-500/20 hover:border-purple-500/50'
                      }`}
                      onClick={() => setDataSource('lastfm')}
                    >
                      <i className="ri-user-3-line mr-2 text-purple-300"></i>
                      <span className="text-white">Last.fm</span>
                    </button>
                    
                    <button 
                      className={`glass hover:bg-purple-600/20 rounded-lg p-3 flex items-center justify-center transition-all border ${
                        dataSource === 'manual' 
                          ? 'bg-purple-600/30 border-purple-500' 
                          : 'border-purple-500/20 hover:border-purple-500/50'
                      }`}
                      onClick={() => setDataSource('manual')}
                    >
                      <i className="ri-edit-line mr-2 text-purple-300"></i>
                      <span className="text-white">Manual</span>
                    </button>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg shadow-purple-900/20">
                  Crear chart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChartCreatorSection;
