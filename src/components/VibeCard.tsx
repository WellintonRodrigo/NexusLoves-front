import React, {useState} from 'react';
import type {VibePost} from './../types/vibe';
import api from './../services/api';
import {Pencil, Check, X} from 'lucide-react';

interface VibeCardProps{
    vibe: VibePost;
    onUpdateSuccess:() => void;

}


export function VibeCard({ vibe, onUpdateSuccess }: VibeCardProps) {
const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({ title: "", content: "" });

  const handleUpdate = async ()=>{
    try{
      await api.put(`/VibePosts/${vibe.id}`,{
      id: vibe.id,
      title: editValues.title|| vibe.title, //Se estiver vazio, usa o original
      content: editValues.content || vibe.content, //Se estiver vazio, usa o original
      author: vibe.author,
      createdAt: vibe.createdAt
    });
    setEditValues({title:"", content:""});
      setIsEditing(false);
     onUpdateSuccess();

    }catch(error){
      console.error("Erro ao salvarno banco:", error);
      alert("Não foi possível salvar as alterações.");
    }
    
  };
  
  return (
    <article className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow mb-6 px-6">
     <div className="flex justify-between items-start mb-1 p-1 ">
      
  {isEditing ? (
    <input 
      className="text-xl  font-bold text-gray-800 w-full border-b border-blue-400 outline-none bg-transparent placeholder:text-gray-400/50 placeholder:font-normal" 
      value={editValues.title}
      onChange={(e) => setEditValues({...editValues, title: e.target.value})}
      placeholder={vibe.title}
    />
  ) : (
    <h2 className="text-xl mb-1 font-bold text-gray-800 items-center">{vibe.title}</h2>
  )}
  

  {/* O trecho que você perguntou entra aqui: */}
  <div className="flex gap-2 ml-4">
    {isEditing ? (
      <>
        <button onClick={handleUpdate} className="p-1 text-green-600 hover:bg-green-50 rounded-full transition-colors" title="Salvar">
          <Check size={20} />
        </button>
        <button onClick={() => setIsEditing(false)} className="p-1 text-red-600 hover:bg-red-50 rounded-full transition-colors" title="Cancelar">
          <X size={20} />
        </button>
      </>
    ) : (
      <button onClick={() => setIsEditing(true)} className="p-1 text-slate-400 hover:text-blue-600 transition-colors items-center" title="Editar vibe">
        <Pencil size={18} />
      </button>
    )}
  </div>
</div>

{/* Aqui você faz o mesmo para o parágrafo (vibe.content) logo abaixo */}
<div className="mt-1 p-2">
{isEditing ? (
  <textarea 
    className="w-full text-gray-600 leading-relaxed border-l-2 border-blue-200 pl-2 outline-none bg-transparent placeholder:text-gray-400/50 placeholder:italic"
    value={editValues.content}
    onChange={(e) => setEditValues({...editValues, content: e.target.value})}
    placeholder={vibe.content}
  />
) : (
  <p className="text-gray-600 leading-relaxed border-l-2 border-blue-100 pl-3 ">{vibe.content}</p>
)}
</div>
       <div className="mt-2 text-sm text-gray-500 mb-1">
            Postado por <span className="font-semibold text-blue-500">{vibe.author}</span>
          </div>
          
          {/* Área de Reações */}
          <div className="flex gap-2">
            {vibe.reactions?.map(r => (
              <span key={r.id} className="bg-blue-50 px-2 py-1 rounded-full text-xs text-blue-600 font-medium mb-1">
                {r.reactionType}
              </span>
            ))}
          </div>

      {/* Seção de Comentários */}
      <section className="bg-gray-50 p-3 border-t border-gray-100">
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
