import { Link } from 'wouter';

const SimilarArtists = ({ isLoading, artists = [] }) => {
  return (
    <div className="glass rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-unbounded font-bold text-white mb-5">Artistas similares</h2>
      
      {isLoading ? (
        // Estado de carga
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="rounded-lg bg-white/5 aspect-square mb-2"></div>
              <div className="bg-white/5 h-4 rounded w-3/4 mb-1"></div>
              <div className="bg-white/5 h-3 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : artists.length > 0 ? (
        // Grid de artistas similares
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {artists.map((artist, index) => {
            // Si la imagen es la predeterminada de Last.fm, usar una imagen alternativa
            const imageUrl = artist.image?.[2]?.['#text']?.includes('2a96cbd8b46e442fc41c2b86b821562f')
              ? `https://source.unsplash.com/300x300/?music,artist&sig=${artist.name}`
              : artist.image?.[2]?.['#text'] || `https://source.unsplash.com/300x300/?music,artist&sig=${artist.name}`;
              
            return (
              <Link key={index} href={`/artist/${encodeURIComponent(artist.name)}`}>
                <div className="cursor-pointer group">
                  {/* Imagen del artista */}
                  <div className="rounded-lg overflow-hidden bg-gradient-to-br from-purple-800 to-purple-600 aspect-square mb-2 shadow-md">
                    <div className="w-full h-full relative">
                      <img 
                        src={imageUrl} 
                        alt={artist.name} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <i className="ri-play-fill text-xl text-white"></i>
                      </div>
                    </div>
                  </div>
                  
                  {/* Información del artista */}
                  <div className="truncate text-white font-medium text-sm group-hover:text-purple-300 transition-colors">
                    {artist.name}
                  </div>
                  {artist.match && (
                    <div className="text-white/50 text-xs truncate">
                      Coincidencia: {(parseFloat(artist.match) * 100).toFixed(0)}%
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        // Sin datos
        <div className="text-center py-10">
          <div className="text-white/50 mb-2">No se encontraron artistas similares</div>
        </div>
      )}
    </div>
  );
};

export default SimilarArtists;