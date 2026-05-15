import { useEffect, useState } from 'react'
import api from './services/api'
import type { VibePost }  from './types/vibe'
import { VibeCard } from './components/VibeCard';
import { Header } from './components/Header';
import { VibeForm } from './components/VibeForm';

function App() {
const [vibes, setVibes] = useState<VibePost[]>([])

const fetchVibes = () => {
    api.get('/VibePosts')
      .then(response => setVibes(response.data))
      .catch(err => console.error(err));
  };

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

    < VibeForm onSuccess={fetchVibes} />
        
  <main className="max-w-2xl mx-auto">
    {vibes.map(vibe => 
      <VibeCard key={vibe.id} vibe={vibe} onUpdateSuccess={fetchVibes} />
    )}
  </main>
</div>
);
}
export default App;