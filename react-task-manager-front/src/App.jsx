import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import { GlobalProvider } from './context/GlobalContext';
function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/add" element={<AddTask />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  )
}

export default App;

// Milestone 2 - Setup Context API e Fetch Iniziale
// Creare un contesto globale per la gestione dei dati e recuperare la lista dei task dall'API.


// Salvare l'URL dell'API nel file .env del progetto frontend:
// Creare un file .env nella cartella del progetto frontend e aggiungere lo URL della API raccolto alla Milestone 1.
// In questo modo, l'URL sarà accessibile in tutto il progetto senza doverlo scrivere manualmente nel codice.

// Creare un Context API (GlobalContext) per gestire lo stato globale dell'applicazione.

// Definire uno useState all'interno del provider, per memorizzare la lista dei task.

// Effettuare una richiesta GET a /tasks al caricamento dell'app, utilizzando useEffect, e salvare i dati nello stato.

// Stampare in console i dati ricevuti per verificare il corretto recupero delle informazioni.

// Rendere disponibile il GlobalContext.Provider in App.jsx, avvolgendo l'intera applicazione.