import React from 'react';

const ArtistLinks = ({ url, name, ontour = false }) => {
  // Simulación de algunos enlaces sociales basados en el nombre del artista
  const socialLinks = [
    { 
      name: 'Spotify', 
      icon: 'ri-spotify-fill',
      url: `https://open.spotify.com/search/${encodeURIComponent(name)}`
    },
    { 
      name: 'YouTube Music', 
      icon: 'ri-youtube-fill',
      url: `https://music.youtube.com/search?q=${encodeURIComponent(name)}`
    },
    { 
      name: 'Apple Music', 
      icon: 'ri-apple-fill',
      url: `https://music.apple.com/us/search?term=${encodeURIComponent(name)}`
    },
    { 
      name: 'Instagram', 
      icon: 'ri-instagram-line',
      url: `https://www.instagram.com/${name.toLowerCase().replace(/\s+/g, '')}`
    }
  ];

  return (
    <>
      {/* Widget de enlaces */}
      <div className="glass rounded-xl p-5 mb-6">
        <h3 className="text-lg font-bold text-white mb-4">Enlaces</h3>
        
        {/* Perfil en Last.fm */}
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors mb-3"
        >
          <div className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full flex-shrink-0">
            <i className="ri-lastfm-fill"></i>
          </div>
          <div className="flex-1">
            <div className="text-white font-medium">Last.fm</div>
            <div className="text-white/50 text-xs truncate">Perfil oficial</div>
          </div>
          <i className="ri-external-link-line text-white/50"></i>
        </a>
        
        {/* Enlaces a redes sociales */}
        <div className="space-y-2 mt-4">
          {socialLinks.map((link, index) => (
            <a 
              key={index}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-2 hover:bg-white/5 rounded-lg transition-colors text-white/70 hover:text-white"
            >
              <i className={`${link.icon} text-lg`}></i>
              <span>{link.name}</span>
            </a>
          ))}
        </div>
      </div>
      
      {/* Estado de gira */}
      <div className={`glass rounded-xl p-5 mb-6 ${ontour ? 'border border-green-500/30' : ''}`}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            ontour ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-white/40'
          }`}>
            <i className="ri-mic-fill text-xl"></i>
          </div>
          <div>
            <div className="font-bold text-white">Estado de gira</div>
            <div className={ontour ? 'text-green-400' : 'text-white/50'}>
              {ontour ? 'Actualmente en gira' : 'No hay giras programadas'}
            </div>
          </div>
        </div>
        
        {ontour && (
          <button className="w-full mt-4 bg-green-500/20 hover:bg-green-500/30 text-green-400 py-2 rounded-lg transition-colors">
            Ver conciertos
          </button>
        )}
      </div>
      
      {/* Widget de compartir */}
      <div className="glass rounded-xl p-5">
        <h3 className="text-lg font-bold text-white mb-4">Compartir</h3>
        <div className="flex justify-between">
          <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors">
            <i className="ri-twitter-x-line"></i>
          </button>
          <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors">
            <i className="ri-facebook-fill"></i>
          </button>
          <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors">
            <i className="ri-whatsapp-line"></i>
          </button>
          <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors">
            <i className="ri-telegram-line"></i>
          </button>
          <button className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors">
            <i className="ri-link"></i>
          </button>
        </div>
      </div>
    </>
  );
};

export default ArtistLinks;