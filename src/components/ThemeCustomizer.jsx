import { useState } from 'react';

const ThemeCustomizer = () => {
  // Estado local para controlar qué color está seleccionado (solo visual)
  const [selectedColor, setSelectedColor] = useState('292 60% 40%');
  
  // Opciones predefinidas de colores (púrpura resaltado como predeterminado)
  const colorOptions = [
    { name: 'Púrpura', primary: '292 60% 40%' },   // #9C27B0 (púrpura)
    { name: 'Rosa', primary: '328 86% 50%' },      // #E91E63 (rosa)
    { name: 'Índigo', primary: '231 48% 45%' },    // #3F51B5 (índigo)
    { name: 'Verde', primary: '174 100% 29%' },    // #009688 (verde azulado)
    { name: 'Naranja', primary: '14 100% 57%' },   // #FF5722 (naranja)
    { name: 'Azul grisáceo', primary: '200 18% 46%' } // #607D8B (azul grisáceo)
  ];

  // La selección de colores solo mostrará un mensaje en consola por ahora
  const handleColorSelect = (color) => {
    console.log('Color seleccionado:', color);
    setSelectedColor(color);
  };

  return (
    <div className="glass rounded-xl p-8 max-w-3xl mx-auto border border-purple-500/30 backdrop-blur-lg shadow-xl shadow-purple-500/10">
      <div className="relative">
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-purple-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-pink-500 rounded-full opacity-10 blur-3xl"></div>
        
        <h3 className="text-2xl font-unbounded font-semibold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
          Personaliza tu experiencia
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="backdrop-blur-sm p-5 rounded-lg border border-purple-500/20">
            <p className="text-sm text-[rgba(255,255,255,0.8)] mb-4 font-medium">Selecciona un tema de color:</p>
            <div className="flex flex-wrap gap-4">
              {colorOptions.map((option, index) => (
                <button 
                  key={index}
                  className={`w-10 h-10 rounded-full shadow-lg transition-all duration-300 ${
                    selectedColor === option.primary 
                      ? 'border-2 border-white scale-110 shadow-[0_0_15px_rgba(156,39,176,0.7)]' 
                      : 'border border-white/20 hover:scale-105'
                  }`}
                  style={{ background: `hsl(${option.primary})` }}
                  onClick={() => handleColorSelect(option.primary)}
                  title={option.name}
                />
              ))}
            </div>
            <p className="text-xs text-[rgba(255,255,255,0.6)] mt-3 italic">
              (Funcionalidad de cambio de color será implementada próximamente)
            </p>
          </div>
          
          <div className="backdrop-blur-sm p-5 rounded-lg border border-purple-500/20">
            <p className="text-sm text-[rgba(255,255,255,0.8)] mb-4 font-medium">O extrae colores de un álbum:</p>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-16 h-16 bg-[rgba(255,255,255,0.05)] rounded-md flex items-center justify-center border border-white/10">
                <i className="ri-image-add-line text-2xl text-purple-300"></i>
              </div>
              <div className="flex-1">
                <button 
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-all"
                  onClick={() => {
                    console.log('Selector de álbum - funcionalidad pendiente');
                    alert('Esta funcionalidad estará disponible próximamente.');
                  }}
                >
                  <i className="ri-image-line mr-2"></i>
                  <span>Seleccionar álbum</span>
                </button>
              </div>
            </div>
            <p className="text-xs text-[rgba(255,255,255,0.6)] italic">
              La interfaz se adaptará a los colores del álbum seleccionado
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCustomizer;
