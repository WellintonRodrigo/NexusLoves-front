import type {VibePost} from './../types/vibe';

interface VibeCardProps{
    vibe: VibePost
}

export function VibeCard({ vibe }: VibeCardProps) {
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow mb-6">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{vibe.title}</h2>
        <p className="text-gray-600 leading-relaxed">{vibe.content}</p>
        
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="text-gray-400">
            Postado por <span className="font-semibold text-blue-500">{vibe.author}</span>
          </span>
          
          {/* Área de Reações */}
          <div className="flex gap-2">
            {vibe.reactions?.map(r => (
              <span key={r.id} className="bg-blue-50 px-2 py-1 rounded-full text-xs text-blue-600 font-medium">
                {r.reactionType}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Seção de Comentários */}
      <section className="bg-gray-50 p-4 border-t border-gray-100">
        <h4 className="text-[10px] font-bold tracking-widest text-gray-400 uppercase mb-3">Comentários</h4>
        <div className="space-y-2">
          {vibe.comments?.map(comment => (
            <div key={comment.id} className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
              <p className="text-sm text-gray-700">{comment.content}</p>
            </div>
          ))}
          {(!vibe.comments || vibe.comments.length === 0) && (
            <p className="text-xs text-gray-400 italic">Nenhuma interação por aqui ainda...</p>
          )}
        </div>
      </section>
    </article>
  );
}
