import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

// Constante API key (misma que en ArtistPage)
const LASTFM_API_KEY = 'fa7895a669b7bb92119ffab279e52f60';

const ArtistAlbums = ({ artistName }) => {
  const [favoriteAlbums, setFavoriteAlbums] = useState(new Set());

  // Cargar favoritos del localStorage al inicio
  useEffect(() => {
    try {
      const saved = localStorage.getItem('favoriteAlbums');
      if (saved) {
        setFavoriteAlbums(new Set(JSON.parse(saved)));
      }
    } catch (err) {
      console.error('Error loading favorites from localStorage:', err);
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    if (favoriteAlbums.size > 0) {
      localStorage.setItem('favoriteAlbums', JSON.stringify(Array.from(favoriteAlbums)));
    }
  }, [favoriteAlbums]);

  // Consulta para obtener los álbumes del artista
  const { data: albumsData, isLoading } = useQuery({
    queryKey: ['albums', artistName],
    queryFn: async () => {
      try {
        const url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=${encodeURIComponent(artistName)}&api_key=${LASTFM_API_KEY}&format=json&limit=9`;
        console.log("URL para obtener álbumes:", url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          console.error("Error HTTP en álbumes:", response.status);
          return [];
        }
        
        const data = await response.json();
        console.log("Datos de álbumes recibidos:", data.topalbums ? "Sí" : "No");
        
        if (data.error) {
          console.error("Error en API de álbumes:", data.message);
          return [];
        }
        
        return data.topalbums?.album || [];
      } catch (err) {
        console.error('Error en obtención de álbumes:', err);
        return [];
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: !!artistName, // Sólo se ejecuta si artistName está disponible
  });
  
  // Función para alternar favorito
  const toggleFavorite = (albumId) => {
    setFavoriteAlbums(prev => {
      const newSet = new Set(prev);
      if (newSet.has(albumId)) {
        newSet.delete(albumId);
      } else {
        newSet.add(albumId);
      }
      return newSet;
    });
  };

  return (
    <div className="glass rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-unbounded font-bold text-white mb-4 sm:mb-5">Álbumes</h2>
      
      {isLoading ? (
        // Estado de carga
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-square bg-white/5 rounded-lg mb-2 sm:mb-3"></div>
              <div className="h-3 sm:h-4 bg-white/5 rounded w-3/4 mb-2"></div>
              <div className="h-2 sm:h-3 bg-white/5 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : albumsData && albumsData.length > 0 ? (
        // Grid de álbumes
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {albumsData.map((album, index) => {
            // Si la imagen es la predeterminada, usar alternativa
            const imageUrl = album.image?.[3]?.['#text']?.includes('2a96cbd8b46e442fc41c2b86b821562f')
              ? `https://source.unsplash.com/300x300/?album,vinyl&sig=${album.name}`
              : album.image?.[3]?.['#text'] || `https://source.unsplash.com/300x300/?album,vinyl&sig=${album.name}`;
            
            const albumId = album.mbid || `${artistName}-${album.name}`;
            const isFavorite = favoriteAlbums.has(albumId);
            
            return (
              <div key={index} className="group">
                <div className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-purple-800 to-purple-600 relative">
                  <img 
                    src={imageUrl} 
                    alt={album.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-2 sm:p-3 md:p-4">
                    <div className="self-end">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(albumId);
                        }}
                        className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-colors ${
                          isFavorite 
                            ? 'bg-pink-500 text-white' 
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <i className={`${isFavorite ? 'ri-heart-fill' : 'ri-heart-line'} text-base sm:text-lg`}></i>
                      </button>
                    </div>
                    
                    <div>
                      <div className="text-white font-medium text-xs sm:text-sm md:text-base truncate">{album.name}</div>
                      <div className="text-white/60 text-xs sm:text-sm flex items-center mt-1">
                        <i className="ri-play-fill mr-1"></i>
                        <span>{parseInt(album.playcount).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Info fuera del overlay para siempre visible */}
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium text-xs sm:text-sm md:text-base truncate">{album.name}</h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(albumId);
                      }}
                      className="text-md sm:text-lg ml-1 sm:ml-2 flex-shrink-0"
                    >
                      <i className={`${isFavorite ? 'ri-heart-fill text-pink-500' : 'ri-heart-line text-white/40 hover:text-white/60'} transition-colors`}></i>
                    </button>
                  </div>
                  {album.artist && (
                    <p className="text-white/60 text-xs sm:text-sm truncate">{album.artist.name}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Sin datos
        <div className="text-center py-8">
          <div className="text-white/50 mb-2">No se encontraron álbumes</div>
          <p className="text-white/30 text-sm">Prueba con otro artista o verifica el nombre</p>
        </div>
      )}
      
      {/* Botón para ver más */}
      {albumsData && albumsData.length > 0 && (
        <div className="text-center mt-4 sm:mt-6">
          <button className="bg-white/10 hover:bg-white/15 text-white py-1.5 sm:py-2 px-4 sm:px-6 rounded-full transition-colors text-xs sm:text-sm">
            Ver más álbumes
          </button>
        </div>
      )}
    </div>
  );
};

export default ArtistAlbums;