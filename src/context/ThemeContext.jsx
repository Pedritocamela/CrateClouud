import { createContext } from 'react';

// Crear el contexto
export const ThemeContext = createContext();

// Valores por defecto del tema (no se utilizarán para cambiar colores reales, solo para la UI)
const defaultTheme = {
  primary: '328 86% 50%',     // #E91E63 (rosa)
  secondary: '292 60% 40%',   // #9C27B0 (púrpura)
  accent: '195 100% 47%'      // #03A9F4 (azul claro)
};

export const ThemeProvider = ({ children }) => {
  // Stub de las funciones - por ahora sin funcionalidad real
  const setThemeColor = (primaryColor) => {
    console.log('Seleccionado color:', primaryColor);
    // En el futuro, aquí se cambiarían los colores reales
  };
  
  const resetTheme = () => {
    console.log('Tema restablecido a los valores predeterminados');
    // En el futuro, aquí se restablecerían los colores
  };
  
  // Usamos un tema estático por ahora
  const theme = defaultTheme;
  
  return (
    <ThemeContext.Provider value={{ theme, setThemeColor, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
