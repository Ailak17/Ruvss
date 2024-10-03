import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Nav from './components/Nav';
import './App.css';
import DataGrid from './components/DataGrid';
import PaginaDeCarga from './pages/PaginaDeCarga';
import PaginaDeBusqueda from './pages/PaginaDeBusqueda';

function App() {
  return (
    <div className="App">
        <Header />
        <BrowserRouter>
          <Nav />

          <Routes>
            <Route path='/' element={<DataGrid/>}/>
            <Route path='/carga' element={<PaginaDeCarga/>}/>
            <Route path='/busqueda' element={<PaginaDeBusqueda/>}/>
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
