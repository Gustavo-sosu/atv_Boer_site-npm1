import logo from './logo.svg'; // Descomente ou ajuste o caminho do logo
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';
import Contact from './screens/Contact';
import About from './screens/About';
import Cadastrar from './screens/Register';
import Painel from './screens/Painel'; // Corrija o nome aqui
import Products from './screens/Products';
import Brand from './screens/Brand';
import RegisterShop from './screens/RegisterShop';
import NavBar from './components/NavBar';

import PublicLayout from './components/PublicLayout'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <NavBar />
        </header>

        <div className="App-fundo" alt="fundo"></div>

        <main className="container">
          <Routes>
            <Route element={<PublicLayout />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Cadastrar />} />
            <Route path="/registerShop" element={<RegisterShop />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />

            {/* Layout ADMIN (sem navbar, sem logo) */}
            <Route path="/painel" element={<Painel />}>
              <Route path="products" element={<Products />} />
              <Route path="brand" element={<Brand />} />
            </Route>
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;