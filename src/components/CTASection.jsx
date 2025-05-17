const CTASection = () => {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Fondo con gradiente y ondas sonoras */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1A0D2C] to-[#0D0514] opacity-95"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full filter blur-[150px] opacity-10 animate-pulse" style={{animationDuration: '8s'}}></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-600 rounded-full filter blur-[150px] opacity-10 animate-pulse" style={{animationDuration: '10s', animationDelay: '1s'}}></div>
        
        {/* Ondas de sonido decorativas */}
        <div className="absolute left-0 right-0 bottom-0 h-40 flex items-end justify-around opacity-20">
          {Array.from({length: 20}).map((_, i) => (
            <div 
              key={i}
              className="w-1.5 bg-purple-500 rounded-full animate-pulse"
              style={{
                height: `${Math.max(15, Math.sin(i * 0.5) * 60 + 40)}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${1 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-6 relative">
            <div className="absolute -top-6 -left-6 w-20 h-20 bg-purple-500/20 rounded-full blur-2xl"></div>
            <h2 className="text-3xl md:text-5xl font-bold font-unbounded leading-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-purple-100 to-pink-300 relative">
              Comienza a crear tu identidad musical
            </h2>
          </div>
          
          <p className="text-xl text-[rgba(255,255,255,0.8)] mb-12 leading-relaxed">
            Únete a miles de amantes de la música que ya están compartiendo sus gustos musicales y descubriendo nuevos sonidos.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <button className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white font-semibold py-4 px-10 rounded-full transition-all shadow-lg shadow-purple-900/30 hover:shadow-purple-800/40 transform hover:scale-105">
              Registrarse gratis
            </button>
            <button className="border border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-800/10 text-white font-semibold py-4 px-10 rounded-full transition-all transform hover:scale-105">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300">
                Conocer más
              </span>
            </button>
          </div>
          
          {/* Insignia de lanzamiento exclusivo */}
          <div className="mt-12 inline-block">
            <div className="glass-rounded py-2 px-5 text-xs text-purple-300 border border-purple-500/20 flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse mr-2"></div>
              Lanzamiento exclusivo 2025
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
