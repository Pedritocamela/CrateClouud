import { useRef, useEffect } from 'react';
import { albums } from '../data/albums';

const PopularAlbumsSection = () => {
  const carouselRef = useRef(null);
  const scrollIndicatorRef = useRef(null);
  
  useEffect(() => {
    // Configuración del comportamiento del carrusel con mouse drag
    const carousel = carouselRef.current;
    const scrollIndicator = scrollIndicatorRef.current;
    let isDown = false;
    let startX;
    let scrollLeft;
    
    if (carousel) {
      // Evitar la selección de texto durante el arrastre
      const disableSelection = () => {
        document.body.classList.add('select-none');
      };
      
      const enableSelection = () => {
        document.body.classList.remove('select-none');
      };
      
      const mouseDownHandler = (e) => {
        isDown = true;
        disableSelection(); // Desactivar selección al comenzar arrastre
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
      };
      
      const mouseLeaveHandler = () => {
        if (isDown) {
          isDown = false;
          enableSelection(); // Reactivar selección
          carousel.style.cursor = 'grab';
        }
      };
      
      const mouseUpHandler = () => {
        if (isDown) {
          isDown = false;
          enableSelection(); // Reactivar selección
          carousel.style.cursor = 'grab';
        }
      };
      
      const updateScrollIndicator = () => {
        if (carousel && scrollIndicator) {
          // Calcular porcentaje de desplazamiento
          const scrollPercentage = carousel.scrollLeft / (carousel.scrollWidth - carousel.clientWidth);
          
          // Asegurarse de que el valor esté entre 0 y 1
          const clampedPercentage = Math.max(0, Math.min(1, scrollPercentage));
          
          // Actualizar posición del indicador
          const maxTranslateX = scrollIndicator.parentNode.clientWidth - scrollIndicator.clientWidth;
          scrollIndicator.style.transform = `translateX(${clampedPercentage * maxTranslateX}px)`;
        }
      };
      
      const mouseMoveHandler = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Velocidad de scroll
        carousel.scrollLeft = scrollLeft - walk;
        updateScrollIndicator();
      };
      
      // Actualizar el indicador cuando se desplaza con el scroll de la rueda del mouse
      const scrollHandler = () => {
        updateScrollIndicator();
      };
      
      carousel.addEventListener('mousedown', mouseDownHandler);
      carousel.addEventListener('mouseleave', mouseLeaveHandler);
      carousel.addEventListener('mouseup', mouseUpHandler);
      carousel.addEventListener('mousemove', mouseMoveHandler);
      carousel.addEventListener('scroll', scrollHandler);
      
      // Inicializar el indicador
      updateScrollIndicator();
      
      // Limpiar los event listeners al desmontar el componente
      return () => {
        carousel.removeEventListener('mousedown', mouseDownHandler);
        carousel.removeEventListener('mouseleave', mouseLeaveHandler);
        carousel.removeEventListener('mouseup', mouseUpHandler);
        carousel.removeEventListener('mousemove', mouseMoveHandler);
        carousel.removeEventListener('scroll', scrollHandler);
        enableSelection(); // Asegurarnos de que la selección esté habilitada
      };
    }
  }, []);

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#0F0F0F] to-[#1A0F2E]">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"></div>
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-600 rounded-full filter blur-[150px] opacity-10"></div>
      <div className="absolute -bottom-20 left-20 w-60 h-60 bg-blue-500 rounded-full filter blur-[120px] opacity-10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-unbounded mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-100">
              Álbumes populares
            </h2>
            <p className="text-sm text-purple-300/70 max-w-xl">
              Descubre los álbumes que más tendencia están marcando en la comunidad
            </p>
          </div>
          <button className="mt-4 md:mt-0 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 hover:text-white font-medium py-2 px-6 rounded-full flex items-center transition-all border border-purple-500/30">
            Ver todos <i className="ri-arrow-right-line ml-2"></i>
          </button>
        </div>
        
        {/* Carousel de álbumes populares */}
        <div 
          ref={carouselRef}
          className="carousel relative flex space-x-6 overflow-x-auto pb-10 snap-x"
          style={{ cursor: 'grab' }}
        >
          {albums.map((album, index) => (
            <div 
              key={index}
              className="album-card snap-start flex-shrink-0 w-48 md:w-60 glass rounded-xl overflow-hidden shadow-lg shadow-purple-900/10 border border-white/5 backdrop-blur-lg"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="relative overflow-hidden group">
                <img 
                  src={album.cover} 
                  alt={`Álbum ${album.title}`} 
                  className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
                  <button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full w-10 h-10 flex items-center justify-center mb-2 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    <i className="ri-play-fill text-xl"></i>
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-white truncate">{album.title}</h3>
                <p className="text-sm text-[rgba(255,255,255,0.7)] truncate">{album.artist}</p>
                <div className="mt-2 flex items-center text-xs text-purple-300/70">
                  <i className="ri-heart-line mr-1"></i>
                  <span>{Math.floor(Math.random() * 5000) + 1000}</span>
                  <span className="mx-2">•</span>
                  <i className="ri-play-circle-line mr-1"></i>
                  <span>{Math.floor(Math.random() * 100) + 10}K</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Indicador de scroll */}
        <div className="flex justify-center mt-4">
          <div className="w-40 h-1.5 rounded-full bg-purple-800/30 relative overflow-hidden">
            <div 
              ref={scrollIndicatorRef}
              className="absolute top-0 left-0 h-full w-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-transform duration-150 ease-out"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularAlbumsSection;
