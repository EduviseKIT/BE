import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Index from './components/index/index';
import AIPage from './components/AIPage/AIPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Index />}/>
          <Route path='/AIPage' element={<AIPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
