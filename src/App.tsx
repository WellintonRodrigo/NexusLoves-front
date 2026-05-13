import { useEffect, useState } from 'react'
import api from './services/api'
import type { VibePost }  from './types/vibe'
import { VibeCard } from './components/VibeCard';
import { Header } from './components/Header';

function App() {
const [vibes, setVibes] = useState<VibePost[]>([])

useEffect(() => {

  api.get('/VibePosts').then((response) => {
    setVibes(response.data);
  })
  .catch((error) => {
    console.error("Erro ao buscar vibes", error);
  });
}, [])


   return (
  <div className="min-h-screen bg-slate-50 p-40 md:p-40 font-sans">
    < Header />
    
  <main className="max-w-2xl mx-auto">
    {vibes.map(vibe => 
      <VibeCard key={vibe.id} vibe={vibe} />
    )}
  </main>
</div>
);
}
export default App;