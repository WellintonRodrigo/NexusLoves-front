import React, {useState} from 'react';
import api from './../services/api';

interface VibeFormProps {
  onSuccess: () => void; // Para atualizar a lista após postar
}

export function VibeForm({onSuccess}: VibeFormProps){
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');

    const handleSubmit = async(e: React.BaseSyntheticEvent) =>{
        e.preventDefault();
        try{
            await api.post('/VibePosts', {title, content, author});
            setTitle('');
            setContent('');
            setAuthor('');
            onSuccess(); //Recarrega o feed.
        } catch(error){
            console.error('Erro ao criar vibe:', error);
        }
    };

return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 max-w-2xl mx-auto">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Compartilhe uma nova vibe</h3>
      <div className="space-y-4">
        <input 
          type="text" 
          placeholder="Título da vibe"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          required
        />
        <textarea 
          placeholder="O que está acontecendo?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all min-h-[100px]"
          required
        />
        <div className="flex gap-4">
          <input 
            type="text" 
            placeholder="Seu nome"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="flex-1 p-3 rounded-xl border border-gray-100 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button 
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
          >
            Postar
          </button>
        </div>
      </div>
    </form>
  );
}