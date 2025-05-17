import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Componentes para la página del artista
import ArtistHeader from '../components/ArtistHeader';
import ArtistInfo from '../components/ArtistInfo';
import TopTracks from '../components/TopTracks';
import SimilarArtists from '../components/SimilarArtists';
import CommentSection from '../components/CommentSection';
import ArtistLinks from '../components/ArtistLinks';
import ArtistAlbums from '../components/ArtistAlbums';
import Listeners from '../components/Listeners';

// Definimos la API key directamente en el componente como fallback
// si la variable de entorno no está disponible
const LASTFM_API_KEY = 'fa7895a669b7bb92119ffab279e52f60';

const ArtistPage = () => {
  const { artistName } = useParams();
  const decodedArtistName = decodeURIComponent(artistName);
  
  // Estado para el manejo de errores
  const [error, setError] = useState(null);
  
  // Consulta para obtener información del artista desde Last.fm
  const { data: artistData, isLoading: isLoadingArtist } = useQuery({
    queryKey: ['artist', decodedArtistName],
    queryFn: async () => {
      try {
        // Usamos la API key definida directamente
        console.log("Utilizando API Key:", LASTFM_API_KEY ? "Disponible" : "No disponible");
        
        // Log para ver la URL que estamos construyendo
        const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${encodeURIComponent(decodedArtistName)}&api_key=${LASTFM_API_KEY}&format=json`;
        console.log("URL de solicitud:", url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          console.error("Error de respuesta HTTP:", response.status, response.statusText);
          throw new Error(`Error de servidor: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Datos recibidos:", data);
        
        if (data.error) {
          console.error("Error de API Last.fm:", data.error, data.message);
          throw new Error(data.message || 'Error en la API de Last.fm');
        }
        
        if (!data.artist) {
          console.error("Datos de artista no encontrados en la respuesta");
          throw new Error('No se encontró información del artista');
        }
        
        return data.artist;
      } catch (err) {
        console.error("Error completo:", err);
        setError(err.message || 'Error desconocido');
        throw err;
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutos
  });

  // Consulta para obtener los temas principales del artista
  const { data: topTracksData, isLoading: isLoadingTracks } = useQuery({
    queryKey: ['topTracks', decodedArtistName],
    queryFn: async () => {
      try {
        // Usamos la API key definida directamente
        const url = `https://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=${encodeURIComponent(decodedArtistName)}&api_key=${LASTFM_API_KEY}&format=json&limit=10`;
        console.log("URL para obtener pistas:", url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          console.error("Error HTTP en pistas:", response.status);
          return [];
        }
        
        const data = await response.json();
        console.log("Datos de pistas recibidos:", data.toptracks ? "Sí" : "No");
        
        if (data.error) {
          console.error("Error en API de pistas:", data.message);
          return [];
        }
        
        return data.toptracks?.track || [];
      } catch (err) {
        console.error('Error en topTracks:', err);
        return [];
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: true, // Lo ejecutamos independientemente de artistData
  });

  // Consulta para obtener artistas similares
  const { data: similarArtistsData, isLoading: isLoadingSimilar } = useQuery({
    queryKey: ['similarArtists', decodedArtistName],
    queryFn: async () => {
      try {
        // Usamos la API key definida directamente
        const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getsimilar&artist=${encodeURIComponent(decodedArtistName)}&api_key=${LASTFM_API_KEY}&format=json&limit=6`;
        console.log("URL para obtener artistas similares:", url);
        
        const response = await fetch(url);
        
        if (!response.ok) {
          console.error("Error HTTP en artistas similares:", response.status);
          return [];
        }
        
        const data = await response.json();
        console.log("Datos de artistas similares recibidos:", data.similarartists ? "Sí" : "No");
        
        if (data.error) {
          console.error("Error en API de artistas similares:", data.message);
          return [];
        }
        
        return data.similarartists?.artist || [];
      } catch (err) {
        console.error('Error en similarArtists:', err);
        return [];
      }
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutos
    enabled: true, // Lo ejecutamos independientemente de artistData
  });

  // Comentarios (simulados por ahora, se integrará con el backend más adelante)
  const comments = [
    {
      id: 1,
      username: 'Monica',
      avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg/960px-Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg',
      content: '¡Este artista es increíble! Acabo de asistir a su concierto y fue una experiencia inolvidable.',
      date: '2023-05-10T14:48:00',
      likes: 24
    },
    {
      id: 2,
      username: 'Pedro',
      avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg/960px-Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg',
      content: 'Su último álbum es una obra maestra. La producción y las letras son extraordinarias.',
      date: '2023-05-09T09:23:00',
      likes: 17
    },
    {
      id: 3,
      username: 'Manolo',
      avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg/960px-Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg',
      content: 'No entiendo por qué tanta gente habla de este artista. Personalmente creo que está sobrevalorado.',
      date: '2023-05-08T18:12:00',
      likes: 3
    }
  ];

  // Verificar si hay un error en la carga
  if (error) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-10 min-h-screen">
          <div className="glass p-6 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
            <p className="text-white/80">{error}</p>
            <p className="mt-4">No se pudieron cargar los datos del artista. Por favor, inténtalo de nuevo más tarde.</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Estado de carga
  if (isLoadingArtist) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-10 min-h-screen">
          <div className="h-64 glass rounded-xl animate-pulse mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-20 glass rounded-lg animate-pulse mb-4"></div>
              <div className="h-40 glass rounded-lg animate-pulse mb-8"></div>
              <div className="h-80 glass rounded-lg animate-pulse"></div>
            </div>
            <div className="lg:col-span-1">
              <div className="h-60 glass rounded-lg animate-pulse mb-6"></div>
              <div className="h-40 glass rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#121212] text-white overflow-x-hidden">

      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Encabezado del artista */}
        {artistData && (
          <ArtistHeader 
            name={artistData.name} 
            imageUrl={artistData.image?.[3]?.['#text'] || 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=800&h=400'} 
            listeners={artistData.stats?.listeners} 
            playcount={artistData.stats?.playcount}
            tags={artistData.tags?.tag || []}
          />
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-6 md:mt-8">
          <div className="lg:col-span-2">
            {/* Información del artista */}
            {artistData && (
              <ArtistInfo 
                bio={artistData.bio?.content} 
                tags={artistData.tags?.tag || []}
              />
            )}
            
            {/* Temas principales */}
            <TopTracks 
              isLoading={isLoadingTracks} 
              tracks={topTracksData || []}
              artistName={decodedArtistName}
            />
            
            {/* Álbumes del artista */}
            <ArtistAlbums 
              artistName={decodedArtistName}
            />
            
            {/* Artistas similares */}
            <SimilarArtists 
              isLoading={isLoadingSimilar} 
              artists={similarArtistsData || []}
            />
            
            {/* Sección de oyentes */}
            <Listeners 
              artistName={decodedArtistName}
            />
            
            {/* Sección de comentarios */}
            <CommentSection comments={comments} />
          </div>
          
          {/* Columna lateral derecha */}
          <div className="lg:col-span-1">
            
            {artistData && (
              <ArtistLinks 
                url={artistData.url} 
                name={artistData.name}
                ontour={artistData.ontour === "1"}
              />
            )}
          </div>
        </div>
      </div>
      <Footer />
      </div>
    </>
  );
};

export default ArtistPage;