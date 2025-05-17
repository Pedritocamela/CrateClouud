import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Datos de ejemplo para álbumes populares
const popularAlbums = [
  {
    id: 1,
    title: 'After Hours',
    artist: 'The Weeknd',
    year: '2020',
    image: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
    likes: '643K',
    listens: '145K',
    reactions: '271K'
  },
  {
    id: 2,
    title: 'Random Access Memories',
    artist: 'Daft Punk',
    year: '2013',
    image: 'https://cdn-images.dzcdn.net/images/cover/311bba0fc112d15f72c8b5a65f0456c1/500x500.jpg',
    likes: '1.1M',
    listens: '186K',
    reactions: '522K'
  },
  {
    id: 3,
    title: 'Igor',
    artist: 'Tyler, the Creator',
    year: '2019',
    image: 'https://m.media-amazon.com/images/I/71UzjXRiGHL.jpg',
    likes: '1.6M',
    listens: '247K',
    reactions: '523K'
  },
  {
    id: 4,
    title: 'Melodrama',
    artist: 'Lorde',
    year: '2017',
    image: 'https://m.media-amazon.com/images/I/71fwgxq0wML._UF894,1000_QL80_.jpg',
    likes: '224K',
    listens: '56K',
    reactions: '69K'
  },
  {
    id: 5,
    title: 'Dawn FM',
    artist: 'The Weeknd',
    year: '2022',
    image: 'https://cdn-images.dzcdn.net/images/cover/478a544d29275755b3b8f7b4a1fd7a3c/1900x1900-000000-80-0-0.jpg',
    likes: '512K',
    listens: '178K',
    reactions: '312K'
  },
  {
    id: 6,
    title: 'WHEN WE ALL FALL ASLEEP',
    artist: 'Billie Eilish',
    year: '2019',
    image: 'https://m.media-amazon.com/images/I/81idxQqxTlL._UF894,1000_QL80_.jpg',
    likes: '823K',
    listens: '301K',
    reactions: '428K'
  },
  {
    id: 7,
    title: 'Blonde',
    artist: 'Frank Ocean',
    year: '2016',
    image: 'https://jenesaispop.com/wp-content/uploads/2016/08/frank-blond.jpg',
    likes: '712K',
    listens: '258K',
    reactions: '391K'
  },
  {
    id: 8,
    title: 'Un Verano Sin Ti',
    artist: 'Bad Bunny',
    year: '2022',
    image: 'https://m.media-amazon.com/images/I/81C6LV7yNTL.jpg',
    likes: '931K',
    listens: '412K',
    reactions: '586K'
  }
];

// Datos de ejemplo para las reseñas populares
const popularReviews = [
  {
    id: 1,
    albumId: 1,
    albumTitle: 'After Hours',
    albumImage: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
    year: '2020',
    user: {
      name: 'Carmen',
      image: 'https://images.unsplash.com/photo-1545912452-8aea7e25a3d3?auto=format&fit=crop&w=150&h=150',
      reviewCount: '1,108'
    },
    rating: 4.5,
    likeCount: '22,665',
    commentCount: '68',
    favorite: true,
    text: 'Un álbum que combina a la perfección la nostalgia de los 80 con sonidos modernos. The Weeknd logra crear una atmósfera única.'
  },
  {
    id: 2,
    albumId: 1,
    albumTitle: 'After Hours',
    albumImage: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
    year: '2020',
    user: {
      name: 'RosaMusic',
      image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=150&h=150',
      reviewCount: '2,361'
    },
    rating: 4.5,
    likeCount: '17,481',
    commentCount: '37',
    favorite: true,
    text: 'La producción de este álbum es impecable. Cada canción te transporta a un universo único de sonidos y emociones.'
  },
  {
    id: 3,
    albumId: 1,
    albumTitle: 'After Hours',
    albumImage: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
    year: '2020',
    user: {
      name: 'Alejandro',
      image: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&h=150',
      reviewCount: '743'
    },
    rating: 3.5,
    likeCount: '16,961',
    commentCount: '37',
    favorite: false,
    text: 'Aunque tiene temas brillantes, a veces se siente demasiado repetitivo. Aún así, "Blinding Lights" es una obra maestra.'
  },
  {
    id: 4,
    albumId: 1,
    albumTitle: 'After Hours',
    albumImage: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
    year: '2020',
    user: {
      name: 'MeloManiac',
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150',
      reviewCount: '985'
    },
    rating: 4,
    likeCount: '9,977',
    commentCount: '25',
    favorite: true,
    text: 'El mejor álbum conceptual de los últimos años. The Weeknd demuestra que el R&B moderno puede ser innovador y nostálgico a la vez.'
  }
];

