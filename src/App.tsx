import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Books }        from './pages/Books';
import { NotFoundPage } from './pages/NotFound';
import { basename }     from './config/server';
import './style.css';

function App() {

  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
