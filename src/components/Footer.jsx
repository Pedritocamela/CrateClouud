const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#121212] py-12 border-t border-[rgba(255,255,255,0.1)]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              
              <span className="text-xl font-bold font-unbounded text-white">CrateCloud</span>
            </div>
            <p className="text-[rgba(255,255,255,0.7)] text-sm mb-4">
              Explora, comparte y conecta a través de la música que te define.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-white">
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-white">
                <i className="ri-twitter-x-line text-xl"></i>
              </a>
              <a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-white">
                <i className="ri-facebook-circle-line text-xl"></i>
              </a>
              <a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-white">
                <i className="ri-discord-line text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-unbounded font-medium mb-4">Navegar</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-white">Inicio</a></li>
              <li><a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-white">Explorar</a></li>
              <li><a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-white">Charts</a></li>
              <li><a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-white">Tendencias</a></li>
              <li><a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-white">Comunidad</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-unbounded font-medium mb-4">Recursos</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-white">Ayuda</a></li>
              <li><a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-white">Blog</a></li>
              <li><a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-white">API</a></li>
              <li><a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-white">Desarrolladores</a></li>
              <li><a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-white">Estado del servicio</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-unbounded font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-white">Términos de uso</a></li>
              <li><a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-white">Política de privacidad</a></li>
              <li><a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-white">Cookies</a></li>
              <li><a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-white">Licencias</a></li>
              <li><a href="#" className="text-[rgba(255,255,255,0.7)] hover:text-white">Contacto</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-[rgba(255,255,255,0.1)] text-center">
          <p className="text-[rgba(255,255,255,0.7)] text-sm">
            &copy; {currentYear} CrateCloud. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
