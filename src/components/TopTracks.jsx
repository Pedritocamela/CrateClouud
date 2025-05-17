import { useState } from 'react';

const TopTracks = ({ isLoading, tracks = [], artistName }) => {
  const [timeRange, setTimeRange] = useState('overall'); // overall, 7day, 1month, 12month
  
  // Mapear opciones de tiempo para interfaz de usuario
  const timeRangeOptions = [
    { id: 'overall', label: 'De siempre' },
    { id: '7day', label: 'Últimos 7 días' },
    { id: '1month', label: 'Último mes' },
    { id: '12month', label: 'Último año' }
  ];
  
  // Función para formatear números de reproducciones
  const formatPlayCount = (count) => {
    if (!count) return "0";
    const num = parseInt(count);
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="glass rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-unbounded font-bold text-white mb-3 sm:mb-0">Temas populares</h2>
        
        {/* Selectores de tiempo */}
        <div className="flex space-x-1 bg-white/5 rounded-lg p-0.5 sm:p-1 text-xs sm:text-sm overflow-x-auto max-w-full">
          {timeRangeOptions.map(option => (
            <button
              key={option.id}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                timeRange === option.id 
                  ? 'bg-white/10 text-white' 
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
              onClick={() => setTimeRange(option.id)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Lista de canciones */}
      {isLoading ? (
        // Estado de carga
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white/5 h-16 rounded-lg animate-pulse"></div>
          ))}
        </div>
      ) : tracks.length > 0 ? (
        // Lista de canciones
        <div className="divide-y divide-white/10">
          {tracks.map((track, index) => (
            <div 
              key={index} 
              className="flex items-center py-2 sm:py-3 hover:bg-white/5 px-1 sm:px-2 -mx-2 rounded-lg transition-colors group cursor-pointer"
            >
              {/* Número */}
              <div className="w-6 sm:w-8 text-center text-white/50 font-mono text-xs sm:text-sm mr-2 sm:mr-3">
                {index + 1}
              </div>
              
              {/* Imagen del álbum (simulada) */}
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-800 to-purple-500 mr-2 sm:mr-3 rounded overflow-hidden flex-shrink-0">
                <img 
                  src={`https://source.unsplash.com/50x50/?music,album&sig=${index}-${artistName}`} 
                  alt={track.name}
                  className="w-full h-full object-cover opacity-60"
                />
              </div>
              
              {/* Información de la canción */}
              <div className="flex-1 min-w-0">
                <div className="text-white text-sm sm:text-base truncate">{track.name}</div>
                {track.artist && (
                  <div className="text-white/60 text-xs sm:text-sm truncate">{track.artist.name}</div>
                )}
              </div>
              
              {/* Reproducciones */}
              <div className="text-white/60 text-xs sm:text-sm ml-2 hidden xs:block">
                {formatPlayCount(track.playcount)} <span className="hidden sm:inline">reproducciones</span>
              </div>
              
              {/* Botón de reproducir (solo visual) */}
              <button className="ml-2 sm:ml-4 w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-white/50 hover:text-white opacity-70 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <i className="ri-play-circle-fill text-lg sm:text-xl"></i>
              </button>
            </div>
          ))}
        </div>
      ) : (
        // Sin datos
        <div className="text-center py-10">
          <div className="text-white/50 mb-2">No hay temas disponibles</div>
          <div className="text-sm text-white/30">Prueba con otro rango de tiempo o artista</div>
        </div>
      )}
    </div>
  );
};

export default TopTracks;