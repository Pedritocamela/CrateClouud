import { useState, useEffect } from 'react';

const ArtistHeader = ({ name, imageUrl, listeners, playcount, tags = [] }) => {
  const [formattedListeners, setFormattedListeners] = useState('');
  const [formattedPlaycount, setFormattedPlaycount] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Cargar estado de favorito al iniciar
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem('favoriteArtists');
      if (savedFavorites) {
        const favorites = JSON.parse(savedFavorites);
        setIsFavorite(favorites.includes(name));
      }
    } catch (err) {
      console.error('Error loading favorite artists:', err);
    }
  }, [name]);
  
  // Función para guardar favoritos
  const saveFavoriteStatus = (newStatus) => {
    try {
      const savedFavorites = localStorage.getItem('favoriteArtists');
      let favorites = [];
      
      if (savedFavorites) {
        favorites = JSON.parse(savedFavorites);
      }
      
      if (newStatus && !favorites.includes(name)) {
        favorites.push(name);
      } else if (!newStatus && favorites.includes(name)) {
        favorites = favorites.filter(artist => artist !== name);
      }
      
      localStorage.setItem('favoriteArtists', JSON.stringify(favorites));
    } catch (err) {
      console.error('Error saving favorite artists:', err);
    }
  };
  
  // Función para toggle favorito
  const toggleFavorite = () => {
    const newStatus = !isFavorite;
    setIsFavorite(newStatus);
    saveFavoriteStatus(newStatus);
  };
  
  useEffect(() => {
    // Formatear números con separadores de miles
    if (listeners) {
      setFormattedListeners(parseInt(listeners).toLocaleString());
    }
    if (playcount) {
      setFormattedPlaycount(parseInt(playcount).toLocaleString());
    }
  }, [listeners, playcount]);

  // Si la imagen es la predeterminada de Last.fm, usar una imagen alternativa
  const finalImageUrl = imageUrl?.includes('2a96cbd8b46e442fc41c2b86b821562f') 
    ? `https://source.unsplash.com/featured/?concert,music,${encodeURIComponent(name)}` 
    : imageUrl;

  return (
    <div className="relative overflow-hidden rounded-2xl">
      {/* Imagen de fondo con overlay */}
      <div className="relative h-64 sm:h-80 md:h-96 bg-gradient-to-br from-purple-900 to-purple-700">
        {/* Imagen de fondo */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url(${finalImageUrl})` }}
        ></div>
        
        {/* Gradiente superior */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-transparent"></div>
        
        {/* Gradiente inferior más intenso para texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"></div>
        
        {/* Contenido */}
        <div className="absolute bottom-0 left-0 w-full p-4 sm:p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-end">
            {/* Imagen circular del artista para móvil y tablet */}
            <div className="relative mb-3 md:mb-0 md:mr-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-lg">
                <img 
                  src={finalImageUrl} 
                  alt={name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 rounded-full shadow-inner"></div>
            </div>
            
            <div className="flex-1 max-w-full">
              <div className="flex items-center mb-2 flex-wrap sm:flex-nowrap">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white font-unbounded leading-tight mr-3 break-words truncate">
                  {name}
                </h1>
                <button 
                  onClick={toggleFavorite}
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex-shrink-0 flex items-center justify-center transition-all transform hover:scale-110 ${
                    isFavorite 
                      ? 'bg-pink-500 text-white' 
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  <i className={`${isFavorite ? 'ri-heart-fill' : 'ri-heart-line'} text-lg sm:text-xl`}></i>
                </button>
              </div>
              
              {/* Tu contador personal */}
              <div className="mb-3">
                <div className="inline-flex items-center bg-gradient-to-r from-purple-600/80 to-purple-500/80 px-3 py-1.5 rounded-full backdrop-blur-sm shadow-lg">
                  <i className="ri-headphone-fill text-white mr-2 text-sm sm:text-base"></i>
                  <span className="text-white text-xs sm:text-sm">
                    Has escuchado a este artista <span className="font-bold text-white">87</span> veces
                  </span>
                </div>
              </div>
              
              {/* Estadísticas generales */}
              <div className="flex flex-wrap gap-2 sm:gap-4 mb-2">
                <div className="flex items-center">
                  <i className="ri-user-heart-line text-purple-300 mr-1"></i>
                  <span className="text-white/80 text-xs sm:text-sm">
                    <span className="font-bold text-white">{formattedListeners}</span> oyentes
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="ri-play-circle-line text-purple-300 mr-1"></i>
                  <span className="text-white/80 text-xs sm:text-sm">
                    <span className="font-bold text-white">{formattedPlaycount}</span> <span className="hidden xs:inline">reproducciones</span><span className="xs:hidden">reproducciones</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistHeader;