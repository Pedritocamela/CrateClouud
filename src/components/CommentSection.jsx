import { useState } from 'react';

const CommentSection = ({ comments = [] }) => {
  const [newComment, setNewComment] = useState('');
  const [localComments, setLocalComments] = useState(comments);
  
  // Función para formatear fechas
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Hoy';
    } else if (diffDays === 1) {
      return 'Ayer';
    } else if (diffDays < 7) {
      return `Hace ${diffDays} días`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `Hace ${weeks} ${weeks === 1 ? 'semana' : 'semanas'}`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `Hace ${months} ${months === 1 ? 'mes' : 'meses'}`;
    } else {
      return date.toLocaleDateString('es-ES', {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
      });
    }
  };
  
  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // Crear nuevo comentario simulado (en una app real, se enviaría al backend)
    const newCommentObj = {
      id: Date.now(),
      username: 'usuario',
      avatarUrl: 'src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg/960px-Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg"',
      content: newComment.trim(),
      date: new Date().toISOString(),
      likes: 0
    };
    
    // Actualizar estado local
    setLocalComments([newCommentObj, ...localComments]);
    setNewComment('');
  };
  
  return (
    <div className="glass rounded-xl p-6 mb-8">
      <h2 className="text-2xl font-unbounded font-bold text-white mb-6">Opiniones</h2>
      
      {/* Formulario para nuevo comentario */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-800/50 flex-shrink-0">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg/960px-Kanye_West_at_the_2009_Tribeca_Film_Festival_%28crop_2%29.jpg" 
              alt="Tu avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Escribe un comentario..."
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent min-h-[100px] resize-none"
            ></textarea>
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-500 hover:to-purple-700 text-white rounded-full py-2 px-4 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Publicar
              </button>
            </div>
          </div>
        </div>
      </form>
      
      {/* Lista de comentarios */}
      {localComments.length > 0 ? (
        <div className="space-y-6">
          {localComments.map((comment) => (
            <div key={comment.id} className="flex gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-800/50 flex-shrink-0">
                <img 
                  src={comment.avatarUrl} 
                  alt={`Avatar de ${comment.username}`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-bold text-white">{comment.username}</div>
                    <div className="text-white/40 text-xs">{formatDate(comment.date)}</div>
                  </div>
                  <p className="text-white/80">{comment.content}</p>
                </div>
                <div className="flex gap-4 mt-2 pl-2">
                  <button className="text-white/50 hover:text-white text-sm flex items-center gap-1 transition-colors">
                    <i className="ri-heart-line"></i> 
                    <span>{comment.likes}</span>
                  </button>
                  <button className="text-white/50 hover:text-white text-sm transition-colors">
                    Responder
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <div className="text-white/50">No hay comentarios aún</div>
          <p className="text-white/30 text-sm mt-1">¡Sé el primero en compartir tu opinión!</p>
        </div>
      )}
    </div>
  );
};

export default CommentSection;