// Datos de ejemplo para categorías
const categories = ['Explorar', 'Año', 'Calificación', 'Popular', 'Género', 'Plataforma', 'Otros'];

// Datos de ejemplo para géneros
const genres = [
  'Pop', 'Rock', 'Hip Hop', 'R&B', 'Electrónica', 'Jazz', 'Metal', 
  'Reggaeton', 'Indie', 'Alternativo', 'Clásica', 'Folk'
];

const Albums = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  
 return (
  <div className="min-h-screen bg-[#121212] text-white overflow-x-hidden">
      {/* Cabecera con buscador */}
      
    <Navbar />

      <div className="pt-24 pb-6 bg-gradient-to-b from-[#1A0D2C] to-transparent">

        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-8">
            <h1 className="text-3xl md:text-4xl font-bold font-unbounded text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">
              Descubrir Álbumes
            </h1>
            
            <div className="w-full md:w-1/2 lg:w-1/3">
              <div className="relative">
                <input
                  type="text"
                  className="w-full h-12 bg-[rgba(255,255,255,0.07)] text-white placeholder-[rgba(255,255,255,0.5)] rounded-full px-5 pr-12 outline-none focus:ring-2 focus:ring-purple-500/50 transition-all border border-[rgba(255,255,255,0.1)]"
                  placeholder="Buscar álbumes, artistas, reseñas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[rgba(255,255,255,0.5)] hover:text-white transition-colors">
                  <i className="ri-search-line text-xl"></i>
                </button>
              </div>
            </div>
          </div>
          
          {/* Categorías */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-hidden">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all 
                  ${index === 0 
                    ? 'bg-gradient-to-r from-purple-600 to-purple-800 text-white' 
                    : 'bg-[rgba(255,255,255,0.07)] text-[rgba(255,255,255,0.8)] hover:bg-[rgba(255,255,255,0.12)]'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar con filtros */}
          <div className="md:col-span-3">
            <div className="glass-rounded p-6 border border-[rgba(156,39,176,0.2)]">
              <h3 className="font-unbounded font-semibold mb-4 text-xl">Filtros</h3>
              
              <div className="space-y-6">
                {/* Filtro de género */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-[rgba(255,255,255,0.8)]">Género</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {genres.slice(0, 8).map((genre, index) => (
                      <button
                        key={index}
                        className={`px-3 py-1.5 rounded text-xs font-medium transition-all whitespace-nowrap text-center
                          ${selectedGenre === genre
                            ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                            : 'bg-[rgba(255,255,255,0.05)] text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.1)] border border-transparent'
                          }`}
                        onClick={() => setSelectedGenre(genre === selectedGenre ? '' : genre)}
                      >
                        {genre}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Filtro de año */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-[rgba(255,255,255,0.8)]">Año</h4>
                  <div className="space-y-2">
                    {['2025', '2024', '2023', '2022', '2010s'].map((year, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`year-${year}`}
                          className="w-4 h-4 rounded-sm bg-[rgba(255,255,255,0.1)] border-none focus:ring-offset-0 focus:ring-1 focus:ring-purple-400 text-purple-600"
                        />
                        <label
                          htmlFor={`year-${year}`}
                          className="ml-2 text-sm text-[rgba(255,255,255,0.8)]"
                        >
                          {year}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Filtro de calificación */}
                <div>
                  <h4 className="text-sm font-semibold mb-3 text-[rgba(255,255,255,0.8)]">Calificación</h4>
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`rating-${rating}`}
                          className="w-4 h-4 rounded-sm bg-[rgba(255,255,255,0.1)] border-none focus:ring-offset-0 focus:ring-1 focus:ring-purple-400 text-purple-600"
                        />
                        <label
                          htmlFor={`rating-${rating}`}
                          className="ml-2 text-sm text-[rgba(255,255,255,0.8)] flex items-center"
                        >
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <i
                                key={i}
                                className={`ri-star-${i < rating ? 'fill' : 'line'} text-yellow-400 text-sm`}
                              ></i>
                            ))}
                          </div>
                          {rating === 5 && <span className="ml-1"></span>}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contenido principal - Grid de álbumes */}
          <div className="md:col-span-9">
            <h2 className="text-2xl font-unbounded font-semibold mb-6">Álbumes Populares Esta Semana</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {popularAlbums.map(album => (
                <div
                  key={album.id}
                  className="glass-rounded overflow-hidden transition-all duration-300 hover:transform hover:scale-[1.02] border border-[rgba(156,39,176,0.2)]"
                >
                  <div className="relative group">
                    <img
                      src={album.image}
                      alt={`${album.title} por ${album.artist}`}
                      className="w-full aspect-square object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button className="bg-purple-600 hover:bg-purple-700 transition-colors w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                        <i className="ri-play-fill text-2xl"></i>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-semibold text-white mb-1 truncate">{album.title}</h3>
                    <p className="text-[rgba(255,255,255,0.7)] text-sm mb-3 truncate">{album.artist} • {album.year}</p>
                    
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center text-[rgba(255,255,255,0.6)]">
                        <span className="flex items-center mr-3">
                          <i className="ri-eye-line mr-1"></i> {album.likes}
                        </span>
                        <span className="flex items-center mr-3">
                          <i className="ri-headphone-line mr-1"></i> {album.listens}
                        </span>
                        <span className="flex items-center">
                          <i className="ri-heart-line mr-1"></i> {album.reactions}
                        </span>
                      </div>
                      
                      <button className="text-[rgba(255,255,255,0.6)] hover:text-purple-400 transition-colors">
                        <i className="ri-more-2-fill"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Reseñas populares */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-unbounded font-semibold">Reseñas Populares Esta Semana</h2>
                <button className="text-sm text-purple-400 hover:text-purple-300 font-medium">
                  VER MÁS
                </button>
              </div>
              
              <div className="space-y-5">
                {popularReviews.map(review => (
                  <div 
                    key={review.id} 
                    className="glass-rounded p-5 border border-[rgba(156,39,176,0.2)]"
                  >
                    <div className="flex">
                      <div className="flex-shrink-0 mr-4">
                        <img 
                          src={review.albumImage} 
                          alt={review.albumTitle}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </div>
                      
                      <div className="flex-grow">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-semibold text-white">{review.albumTitle} <span className="text-[rgba(255,255,255,0.6)] font-normal text-sm">{review.year}</span></h3>
                            
                            <div className="flex items-center mt-1">
                              <img 
                                src={review.user.image} 
                                alt={review.user.name} 
                                className="w-5 h-5 rounded-full mr-2"
                              />
                              <span className="text-[rgba(255,255,255,0.8)] text-sm">{review.user.name}</span>
                              <div className="flex items-center ml-3">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <i
                                    key={i}
                                    className={`ri-star-${i < Math.floor(review.rating) ? 'fill' : i < review.rating ? 'half-fill' : 'line'} text-yellow-400 text-xs`}
                                  ></i>
                                ))}
                              </div>
                              <span className="text-yellow-500 ml-1 text-xs">{review.rating}</span>
                              {review.favorite && (
                                <i className="ri-heart-fill text-pink-500 ml-2 text-sm"></i>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center text-sm">
                            <button className="text-[rgba(255,255,255,0.6)] hover:text-white transition-colors ml-3">
                              <i className="ri-more-2-fill"></i>
                            </button>
                          </div>
                        </div>
                        
                        <p className="text-[rgba(255,255,255,0.8)] text-sm mb-3">
                          {review.text}
                        </p>
                        
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center text-[rgba(255,255,255,0.6)]">
                            <button className="flex items-center mr-4 hover:text-purple-400 transition-colors">
                              <i className="ri-thumb-up-line mr-1"></i> Me gusta ({review.likeCount})
                            </button>
                            <button className="flex items-center hover:text-purple-400 transition-colors">
                              <i className="ri-chat-1-line mr-1"></i> Comentarios ({review.commentCount})
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Albums;