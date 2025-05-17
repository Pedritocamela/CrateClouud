// Componente para el panel lateral de álbumes en el chart
// Muestra una lista de álbumes agrupados por fila, similar a la imagen de ejemplo

import React from 'react';

const AlbumSidebar = ({ 
  albums, // Lista de álbumes
  customSize, // Dimensiones del chart (width, height)
  fontFamily, // Fuente seleccionada
  textColor, // Color del texto
  backgroundColor, // Color de fondo
  showPlayCount, // Mostrar reproducciones
  displayMode = 'album', // Modo de visualización: 'album' o 'artist'
  advancedOptions = {} // Opciones avanzadas para configuración
}) => {
  if (!albums || albums.length === 0) {
    return (
      <div className="py-3 opacity-50 text-center">
        Añade álbumes para ver su información
      </div>
    );
  }

  // Validación de seguridad para evitar errores con customSize.width
  const width = customSize && customSize.width ? customSize.width : 1;
  
  // Función para comprobar si el álbum es el último de su fila
  const isLastInRow = (index) => {
    return (index + 1) % width === 0 || index === albums.length - 1;
  }
  
  // Agrupar álbumes por filas para mostrarlos juntos de forma segura
  const albumRows = [];
  if (width > 0) {
    for (let i = 0; i < albums.length; i += width) {
      albumRows.push(albums.slice(i, Math.min(i + width, albums.length)));
    }
  } else {
    // Si por alguna razón width es 0, mostramos todos en una sola fila
    albumRows.push(albums);
  }
  
  return (
    <div className="h-full relative">
      {/* Colocamos los títulos alineados con los álbumes */}
      <div className="absolute inset-0">
        {/* Solo mostrar títulos en la última fila */}
        {Array.from({ length: Math.ceil(albums.length / width) }).map((_, rowIndex) => {
          // Calculamos qué álbumes pertenecen a esta fila
          const rowAlbums = albums.slice(rowIndex * width, Math.min((rowIndex + 1) * width, albums.length));
          
          // Si no hay álbumes en esta fila, no mostrar nada
          if (rowAlbums.length === 0) return null;
          
          // Calcular la altura de esta fila según el grid
          const rowHeight = 100; // Altura aproximada en píxeles de cada fila
          
          return (
            <div 
              key={`row-${rowIndex}`} 
              className="flex items-start gap-1"
              style={{
                position: 'absolute',
                // Posicionar cada fila alineada con su correspondiente en el grid
                top: `${rowIndex * rowHeight + (rowIndex * (advancedOptions?.gap || 0)) + 25}px`,
                left: 0,
                right: 0
              }}
            >
              {/* Mostrar todos los álbumes de la fila actual */}
              <div className="w-full">
                {albums.slice(rowIndex * width, rowIndex * width + width).map((rowAlbum, rowAlbumIndex) => {
                  const globalIndex = rowIndex * width + rowAlbumIndex;
                  
                  return (
                    <div 
                      key={rowAlbum.id}
                      className="flex items-baseline gap-1 mb-1"
                    >
                      <span className="opacity-90 w-4 text-right text-xs">{globalIndex + 1}.</span>
                      <div className="flex-1 overflow-visible">
                        {/* Elemento principal (álbum o artista según selección) */}
                        <span 
                          className="font-medium" 
                          style={{
                            fontSize: (displayMode === 'album' ? rowAlbum.title : rowAlbum.artist).length > 15 ? 
                                    '0.7rem' : '0.75rem',
                            display: 'block',
                            wordBreak: 'break-word',
                            lineHeight: '1.1'
                          }}
                        >
                          {displayMode === 'album' ? rowAlbum.title : rowAlbum.artist}
                        </span>
                        
                        {/* Elemento secundario (artista o álbum según selección) */}
                        <span 
                          className="opacity-70 text-xs"
                          style={{
                            fontSize: '0.65rem',
                            display: 'block',
                            wordBreak: 'break-word'
                          }}
                        >
                          {displayMode === 'album' ? rowAlbum.artist : rowAlbum.title}
                        </span>
                        
                        {/* Reproducciones si están habilitadas */}
                        {showPlayCount && rowAlbum.plays > 0 && (
                          <span className="opacity-50 text-xs">({rowAlbum.plays})</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlbumSidebar;