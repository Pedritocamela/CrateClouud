import ThemeCustomizer from './ThemeCustomizer';

const FeaturesSection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Fondo con gradiente morado */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1E1E1E] to-[#2D1A45] opacity-95"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-purple-500 rounded-full filter blur-[120px] opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-pink-500 rounded-full filter blur-[150px] opacity-15 animate-pulse" style={{animationDelay: "1.5s"}}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold font-unbounded mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">Descubre tu sonido con CrateCloud</h2>
          <p className="text-[rgba(255,255,255,0.8)] max-w-2xl mx-auto">
            La plataforma donde los amantes de la música comparten opiniones, reseñan álbumes y conectan a través de los sonidos que definen su identidad musical.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in" style={{animationDelay: "0.3s"}}>
          {/* Feature 1 - Reseñas y Opiniones */}
          <div className="glass rounded-2xl p-6 transition duration-300 hover:transform hover:scale-[1.02] border border-[rgba(156,39,176,0.3)] backdrop-blur-lg">
            <div className="w-14 h-14 bg-gradient-to-br from-[#9C27B0] to-[#E91E63] rounded-full flex items-center justify-center mb-5 shadow-lg shadow-purple-500/20">
              <i className="ri-chat-heart-line text-2xl"></i>
            </div>
            <h3 className="text-xl font-unbounded font-semibold mb-3 text-white">Comparte tus opiniones</h3>
            <p className="text-[rgba(255,255,255,0.8)]">
              Publica reseñas personales sobre tus álbumes favoritos, comparte tu interpretación y descubre las opiniones de otros fans sobre la música que amas.
            </p>
          </div>
          
          {/* Feature 2 - Charts */}
          <div className="glass rounded-2xl p-6 transition duration-300 hover:transform hover:scale-[1.02] border border-[rgba(156,39,176,0.3)] backdrop-blur-lg">
            <div className="w-14 h-14 bg-gradient-to-br from-[#9C27B0] to-[#673AB7] rounded-full flex items-center justify-center mb-5 shadow-lg shadow-purple-500/20">
              <i className="ri-stack-line text-2xl"></i>
            </div>
            <h3 className="text-xl font-unbounded font-semibold mb-3 text-white">Crea charts personalizados</h3>
            <p className="text-[rgba(255,255,255,0.8)]">
              Construye y personaliza grids de tus álbumes favoritos en formatos 3x3, 4x4 o 5x5 para compartir tus gustos musicales de manera visual y expresiva.
            </p>
          </div>
          
          {/* Feature 3 - Compatibilidad */}
          <div className="glass rounded-2xl p-6 transition duration-300 hover:transform hover:scale-[1.02] border border-[rgba(156,39,176,0.3)] backdrop-blur-lg">
            <div className="w-14 h-14 bg-gradient-to-br from-[#9C27B0] to-[#3F51B5] rounded-full flex items-center justify-center mb-5 shadow-lg shadow-purple-500/20">
              <i className="ri-user-heart-line text-2xl"></i>
            </div>
            <h3 className="text-xl font-unbounded font-semibold mb-3 text-white">Descubre compatibilidad</h3>
            <p className="text-[rgba(255,255,255,0.8)]">
              Encuentra amigos que comparten tus gustos musicales, recomendaciones personalizadas y descubre tu nivel de compatibilidad basado en tus reseñas.
            </p>
          </div>
          
          {/* Feature 4 - Descubrimiento */}
          <div className="glass rounded-2xl p-6 transition duration-300 hover:transform hover:scale-[1.02] border border-[rgba(156,39,176,0.3)] backdrop-blur-lg">
            <div className="w-14 h-14 bg-gradient-to-br from-[#9C27B0] to-[#2196F3] rounded-full flex items-center justify-center mb-5 shadow-lg shadow-purple-500/20">
              <i className="ri-compass-discover-line text-2xl"></i>
            </div>
            <h3 className="text-xl font-unbounded font-semibold mb-3 text-white">Explora nuevos sonidos</h3>
            <p className="text-[rgba(255,255,255,0.8)]">
              Descubre música nueva basada en las reseñas de usuarios con gustos similares a los tuyos. Amplía tu horizonte musical con recomendaciones precisas.
            </p>
          </div>
          
          {/* Feature 5 - Tendencias */}
          <div className="glass rounded-2xl p-6 transition duration-300 hover:transform hover:scale-[1.02] border border-[rgba(156,39,176,0.3)] backdrop-blur-lg">
            <div className="w-14 h-14 bg-gradient-to-br from-[#673AB7] to-[#E91E63] rounded-full flex items-center justify-center mb-5 shadow-lg shadow-purple-500/20">
              <i className="ri-fire-line text-2xl"></i>
            </div>
            <h3 className="text-xl font-unbounded font-semibold mb-3 text-white">Sigue las tendencias</h3>
            <p className="text-[rgba(255,255,255,0.8)]">
              Mantente al día con los álbumes populares, las reseñas más destacadas y las discusiones de actualidad en la comunidad musical de CrateCloud.
            </p>
          </div>
          
          {/* Feature 6 - Personalización */}
          <div className="glass rounded-2xl p-6 transition duration-300 hover:transform hover:scale-[1.02] border border-[rgba(156,39,176,0.3)] backdrop-blur-lg">
            <div className="w-14 h-14 bg-gradient-to-br from-[#9C27B0] to-[#3F51B5] rounded-full flex items-center justify-center mb-5 shadow-lg shadow-purple-500/20">
              <i className="ri-palette-line text-2xl"></i>
            </div>
            <h3 className="text-xl font-unbounded font-semibold mb-3 text-white">Personaliza tu experiencia</h3>
            <p className="text-[rgba(255,255,255,0.8)]">
              Adapta la interfaz a tu estilo con colores basados en tus álbumes favoritos y haz que CrateCloud refleje tu personalidad musical única.
            </p>
          </div>
        </div>
        
        {/* Personalizador de tema */}
        <div className="mt-16 animate-fade-in" style={{animationDelay: "0.5s"}}>
          <ThemeCustomizer />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
