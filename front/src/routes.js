import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PagNaoEncontrada from "./pages/PagNaoEncontrada";
import Cadastro from "./pages/Cadastro";
import RecuperarSenha from "./pages/RecuperarSenha";
import Perfil from "./pages/Perfil";
import Anuncio from "./pages/Anuncio";
import RotaProtegida from "./utils/RotaProtegida"; // Importa o componente
import AnuncioUnico from "./pages/AnuncioUnico/index.jsx"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/recuperarSenha" element={<RecuperarSenha />} />
        <Route path="/anuncio/buscar" element={<Anuncio />} />
        <Route path="/anuncio/id" element={<AnuncioUnico />} />
        <Route path="*" element={<PagNaoEncontrada />} />
        
        {/* aqui protege a rota /perfil com o componente HOC criado em utils, sempre que quiser proteger envelopa aassim*/}
        <Route 
          path="/perfil" 
          element={
            <RotaProtegida>
              <Perfil />
            </RotaProtegida>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
