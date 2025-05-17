import { useState } from 'react';

const ArtistInfo = ({ bio, tags = [] }) => {
  // Estado para controlar si se muestra el texto completo o recortado
  const [expanded, setExpanded] = useState(false);
  
  // Eliminar etiquetas HTML y enlaces a Last.fm si existen
  const cleanBio = bio ? bio
    .replace(/<a\s+href="[^"]*">|<\/a>/g, '') // Eliminar etiquetas <a> y </a>
    .replace(/Read more on Last\.fm.*$/, '') // Eliminar "Read more on Last.fm" y todo lo que sigue
    .replace(/\s+/g, ' ') // Reemplazar múltiples espacios con uno solo
    .trim() : '';
  
  // Versión recortada de la biografía (primeros 300 caracteres)
  const shortBio = cleanBio.length > 300 
    ? cleanBio.substring(0, 300) + '...' 
    : cleanBio;
  
  return (
    <div className="glass rounded-xl p-4 sm:p-6 mb-6 sm:mb-8">
      <h2 className="text-xl sm:text-2xl font-unbounded font-bold text-white mb-3 sm:mb-4">Sobre el artista</h2>
      
      {/* Biografía */}
      <div className="mb-6">
        <p className="text-white/80 text-sm md:text-base leading-relaxed">
          {expanded ? cleanBio : shortBio}
        </p>
        
        {cleanBio.length > 300 && (
          <button 
            onClick={() => setExpanded(!expanded)}
            className="text-purple-400 hover:text-purple-300 text-sm mt-2 transition-colors"
          >
            {expanded ? 'Mostrar menos' : 'Leer más'}
          </button>
        )}
      </div>
      
      {/* Etiquetas/Género */}
      <div>
        <h3 className="text-lg font-bold text-white mb-3">Géneros</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <div 
              key={index}
              className="bg-purple-900/40 hover:bg-purple-900/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-lg text-sm transition-colors cursor-pointer"
            >
              {tag.name}
            </div>
          ))}
          
          {tags.length === 0 && (
            <span className="text-white/50 text-sm">No hay información disponible</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArtistInfo;