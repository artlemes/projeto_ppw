import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PagNaoEncontrada from "./pages/PagNaoEncontrada";
import Cadastro from "./pages/Cadastro";
import RecuperarSenha from "./pages/RecuperarSenha";
import Perfil from "./pages/Perfil";
import Anuncio from "./pages/Anuncio";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          {" "}
        </Route>
        <Route path="/login" element={<Login />}>
          {" "}
        </Route>
        <Route path="/cadastro" element={<Cadastro />}>
          {" "}
        </Route>
        <Route path="/recuperarSenha" element={<RecuperarSenha />}>
          {" "}
        </Route>
        <Route path="*" element={<PagNaoEncontrada />}>
          {" "}
        </Route>
        <Route path="/perfil" element={<Perfil />}>
          {" "}
        </Route>
        <Route path="/anuncio/buscar" element={<Anuncio />}>
          {" "}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
