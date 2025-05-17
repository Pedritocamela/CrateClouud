import { useState } from 'react';

// Lista de oyentes simulados con sus canciones favoritas
const mockListeners = [
  { 
    id: 1, 
    username: 'SIMPFORSHAQ', 
    avatarUrl: 'https://source.unsplash.com/100x100/?person&sig=1',
    favoriteSong: 'What A Day'
  },
  { 
    id: 2, 
    username: 'kamsisthegoat', 
    avatarUrl: 'https://source.unsplash.com/100x100/?person&sig=2',
    favoriteSong: 'BLESSED' 
  },
  { 
    id: 3, 
    username: 'Spaghoooot', 
    avatarUrl: 'https://source.unsplash.com/100x100/?person&sig=3',
    favoriteSong: 'Sometimes...' 
  },
  { 
    id: 4, 
    username: 'Dqirt', 
    avatarUrl: 'https://source.unsplash.com/100x100/?person&sig=4',
    favoriteSong: 'WILSHIRE' 
  },
  { 
    id: 5, 
    username: 'thickd_daddy27', 
    avatarUrl: 'https://source.unsplash.com/100x100/?person&sig=5',
    favoriteSong: 'NOID' 
  },
  { 
    id: 6, 
    username: 'rottensarah', 
    avatarUrl: 'https://source.unsplash.com/100x100/?person&sig=6',
    favoriteSong: 'Domo23' 
  },
];

const Listeners = ({ artistName }) => {
  const [listeners] = useState(mockListeners);
  
  return (
    <div className="glass rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl sm:text-2xl font-unbounded font-bold text-white">Oyentes</h2>
      </div>

      {/* Grid de oyentes con sus canciones favoritas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6">
        {listeners.map(listener => (
          <div 
            key={listener.id} 
            className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer rounded-lg"
          >
            <img 
              src={listener.avatarUrl} 
              alt={listener.username}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover border-2 border-white/10"
            />
            <div>
              <div className="text-white font-medium text-sm sm:text-base">{listener.username}</div>
              <div className="text-white/60 text-xs sm:text-sm flex items-center">
                <span>Escucha mucho </span>
                <span className="text-purple-400 hover:underline ml-1">{listener.favoriteSong}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Botón de ver más */}
      <div className="text-center mt-4">
        <button className="text-white/50 hover:text-white/70 text-sm transition-colors">
          Ver más oyentes <i className="ri-arrow-right-s-line"></i>
        </button>
      </div>
    </div>
  );
};

export default Listeners;