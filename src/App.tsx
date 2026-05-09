import { useEffect, useState } from 'react'
import api from './services/api'

interface VibePots{
  id: number;
  title: string;
  content: string;
  author: string;
}

function App() {
const [vibes, setVibes] = useState<VibePots[]>([])

useEffect(() => {

  api.get('/VibePosts').then((response) => {
    setVibes(response.data);
  })
  .catch((error) => {
    console.error("Erro ao buscar vibes", error);
  });
}, [])


  return (
   <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>NexusLoves - Feed de Vibes</h1>
      <hr />
      
      {vibes.length === 0 && <p>Carregando ou nenhuma vibe encontrada...</p>}

      <div style={{ display: 'grid', gap: '20px' }}>
        {vibes.map(vibe => (
          <div key={vibe.id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            <h2>{vibe.title}</h2>
            <p>{vibe.content}</p>
            <small>Postado por: <strong>{vibe.author}</strong></small>
          </div>
      ))}
    </div>
    </div>
  )
}

export default App