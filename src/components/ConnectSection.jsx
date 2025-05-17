import { friends } from '../data/friends';

const ConnectSection = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#120A1E] to-[#1E0931]">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
      <div className="absolute top-40 right-20 w-80 h-80 bg-purple-600 rounded-full filter blur-[180px] opacity-10"></div>
      <div className="absolute bottom-20 -left-20 w-80 h-80 bg-pink-500 rounded-full filter blur-[180px] opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold font-unbounded mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-400 to-pink-300">
            Conecta con otros amantes de la música
          </h2>
          <p className="text-[rgba(255,255,255,0.8)] max-w-2xl mx-auto">
            Descubre personas que escuchan lo mismo que tú, comparte recomendaciones y encuentra tu comunidad musical.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {friends.map((friend, index) => (
            <div 
              key={index} 
              className="glass rounded-xl p-6 transition-all duration-300 hover:transform hover:scale-[1.02] border border-purple-500/20 backdrop-blur-lg shadow-lg shadow-purple-900/10 relative group"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className="absolute -inset-px bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="flex items-center mb-5 relative">
                {/* Foto de perfil de usuario con efecto glow */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-sm opacity-60 group-hover:opacity-80 transition-opacity"></div>
                  <img 
                    src={friend.avatar} 
                    alt={`Foto de perfil de ${friend.name}`} 
                    className="w-14 h-14 rounded-full object-cover border-2 border-white/20 relative z-10"
                  />
                </div>
                
                <div className="ml-4">
                  <h3 className="font-medium text-white text-lg">{friend.name}</h3>
                  <div className="flex items-center mt-1.5">
                    <div className="h-2 w-24 bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500" 
                        style={{width: `${friend.compatibility}%`}}
                      ></div>
                    </div>
                    <span className="text-xs ml-2 text-purple-200">{friend.compatibility}% de compatibilidad</span>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-purple-300 mb-3 font-medium">Últimos álbumes escuchados:</p>
              <div className="flex space-x-3">
                {friend.recentAlbums.map((album, idx) => (
                  <div key={idx} className="relative group/album">
                    <img 
                      src={album} 
                      alt="Álbum" 
                      className="w-16 h-16 rounded-md object-cover transition-transform duration-300 group-hover/album:scale-105 shadow-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/album:opacity-100 transition-opacity rounded-md flex items-end justify-center">
                      <button className="bg-purple-600/80 hover:bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center mb-1 transform translate-y-4 group-hover/album:translate-y-0 transition-transform duration-300">
                        <i className="ri-play-fill text-xs"></i>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-5 pt-4 border-t border-purple-500/20">
                <button className="w-full text-center text-purple-300 hover:text-white text-sm flex items-center justify-center group-hover:underline transition-colors">
                  <i className="ri-user-add-line mr-1"></i>
                  <span>Ver perfil</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-full transition-all shadow-lg shadow-purple-900/20 flex items-center mx-auto">
            <i className="ri-user-search-line mr-2"></i>
            <span>Ver más personas</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConnectSection;
