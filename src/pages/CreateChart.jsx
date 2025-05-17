import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AlbumSidebar from '../components/AlbumSidebar';
import html2canvas from 'html2canvas';

const CreateChart = () => {
  // Referencia al contenedor del chart para exportar como imagen
  const chartRef = useRef(null);
  
  // Estados para las diferentes opciones de personalización
  const [chartTitle, setChartTitle] = useState(''); // Título del chart
  const [customSize, setCustomSize] = useState({ width: 7, height: 7 }); // Tamaño personalizado del chart
  const [chartType, setChartType] = useState('grid'); // Tipo de visualización: grid (cuadrícula), collage, list (lista)
  const [colorScheme, setColorScheme] = useState('default'); // Esquema de colores: default (normal), rainbow (arcoíris), brightness (brillo)
  const [dataSource, setDataSource] = useState('manual'); // Origen de datos: manual, lastfm
  const [albums, setAlbums] = useState([]); // Array de álbumes añadidos
  const [showAddAlbumModal, setShowAddAlbumModal] = useState(false); // Control de visibilidad del modal para añadir
  const [showEditAlbumModal, setShowEditAlbumModal] = useState(false); // Modal para editar álbum
  const [albumToEdit, setAlbumToEdit] = useState(null); // Álbum seleccionado para editar
  
  // Opciones avanzadas de personalización
  const [advancedOptions, setAdvancedOptions] = useState({
    gap: 2, // Espacio entre imágenes (en píxeles)
    backgroundColor: '#121212', // Color de fondo
    borderRadius: 8, // Radio de borde para las imágenes
    showSidebar: true, // Mostrar barra lateral con lista de álbumes
    showPlayCount: true, // Mostrar contador de reproducciones
    fontFamily: 'Inter', // Fuente para los textos
    textColor: '#ffffff', // Color de la fuente
    displayMode: 'album', // Modo de visualización: 'album' o 'artist'
    timeRange: 'all', // Rango de tiempo para los datos: all, day, week, month, year, custom
    customTimeRange: { // Rango personalizado
      weeks: 0,
      days: 0,
      months: 0
    }
  });
  
  const [newAlbum, setNewAlbum] = useState({ 
    title: '', // Título del álbum
    artist: '', // Artista del álbum
    cover: '', // URL de la portada
    review: '', // Reseña o comentario (opcional)
    plays: 0 // Número de reproducciones
  });
  
  // Lista de fuentes disponibles
  const availableFonts = [
    { name: 'Inter', value: 'Inter, sans-serif' },
    { name: 'Unbounded', value: 'Unbounded, cursive' },
    { name: 'Monospace', value: 'monospace' },
    { name: 'Roboto', value: 'Roboto, sans-serif' },
    { name: 'Poppins', value: 'Poppins, sans-serif' }
  ];

  // Manejar cambio en tamaño personalizado
  const handleCustomSizeChange = (axis, value) => {
    // Limitar valores entre 1 y 20
    const validValue = Math.max(1, Math.min(20, value));
    setCustomSize({
      ...customSize,
      [axis]: validValue
    });
  };

  // Obtener dimensiones de la cuadrícula
  const getGridDimensions = () => {
    // Asegurar que los valores sean válidos para evitar errores
    const validHeight = Math.max(1, Math.min(20, customSize.height));
    const validWidth = Math.max(1, Math.min(20, customSize.width));
    return { rows: validHeight, cols: validWidth };
  };

  const { rows, cols } = getGridDimensions();
  const totalSlots = rows * cols; // Total de espacios para álbumes

  // Función para añadir un nuevo álbum al chart
  const handleAddAlbum = () => {
    if (albums.length < totalSlots) {
      const albumWithId = { ...newAlbum, id: Date.now() }; // Añadir ID único al álbum
      setAlbums([...albums, albumWithId]); // Añadir a la lista de álbumes
      setNewAlbum({ title: '', artist: '', cover: '', review: '', plays: 0 }); // Resetear formulario
      setShowAddAlbumModal(false); // Cerrar modal
    }
  };
  
  // Función para manejar la apertura del modal de añadir álbum
  const handleOpenAddModal = () => {
    // Si estamos en modo Last.fm, no permitimos añadir álbumes manualmente
    if (dataSource === 'lastfm') {
      return;
    }
    setShowAddAlbumModal(true);
  };
  
  // Función para exportar el chart como imagen PNG
  const exportChartAsImage = () => {
    if (!chartRef.current) return;
    
    // Mostrar mensaje de estado
    alert('Generando imagen. Por favor, espera unos segundos...');
    
    html2canvas(chartRef.current, {
      backgroundColor: advancedOptions.backgroundColor,
      scale: 2, // Mayor calidad de imagen
      allowTaint: true,
      useCORS: true
    }).then(canvas => {
      // Crear un enlace para descargar la imagen
      const link = document.createElement('a');
      link.download = `${chartTitle || 'chart'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }).catch(err => {
      console.error('Error al generar la imagen:', err);
      alert('Error al generar la imagen. Por favor, intenta de nuevo.');
    });
  };

  const handleOpenEditModal = (album) => {
    setAlbumToEdit(album);
    setNewAlbum({ ...album }); // Usar la misma estructura de newAlbum para el formulario
    setShowEditAlbumModal(true);
  };
  
  // Función para guardar los cambios de un álbum editado
  const handleSaveEditedAlbum = () => {
    // Actualizar el álbum en el array manteniendo el mismo ID
    const updatedAlbums = albums.map(album => 
      album.id === albumToEdit.id ? { ...newAlbum, id: album.id } : album
    );
    setAlbums(updatedAlbums);
    // Limpiar estados y cerrar modal
    setNewAlbum({ title: '', artist: '', cover: '', review: '', plays: 0 });
    setAlbumToEdit(null);
    setShowEditAlbumModal(false);
  };

  // Función para generar el contenido del chart según el tipo seleccionado
  const renderChartContent = () => {
    // Validamos que totalSlots sea un número positivo
    const validTotalSlots = Math.max(0, totalSlots);
    
    // Creamos espacios vacíos para completar la cuadrícula (asegurándonos de que sea un número no negativo)
    const emptySlotCount = Math.max(0, validTotalSlots - albums.length);
    const emptySlots = Array(emptySlotCount).fill(null);
    
    // Si hay más álbumes que espacios, solo mostramos los que caben en el grid
    const visibleAlbums = albums.length > validTotalSlots 
      ? albums.slice(0, validTotalSlots) 
      : albums;
      
    const allSlots = [...visibleAlbums, ...emptySlots]; // Combinamos álbumes y espacios vacíos

    // Visualización en cuadrícula (grid)
    if (chartType === 'grid') {
      return (
        <div 
          className="grid"
          style={{ 
            gridTemplateColumns: `repeat(${cols}, 1fr)`, // Columnas según tamaño elegido
            gridTemplateRows: `repeat(${rows}, 1fr)`,    // Filas según tamaño elegido
            gap: `${advancedOptions.gap}px`              // Espacio entre álbumes personalizado
          }}
        >
          {allSlots.map((album, index) => (
            <div 
              key={album ? album.id : `empty-${index}`} // Key única para React
              className="aspect-square bg-[rgba(255,255,255,0.05)] overflow-hidden flex items-center justify-center border border-white/10 relative"
              style={{
                borderRadius: `${advancedOptions.borderRadius}px`, // Bordes redondeados personalizados
              }}
            >
              {album ? (
                // Álbum con datos
                <div className="relative w-full h-full group">
                  <img 
                    src={album.cover || 'https://placehold.co/600x600/1a1a2e/white?text=Portada+Álbum'} 
                    alt={`${album.title} de ${album.artist}`}
                    className="w-full h-full object-cover"
                    style={{
                      borderRadius: advancedOptions.borderRadius > 0 ? `${advancedOptions.borderRadius-1}px` : '0'
                    }}
                  />
                  {/* Overlay completo con información al pasar el ratón */}
                  <div 
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-2"
                    style={{
                      fontFamily: availableFonts.find(f => f.name === advancedOptions.fontFamily)?.value,
                      color: advancedOptions.textColor
                    }}
                  >
                    <h3 className="font-bold text-sm line-clamp-2 min-h-[2.5rem] w-full text-center">{album.title}</h3>
                    <p className="text-xs text-white/80 line-clamp-1 w-full text-center">{album.artist}</p>
                    {advancedOptions.showPlayCount && album.plays > 0 && (
                      <div className="text-xs mt-2 px-2 py-0.5 bg-white/10 rounded-full">{album.plays} plays</div>
                    )}
                    
                    {/* Botones de acción */}
                    <div className="absolute bottom-2 right-2 flex gap-1">
                      <button
                        className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditModal(album);
                        }}
                        title="Editar álbum"
                      >
                        <i className="ri-edit-line text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ) : dataSource === 'lastfm' ? (
                // Espacio bloqueado en modo Last.fm
                <div 
                  className="w-full h-full bg-black/40"
                ></div>
              ) : (
                // Espacio vacío para añadir un nuevo álbum
                <button 
                  className="w-full h-full flex flex-col items-center justify-center text-white/50 hover:text-white hover:bg-purple-500/20 transition-colors"
                  onClick={handleOpenAddModal}
                  style={{
                    fontFamily: availableFonts.find(f => f.name === advancedOptions.fontFamily)?.value
                  }}
                >
                  <i className="ri-add-line text-2xl"></i>
                  <span className="text-xs mt-1">Añadir álbum</span>
                </button>
              )}
            </div>
          ))}
        </div>
      );
    } 
    // Visualización en formato lista con detalles
    else if (chartType === 'list') {
      return (
        <div 
          className="flex flex-col" 
          style={{ 
            gap: `${advancedOptions.gap * 2}px`,
            fontFamily: availableFonts.find(f => f.name === advancedOptions.fontFamily)?.value,
            color: advancedOptions.textColor
          }}
        >
          {albums.length > 0 ? (
            // Mapeo de álbumes existentes
            albums.map((album) => (
              <div 
                key={album.id}
                className="bg-[rgba(255,255,255,0.05)] overflow-hidden flex border border-white/10 group hover:bg-[rgba(255,255,255,0.08)] transition-colors"
                style={{
                  borderRadius: `${advancedOptions.borderRadius}px`
                }}
              >
                {/* Miniatura del álbum */}
                <div className="w-16 h-16 md:w-24 md:h-24 shrink-0">
                  <img 
                    src={album.cover || 'https://placehold.co/600x600/1a1a2e/white?text=Portada+Álbum'} 
                    alt={`${album.title} de ${album.artist}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Información del álbum */}
                <div className="p-3 flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <div className="max-w-[70%]">
                      <h3 className="font-bold line-clamp-2">{album.title}</h3>
                      <p className="text-sm text-white/80 line-clamp-1">{album.artist}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {/* Botón de edición */}
                      <button
                        className="text-white/50 hover:text-white/90 rounded-full w-8 h-8 flex items-center justify-center bg-white/5 hover:bg-white/10"
                        onClick={() => handleOpenEditModal(album)}
                        title="Editar álbum"
                      >
                        <i className="ri-edit-line"></i>
                      </button>
                      {advancedOptions.showPlayCount && (
                        <div className="text-xs text-white/50 bg-white/10 px-2 py-1 rounded-full whitespace-nowrap">
                          {album.plays || 0} plays
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Mostrar reseña si existe */}
                  {album.review && (
                    <p className="text-xs text-white/70 mt-2 line-clamp-2">{album.review}</p>
                  )}
                  
                  {/* Contexto de fecha (solo aparece si tiene definido el rango de tiempo) */}
                  {advancedOptions.timeRange !== 'all' && (
                    <div className="mt-auto pt-2 text-xs text-white/50 flex items-center">
                      <i className="ri-time-line mr-1"></i>
                      <span>
                        {advancedOptions.timeRange === 'day' && 'Escuchado hoy'}
                        {advancedOptions.timeRange === 'week' && 'Top de esta semana'}
                        {advancedOptions.timeRange === 'month' && 'Top del mes'}
                        {advancedOptions.timeRange === 'year' && 'Top del año'}
                        {advancedOptions.timeRange === 'custom' && 
                          `${advancedOptions.customTimeRange.months ? advancedOptions.customTimeRange.months + 'm ' : ''}${advancedOptions.customTimeRange.weeks ? advancedOptions.customTimeRange.weeks + 's ' : ''}${advancedOptions.customTimeRange.days ? advancedOptions.customTimeRange.days + 'd' : ''}`
                        }
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            // Mensaje cuando no hay álbumes añadidos
            <div className="text-center text-white/50 py-8">
              No hay álbumes añadidos. Haz clic en "Añadir álbum" para empezar.
            </div>
          )}
          {/* Botón para añadir más álbumes si no se ha alcanzado el límite */}
          {albums.length < totalSlots && (
            dataSource === 'lastfm' ? (
              <div 
                className="bg-black/30 py-3 border border-white/5 text-white/20 text-center"
                style={{
                  borderRadius: `${advancedOptions.borderRadius}px`,
                }}
              >
                &nbsp;
              </div>
            ) : (
              <button 
                className="bg-[rgba(255,255,255,0.05)] py-3 text-white/50 hover:text-white hover:bg-purple-500/20 transition-colors flex items-center justify-center gap-2"
                onClick={handleOpenAddModal}
                style={{
                  borderRadius: `${advancedOptions.borderRadius}px`,
                  fontFamily: availableFonts.find(f => f.name === advancedOptions.fontFamily)?.value
                }}
              >
                <i className="ri-add-line"></i>
                <span>Añadir álbum</span>
              </button>
            )
          )}
        </div>
      );
    }
    // Visualización en formato collage (sin espacios entre álbumes)
    else if (chartType === 'collage') {
      return (
        <div 
          className="grid" // Espaciado configurable
          style={{ 
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, 1fr)`,
            gap: `${Math.min(1, advancedOptions.gap)}px` // Garantizar espacio mínimo para el collage
          }}
        >
          {allSlots.map((album, index) => (
            <div 
              key={album ? album.id : `empty-${index}`}
              className="aspect-square overflow-hidden flex items-center justify-center relative"
              style={{
                borderRadius: Math.min(4, advancedOptions.borderRadius) // Bordes redondeados limitados para collage
              }}
            >
              {album ? (
                // Mostrar portada del álbum sin bordes
                <div className="relative w-full h-full group">
                  <img 
                    src={album.cover || 'https://placehold.co/600x600/1a1a2e/white?text=Portada+Álbum'} 
                    alt={`${album.title} de ${album.artist}`}
                    className="w-full h-full object-cover"
                  />
                  {/* Número de posición en la esquina superior izquierda */}
                  {/* Overlay con información al pasar el ratón */}
                  <div 
                    className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-2"
                    style={{
                      fontFamily: availableFonts.find(f => f.name === advancedOptions.fontFamily)?.value,
                      color: advancedOptions.textColor
                    }}
                  >
                    <h3 className="font-bold w-full text-center px-1 overflow-visible min-h-[2.5rem]" style={{
                      fontSize: album.title.length > 15 ? 
                        (album.title.length > 25 ? 
                          (album.title.length > 40 ? '0.65rem' : '0.7rem') : 
                          '0.8rem') : 
                        '0.875rem',
                      wordBreak: 'break-word',
                      lineHeight: '1.2'
                    }}>{album.title}</h3>
                    <p className="text-xs text-white/80 w-full text-center overflow-visible" style={{
                      fontSize: album.artist.length > 20 ? '0.65rem' : '0.75rem',
                      wordBreak: 'break-word'
                    }}>{album.artist}</p>
                    {advancedOptions.showPlayCount && album.plays > 0 && (
                      <div className="text-xs mt-1 px-2 py-0.5 bg-white/10 rounded-full">{album.plays} plays</div>
                    )}
                    
                    {/* Botones de acción */}
                    <div className="absolute bottom-1 right-1 flex gap-1">
                      <button
                        className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenEditModal(album);
                        }}
                        title="Editar álbum"
                      >
                        <i className="ri-edit-line text-sm"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ) : dataSource === 'lastfm' ? (
                // Espacio bloqueado en modo Last.fm - vista collage
                <div
                  className="w-full h-full bg-black/40"
                ></div>
              ) : (
                // Botón para añadir álbum
                <button 
                  className="w-full h-full flex flex-col items-center justify-center text-white/50 hover:text-white bg-[rgba(0,0,0,0.5)] hover:bg-purple-500/20 transition-colors"
                  onClick={handleOpenAddModal}
                  style={{
                    fontFamily: availableFonts.find(f => f.name === advancedOptions.fontFamily)?.value
                  }}
                >
                  <i className="ri-add-line text-2xl"></i>
                </button>
              )}
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <Navbar />
      
      {/* Encabezado de la página */}
      <div className="pt-24 pb-6 bg-gradient-to-b from-[#1A0D2C] to-transparent">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold font-unbounded mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-purple-100">
            Crear Chart Musical
          </h1>
          <p className="text-purple-300/80 mb-6">
            Personaliza y crea un chart musical con tus álbumes favoritos
          </p>
        </div>
      </div>
      
      {/* Área principal del creador de charts - Estilo inspirado en Topsters */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-start mb-4">
          <div>
            {/* Campo para el título del chart */}
            <input 
              type="text" 
              placeholder="Título de tu chart (ej. Mis álbumes favoritos)" 
              className="bg-transparent border-b border-white/20 focus:border-purple-500 pb-1 text-xl font-semibold outline-none w-full md:w-auto"
              value={chartTitle}
              onChange={(e) => setChartTitle(e.target.value)}
            />
          </div>
          
          {/* Botones de acción principales */}
          <div className="flex gap-3 mt-4 md:mt-0">
            <button 
              onClick={exportChartAsImage}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-full text-white flex items-center gap-2 transition-colors"
            >
              <i className="ri-download-2-line"></i>
              <span>Descargar PNG</span>
            </button>
            <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white flex items-center gap-2 transition-colors">
              <i className="ri-share-line"></i>
              <span>Compartir</span>
            </button>
          </div>
        </div>
        
        {/* Aviso para conectar Last.fm si se selecciona esa fuente */}
        {dataSource === 'lastfm' && (
          <div className="mb-6 bg-yellow-500/20 text-yellow-300 p-4 rounded-lg flex items-center">
            <i className="ri-information-line text-xl mr-2"></i>
            <div>
              <p>La integración con Last.fm requiere conectar tu cuenta.</p>
              <button className="mt-2 bg-yellow-500/30 hover:bg-yellow-500/50 px-3 py-1 rounded-full text-sm transition-colors">
                Conectar con Last.fm
              </button>
            </div>
          </div>
        )}
        
        {/* Estructura principal en tres columnas (estilo Topsters) */}
        <div className="glass-rounded p-4 mb-12">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Panel de control izquierdo */}
            <div className="w-full lg:w-72 shrink-0">
              <div className="glass rounded-lg p-4 sticky top-4">
                <h3 className="font-semibold text-sm text-purple-200 mb-3 border-b border-white/10 pb-2">
                  Panel de Control
                </h3>
                
                {/* Dimensiones del Chart */}
                <div className="mb-4">
                  <label className="block text-xs font-medium text-white/70 mb-2">Dimensiones</label>
                  <div className="glass rounded-lg p-2 border border-white/5">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-xs text-white/60">Ancho</label>

                        </div>
                        <div className="flex items-center">
                          <button 
                            className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-l-md text-white flex items-center justify-center transition-colors"
                            onClick={() => handleCustomSizeChange('width', Math.max(1, customSize.width - 1))}
                            disabled={customSize.width <= 1}
                          >
                            <i className="ri-subtract-line"></i>
                          </button>
                          <input 
                            type="number" 
                            min="1" 
                            max="20"
                            value={customSize.width}
                            onChange={(e) => handleCustomSizeChange('width', parseInt(e.target.value) || 1)}
                            className="w-full h-8 bg-white/5 border-y border-white/10 text-center text-white"
                          />
                          <button 
                            className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-r-md text-white flex items-center justify-center transition-colors"
                            onClick={() => handleCustomSizeChange('width', Math.min(20, customSize.width + 1))}
                            disabled={customSize.width >= 20}
                          >
                            <i className="ri-add-line"></i>
                          </button>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <label className="text-xs text-white/60">Alto</label>

                        </div>
                        <div className="flex items-center">
                          <button 
                            className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-l-md text-white flex items-center justify-center transition-colors"
                            onClick={() => handleCustomSizeChange('height', Math.max(1, customSize.height - 1))}
                            disabled={customSize.height <= 1}
                          >
                            <i className="ri-subtract-line"></i>
                          </button>
                          <input 
                            type="number" 
                            min="1" 
                            max="20"
                            value={customSize.height}
                            onChange={(e) => handleCustomSizeChange('height', parseInt(e.target.value) || 1)}
                            className="w-full h-8 bg-white/5 border-y border-white/10 text-center text-white"
                          />
                          <button 
                            className="w-8 h-8 bg-white/5 hover:bg-white/10 rounded-r-md text-white flex items-center justify-center transition-colors"
                            onClick={() => handleCustomSizeChange('height', Math.min(20, customSize.height + 1))}
                            disabled={customSize.height >= 20}
                          >
                            <i className="ri-add-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 px-2 pt-2 border-t border-white/10">
                      <div className="text-xs text-white/70">
                        <i className="ri-layout-grid-line mr-1"></i>
                        <span className="font-medium">{customSize.width * customSize.height}</span> espacios totales
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Espaciado */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-white/70">Espaciado</label>
                    <span className="text-white/70 text-xs px-2 bg-white/10 rounded">{advancedOptions.gap}px</span>
                  </div>
                  <div className="relative">
                    <div className="h-1 bg-white/5 absolute top-1/2 -translate-y-1/2 left-0 right-0 rounded-full"></div>
                    <input 
                      type="range" 
                      min="0" 
                      max="20"
                      value={advancedOptions.gap}
                      onChange={(e) => setAdvancedOptions({...advancedOptions, gap: parseInt(e.target.value)})}
                      className="w-full h-4 appearance-none cursor-pointer bg-transparent relative z-10 slider-purple"
                    />
                    <div 
                      className="h-1 bg-gradient-to-r from-purple-600 to-purple-400 absolute top-1/2 -translate-y-1/2 left-0 rounded-full pointer-events-none"
                      style={{ width: `${(advancedOptions.gap / 20) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-white/40 mt-1">
                    <span>0</span>
                    <span>5</span>
                    <span>10</span>
                    <span>15</span>
                    <span>20</span>
                  </div>
                </div>
                
                {/* Bordes redondeados */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-white/70">Bordes redondeados</label>
                    <span className="text-white/70 text-xs px-2 bg-white/10 rounded">{advancedOptions.borderRadius}px</span>
                  </div>
                  <div className="relative">
                    <div className="h-1 bg-white/5 absolute top-1/2 -translate-y-1/2 left-0 right-0 rounded-full"></div>
                    <input 
                      type="range" 
                      min="0" 
                      max="20"
                      value={advancedOptions.borderRadius}
                      onChange={(e) => setAdvancedOptions({...advancedOptions, borderRadius: parseInt(e.target.value)})}
                      className="w-full h-4 appearance-none cursor-pointer bg-transparent relative z-10 slider-purple"
                    />
                    <div 
                      className="h-1 bg-gradient-to-r from-purple-600 to-purple-400 absolute top-1/2 -translate-y-1/2 left-0 rounded-full pointer-events-none"
                      style={{ width: `${(advancedOptions.borderRadius / 20) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-white/40 mt-1">
                    <span>0</span>
                    <span>5</span>
                    <span>10</span>
                    <span>15</span>
                    <span>20</span>
                  </div>
                </div>
                
                {/* Colores */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-white/70">Colores</label>
                  </div>
                  <div className="glass p-3 rounded-lg">
                    <div className="flex flex-col gap-3">
                      {/* Color de fondo */}
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-xs text-white/60">Fondo</label>
                          <button 
                            className="w-7 h-7 rounded-full border border-white/20 overflow-hidden flex items-center justify-center"
                            style={{ backgroundColor: advancedOptions.backgroundColor }}
                            onClick={() => document.getElementById('bgColorPicker').click()}
                          >
                            <i className="ri-paint-fill text-xs" style={{ color: advancedOptions.backgroundColor === '#000000' ? 'white' : 'black', opacity: 0.6 }}></i>
                          </button>
                          <input 
                            id="bgColorPicker"
                            type="color" 
                            value={advancedOptions.backgroundColor}
                            onChange={(e) => setAdvancedOptions({...advancedOptions, backgroundColor: e.target.value})}
                            className="opacity-0 absolute pointer-events-none"
                          />
                        </div>
                        <div className="grid grid-cols-8 gap-1">
                          {['#FF0000', '#000000', '#1a1a2e', '#222222', '#333333', '#444444', '#121212', '#0a0a0a'].map(color => (
                            <button 
                              key={color}
                              onClick={() => setAdvancedOptions({...advancedOptions, backgroundColor: color})}
                              className={`w-full aspect-square rounded-full border ${advancedOptions.backgroundColor === color ? 'border-white shadow-lg shadow-purple-500/20' : 'border-transparent'}`}
                              style={{ backgroundColor: color }}
                            ></button>
                          ))}
                        </div>
                      </div>
                      
                      {/* Color de texto */}
                      <div className="pt-3 border-t border-white/10">
                        <div className="flex justify-between items-center mb-2">
                          <label className="text-xs text-white/60">Texto</label>
                          <button 
                            className="w-7 h-7 rounded-full border border-white/20 overflow-hidden flex items-center justify-center"
                            style={{ backgroundColor: advancedOptions.textColor }}
                            onClick={() => document.getElementById('textColorPicker').click()}
                          >
                            <i className="ri-font-size text-xs" style={{ color: advancedOptions.textColor === '#FFFFFF' ? 'black' : 'white', opacity: 0.6 }}></i>
                          </button>
                          <input 
                            id="textColorPicker"
                            type="color" 
                            value={advancedOptions.textColor}
                            onChange={(e) => setAdvancedOptions({...advancedOptions, textColor: e.target.value})}
                            className="opacity-0 absolute pointer-events-none"
                          />
                        </div>
                        <div className="grid grid-cols-8 gap-1">
                          {['#FFFFFF', '#EEEEEE', '#CCCCCC', '#AAAAAA', '#888888', '#666666', '#444444', '#222222'].map(color => (
                            <button 
                              key={color}
                              onClick={() => setAdvancedOptions({...advancedOptions, textColor: color})}
                              className={`w-full aspect-square rounded-full border ${advancedOptions.textColor === color ? 'border-white shadow-lg shadow-purple-500/20' : 'border-transparent'}`}
                              style={{ backgroundColor: color }}
                            ></button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Tipo de visualización */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-medium text-white/70">Tipo de visualización</label>
                  </div>
                  <div className="glass p-2 rounded-lg">
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { id: 'grid', label: 'Cuadrícula', icon: 'ri-grid-line' },
                        { id: 'collage', label: 'Collage', icon: 'ri-collage-line' },
                        { id: 'list', label: 'Lista', icon: 'ri-list-check' }
                      ].map((type) => (
                        <button 
                          key={type.id}
                          className={`p-2 rounded-md flex flex-col items-center justify-center gap-1 transition-all ${
                            chartType === type.id 
                              ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-900/30 scale-105' 
                              : 'bg-white/5 text-white/70 hover:bg-white/10'
                          }`}
                          onClick={() => setChartType(type.id)}
                        >
                          <i className={`${type.icon} text-lg`}></i>
                          <span className="text-xs font-medium">{type.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Fuente de datos */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-medium text-white/70">Fuente de datos</label>
                  </div>
                  <div className="glass p-2 rounded-lg">
                    <div className="grid grid-cols-2 gap-1">
                      {[
                        { id: 'manual', label: 'Manual', icon: 'ri-edit-line' },
                        { id: 'lastfm', label: 'Last.fm', icon: 'ri-music-line' }
                      ].map((source) => (
                        <button 
                          key={source.id}
                          className={`p-2 rounded-md flex flex-col items-center justify-center gap-1 transition-all ${
                            dataSource === source.id 
                              ? 'bg-gradient-to-br from-purple-600 to-purple-800 text-white shadow-lg shadow-purple-900/30 scale-105' 
                              : 'bg-white/5 text-white/70 hover:bg-white/10'
                          }`}
                          onClick={() => setDataSource(source.id)}
                        >
                          <i className={`${source.icon} text-lg`}></i>
                          <span className="text-xs font-medium">{source.label}</span>
                        </button>
                      ))}
                    </div>
                    {dataSource === 'lastfm' && (
                      <div className="mt-2 text-xs text-yellow-300 bg-yellow-600/20 p-2 rounded-md">
                        <i className="ri-information-line mr-1"></i>
                        Necesitarás conectar con Last.fm para usar esta opción
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Fuente de texto */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-medium text-white/70">Fuente de texto</label>
                    <span className="text-xs bg-white/10 text-white/70 px-2 rounded">
                      {advancedOptions.fontFamily}
                    </span>
                  </div>
                  <div className="glass p-2 rounded-lg">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      {availableFonts.slice(0, 4).map(font => (
                        <button 
                          key={font.name}
                          onClick={() => setAdvancedOptions({...advancedOptions, fontFamily: font.name})}
                          className={`py-2 px-3 rounded-md text-center transition-all text-sm ${
                            advancedOptions.fontFamily === font.name 
                              ? 'bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow' 
                              : 'bg-white/5 text-white/80 hover:bg-white/10'
                          }`}
                          style={{ fontFamily: font.value }}
                        >
                          {font.name}
                        </button>
                      ))}
                    </div>
                    <select 
                      value={advancedOptions.fontFamily}
                      onChange={(e) => setAdvancedOptions({...advancedOptions, fontFamily: e.target.value})}
                      className="w-full h-8 bg-white/5 border border-white/10 rounded-md px-3 text-white text-xs focus:outline-none focus:border-purple-500"
                    >
                      {availableFonts.map(font => (
                        <option key={font.name} value={font.name}>{font.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                {/* Rango de tiempo - Solo visible en modo Last.fm */}
                {dataSource === 'lastfm' && (
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-medium text-white/70">Rango de tiempo</label>
                      <span className="text-xs bg-white/10 text-white/70 px-2 rounded">
                        {
                          advancedOptions.timeRange === 'all' ? 'Todos' : 
                          advancedOptions.timeRange === 'day' ? '24h' :
                          advancedOptions.timeRange === 'week' ? '7 días' :
                          advancedOptions.timeRange === 'month' ? '30 días' :
                          advancedOptions.timeRange === 'year' ? '1 año' : 'Personalizado'
                        }
                      </span>
                    </div>
                    <div className="glass p-3 rounded-lg">
                      <div className="flex flex-wrap gap-1 mb-2">
                        {[
                          { id: 'all', label: 'Todo', icon: 'ri-time-line' },
                          { id: 'day', label: '24h', icon: 'ri-24-hours-line' },
                          { id: 'week', label: '7d', icon: 'ri-calendar-line' },
                          { id: 'month', label: '30d', icon: 'ri-calendar-2-line' },
                          { id: 'year', label: '1 año', icon: 'ri-calendar-check-line' },
                          { id: 'custom', label: 'Custom', icon: 'ri-settings-line' }
                        ].map((range) => (
                          <button 
                            key={range.id}
                            className={`flex items-center justify-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                              advancedOptions.timeRange === range.id 
                                ? 'bg-gradient-to-r from-purple-500 to-purple-700 text-white' 
                                : 'bg-white/5 text-white/70 hover:bg-white/10'
                            }`}
                            onClick={() => setAdvancedOptions({...advancedOptions, timeRange: range.id})}
                          >
                            <i className={`${range.icon} text-xs`}></i>
                            <span>{range.label}</span>
                          </button>
                        ))}
                      </div>
                      
                      {advancedOptions.timeRange === 'custom' && (
                        <div className="mt-2 pt-2 border-t border-white/10">
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label className="block text-xs text-white/60 mb-1">Meses</label>
                              <input 
                                type="number" 
                                min="0" 
                                max="24"
                                value={advancedOptions.customTimeRange.months}
                                onChange={(e) => setAdvancedOptions({
                                  ...advancedOptions, 
                                  customTimeRange: {
                                    ...advancedOptions.customTimeRange,
                                    months: parseInt(e.target.value) || 0
                                  }
                                })}
                                className="w-full h-8 bg-white/5 border border-white/10 rounded text-center text-white text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-white/60 mb-1">Semanas</label>
                              <input 
                                type="number" 
                                min="0" 
                                max="52"
                                value={advancedOptions.customTimeRange.weeks}
                                onChange={(e) => setAdvancedOptions({
                                  ...advancedOptions, 
                                  customTimeRange: {
                                    ...advancedOptions.customTimeRange,
                                    weeks: parseInt(e.target.value) || 0
                                  }
                                })}
                                className="w-full h-8 bg-white/5 border border-white/10 rounded text-center text-white text-sm"
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-white/60 mb-1">Días</label>
                              <input 
                                type="number" 
                                min="0" 
                                max="31"
                                value={advancedOptions.customTimeRange.days}
                                onChange={(e) => setAdvancedOptions({
                                  ...advancedOptions, 
                                  customTimeRange: {
                                    ...advancedOptions.customTimeRange,
                                    days: parseInt(e.target.value) || 0
                                  }
                                })}
                                className="w-full h-8 bg-white/5 border border-white/10 rounded text-center text-white text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Opciones de visualización */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-medium text-white/70">Mostrar elementos</label>
                  </div>
                  <div className="glass p-3 rounded-lg">
                    <div className="space-y-3">
                      <div 
                        className={`flex items-center p-2 rounded-lg transition-all ${advancedOptions.showSidebar ? 'bg-purple-900/20' : 'bg-white/5'}`}
                        onClick={() => setAdvancedOptions({...advancedOptions, showSidebar: !advancedOptions.showSidebar})}
                      >
                        <div className={`relative w-8 h-5 flex items-center transition-all ${advancedOptions.showSidebar ? 'bg-purple-600' : 'bg-white/10'} rounded-full shrink-0 cursor-pointer`}>
                          <span className={`absolute left-0.5 transition-all w-4 h-4 bg-white rounded-full ${advancedOptions.showSidebar ? 'translate-x-3' : ''}`}></span>
                        </div>
                        <div className="ml-3">
                          <label className="text-sm text-white/90 cursor-pointer">
                            Panel lateral de detalles
                          </label>
                          <p className="text-xs text-white/50">
                            Muestra información detallada a la derecha
                          </p>
                        </div>
                      </div>
                      
                      <div 
                        className={`flex items-center p-2 rounded-lg transition-all ${advancedOptions.showPlayCount ? 'bg-purple-900/20' : 'bg-white/5'}`}
                        onClick={() => setAdvancedOptions({...advancedOptions, showPlayCount: !advancedOptions.showPlayCount})}
                      >
                        <div className={`relative w-8 h-5 flex items-center transition-all ${advancedOptions.showPlayCount ? 'bg-purple-600' : 'bg-white/10'} rounded-full shrink-0 cursor-pointer`}>
                          <span className={`absolute left-0.5 transition-all w-4 h-4 bg-white rounded-full ${advancedOptions.showPlayCount ? 'translate-x-3' : ''}`}></span>
                        </div>
                        <div className="ml-3">
                          <label className="text-sm text-white/90 cursor-pointer">
                            Mostrar reproducciones
                          </label>
                          <p className="text-xs text-white/50">
                            Muestra contadores de plays para cada álbum
                          </p>
                        </div>
                      </div>
                      
                      {/* Selección de modo de visualización (Álbum o Artista) */}
                      <div className="mt-4 border-t border-white/10 pt-3">
                        <label className="text-xs font-medium text-white/70 mb-2 block">
                          Destacar en listado lateral:
                        </label>
                        <div className="flex gap-2 mt-2">
                          <button
                            className={`flex-1 py-2 px-3 text-xs rounded-md transition-all ${
                              advancedOptions.displayMode === 'album' 
                                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md' 
                                : 'bg-white/5 text-white/70'
                            }`}
                            onClick={() => setAdvancedOptions({...advancedOptions, displayMode: 'album'})}
                          >
                            <i className="ri-album-line mr-1"></i>
                            Álbum
                          </button>
                          <button
                            className={`flex-1 py-2 px-3 text-xs rounded-md transition-all ${
                              advancedOptions.displayMode === 'artist' 
                                ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md' 
                                : 'bg-white/5 text-white/70'
                            }`}
                            onClick={() => setAdvancedOptions({...advancedOptions, displayMode: 'artist'})}
                          >
                            <i className="ri-mic-line mr-1"></i>
                            Artista
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Botón para añadir álbum */}
                <div className="mt-6">
                  {dataSource === 'lastfm' ? (
                    <button 
                      className="w-full py-2 bg-gray-700/50 border border-white/5 rounded-md text-white/30 text-sm flex items-center justify-center gap-1 cursor-not-allowed"
                      disabled
                    >
                      <i className="ri-add-line"></i>
                      <span>Añadir álbum</span>
                      <span className="text-xs bg-white/10 ml-1 px-2 py-0.5 rounded">{albums.length}/{totalSlots}</span>
                    </button>
                  ) : (
                    <button 
                      onClick={handleOpenAddModal}
                      className="w-full py-2 bg-purple-600 hover:bg-purple-700 rounded-md text-white text-sm flex items-center justify-center gap-1 transition-colors"
                      disabled={albums.length >= totalSlots}
                    >
                      <i className="ri-add-line"></i>
                      <span>Añadir álbum</span>
                      <span className="text-xs bg-white/20 ml-1 px-2 py-0.5 rounded">{albums.length}/{totalSlots}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
            
            {/* Área central del chart */}
            <div className="flex-1">
              {/* Espacio antes del chart */}
              <div className="mb-4 flex justify-end">
                {/* Ya no hay botón aquí, lo eliminamos para que no aparezca en la imagen */}
              </div>
              
              {/* Contenedor principal - Referencia para exportar como imagen */}
              <div 
                ref={chartRef}
                className="flex flex-col gap-4 rounded-lg p-4" 
                style={{
                  backgroundColor: advancedOptions.backgroundColor,
                }}>
                
                {/* Título interno del chart (ahora en el contenedor principal) */}
                <div className="w-full flex justify-center mb-5">
                  <h2 
                    className="font-bold font-unbounded title-container text-center" 
                    style={{
                      fontFamily: availableFonts.find(f => f.name === advancedOptions.fontFamily)?.value || 'Inter, sans-serif',
                      color: advancedOptions.textColor,
                      fontSize: chartTitle && chartTitle.length > 30 ? 
                                (chartTitle.length > 50 ? '1rem' : '1.2rem') : 
                                '1.5rem',
                      maxWidth: '90%'
                    }}
                  >
                    {chartTitle || 'Mi Chart Musical'}
                  </h2>
                </div>
                
                {/* Contenedor para el collage y la barra lateral juntos */}
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Visualización del chart */}
                  <div 
                    style={{
                      fontFamily: availableFonts.find(f => f.name === advancedOptions.fontFamily)?.value || 'Inter, sans-serif',
                      padding: `${advancedOptions.gap}px`,
                      position: 'relative'
                    }}
                    className="flex-1 min-h-[500px] flex items-center justify-center exportable-chart"
                  >
                    {renderChartContent()}
                  </div>
                
                  {/* Panel lateral integrado */}
                  {advancedOptions.showSidebar && (
                    <div className="lg:w-1/4 max-w-[250px] shrink-0">
                      <div 
                        className="h-full p-3 text-sm" 
                        style={{ 
                          fontFamily: availableFonts.find(f => f.name === advancedOptions.fontFamily)?.value || "Inter, sans-serif", 
                          color: advancedOptions.textColor, 
                          backgroundColor: advancedOptions.backgroundColor 
                        }}
                      >
                        <AlbumSidebar 
                          albums={albums}
                          customSize={customSize}
                          fontFamily={availableFonts.find(f => f.name === advancedOptions.fontFamily)?.value}
                          textColor={advancedOptions.textColor}
                          backgroundColor={advancedOptions.backgroundColor}
                          showPlayCount={advancedOptions.showPlayCount}
                          displayMode={advancedOptions.displayMode}
                          advancedOptions={advancedOptions}
                        />
                      </div>
                    </div>
                  )}
                </div> {/* Cierre del contenedor para el collage y barra lateral */}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal para añadir un nuevo álbum */}
      {showAddAlbumModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#1E1E2E] rounded-xl w-full max-w-md p-6 relative animate-fade-in">
            {/* Botón para cerrar el modal */}
            <button 
              className="absolute top-3 right-3 text-white/70 hover:text-white"
              onClick={() => setShowAddAlbumModal(false)}
              aria-label="Cerrar modal"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
            
            <h3 className="text-xl font-semibold mb-4">Añadir álbum</h3>
            
            {/* Formulario para añadir álbum */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white/70 mb-1">
                Título del álbum <span className="text-red-400">*</span>
              </label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                value={newAlbum.title}
                onChange={(e) => setNewAlbum({...newAlbum, title: e.target.value})}
                placeholder="Ej. Dark Side of the Moon"
              />
              <small className="text-white/50 text-xs">
                {dataSource === 'lastfm' ? 'Haz clic para buscar en Last.fm, o escribe manualmente' : 'Nombre del álbum'}
              </small>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-white/70 mb-1">
                Artista <span className="text-red-400">*</span>
              </label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                value={newAlbum.artist}
                onChange={(e) => setNewAlbum({...newAlbum, artist: e.target.value})}
                placeholder="Ej. Pink Floyd"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-white/70 mb-1">URL de la portada</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={newAlbum.cover}
                onChange={(e) => setNewAlbum({...newAlbum, cover: e.target.value})}
              />
              <small className="text-white/50 text-xs">
                {dataSource === 'lastfm' ? 'Se obtendrá automáticamente al buscar' : 'URL de la imagen de portada del álbum'}
              </small>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-white/70 mb-1">Reproducciones</label>
              <input 
                type="number" 
                min="0"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                placeholder="0"
                value={newAlbum.plays}
                onChange={(e) => setNewAlbum({...newAlbum, plays: parseInt(e.target.value) || 0})}
              />
              {dataSource === 'lastfm' && (
                <small className="text-yellow-300 text-xs mt-1 block">
                  <i className="ri-information-line"></i> Se actualizará automáticamente con datos de Last.fm
                </small>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-white/70 mb-1">Reseña (opcional)</label>
              <textarea 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 min-h-[80px]"
                placeholder="Escribe tu opinión sobre este álbum..."
                value={newAlbum.review}
                onChange={(e) => setNewAlbum({...newAlbum, review: e.target.value})}
              ></textarea>
            </div>
            
            {/* Botones de acción del modal */}
            <div className="flex justify-end gap-3">
              <button 
                className="px-4 py-2 text-white/70 hover:text-white"
                onClick={() => setShowAddAlbumModal(false)}
              >
                Cancelar
              </button>
              <button 
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleAddAlbum}
                disabled={!newAlbum.title || !newAlbum.artist}
                title="Es necesario incluir al menos título y artista"
              >
                Añadir
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal para editar un álbum existente */}
      {showEditAlbumModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#1E1E2E] rounded-xl w-full max-w-md p-6 relative animate-fade-in">
            {/* Botón para cerrar el modal */}
            <button 
              className="absolute top-3 right-3 text-white/70 hover:text-white"
              onClick={() => {
                setShowEditAlbumModal(false);
                setAlbumToEdit(null);
                setNewAlbum({ title: '', artist: '', cover: '', review: '', plays: 0 });
              }}
              aria-label="Cerrar modal"
            >
              <i className="ri-close-line text-xl"></i>
            </button>
            
            <h3 className="text-xl font-semibold mb-4">Editar álbum</h3>
            
            {/* Formulario para editar álbum */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-white/70 mb-1">
                Título del álbum <span className="text-red-400">*</span>
              </label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                value={newAlbum.title}
                onChange={(e) => setNewAlbum({...newAlbum, title: e.target.value})}
                placeholder="Ej. Dark Side of the Moon"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-white/70 mb-1">
                Artista <span className="text-red-400">*</span>
              </label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                value={newAlbum.artist}
                onChange={(e) => setNewAlbum({...newAlbum, artist: e.target.value})}
                placeholder="Ej. Pink Floyd"
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-white/70 mb-1">URL de la portada</label>
              <input 
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={newAlbum.cover}
                onChange={(e) => setNewAlbum({...newAlbum, cover: e.target.value})}
              />
              <small className="text-white/50 text-xs">URL de la imagen de portada del álbum</small>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-white/70 mb-1">Reproducciones</label>
              <input 
                type="number" 
                min="0"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500"
                placeholder="0"
                value={newAlbum.plays}
                onChange={(e) => setNewAlbum({...newAlbum, plays: parseInt(e.target.value) || 0})}
              />
              {dataSource === 'lastfm' && (
                <small className="text-yellow-300 text-xs mt-1 block">
                  <i className="ri-information-line"></i> Se actualizará automáticamente con datos de Last.fm
                </small>
              )}
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-white/70 mb-1">Reseña (opcional)</label>
              <textarea 
                className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-purple-500 min-h-[80px]"
                placeholder="Escribe tu opinión sobre este álbum..."
                value={newAlbum.review}
                onChange={(e) => setNewAlbum({...newAlbum, review: e.target.value})}
              ></textarea>
            </div>
            
            {/* Botones de acción del modal */}
            <div className="flex justify-end gap-3">
              <button 
                className="px-4 py-2 text-white/70 hover:text-white"
                onClick={() => {
                  setShowEditAlbumModal(false);
                  setAlbumToEdit(null);
                  setNewAlbum({ title: '', artist: '', cover: '', review: '', plays: 0 });
                }}
              >
                Cancelar
              </button>
              <button 
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSaveEditedAlbum}
                disabled={!newAlbum.title || !newAlbum.artist}
                title="Es necesario incluir al menos título y artista"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default CreateChart;