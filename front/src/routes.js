import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PagNaoEncontrada from "./pages/PagNaoEncontrada";
import Cadastro from "./pages/Cadastro";
import RecuperarSenha from "./pages/RecuperarSenha";
import Perfil from "./pages/Perfil";
import Anuncio from "./pages/Anuncio";
import Padrao from "./pages/Padrao";
import RotaProtegida from "./utils/RotaProtegida";
import CriarAnuncio from "./pages/CriarAnuncio"; // Importa o componente
import ListagemDeAnuncios from "./pages/ListagemDeAnuncios";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>

                <Route path="/login" element={<Login/>}/>
                <Route path="/cadastro" element={<Cadastro/>}/>
                <Route path="/recuperarSenha" element={<RecuperarSenha/>}/>
                <Route path="*" element={<PagNaoEncontrada/>}/>
                <Route path="/listagem" element={<ListagemDeAnuncios/>}/>
                
                {/* aqui protege a rota /perfil com o componente HOC criado em utils, sempre que quiser proteger envelopa aassim*/}
                <Route path="/perfil" element={<RotaProtegida><Padrao><Perfil/></Padrao></RotaProtegida>}/>
                <Route path="/anuncio/buscar" element={<RotaProtegida><Padrao><Anuncio/></Padrao></RotaProtegida>}/>
                <Route path="/" element={<RotaProtegida><Home/></RotaProtegida>}/>
                <Route path="/criaranuncio" element={<RotaProtegida><Padrao><CriarAnuncio/></Padrao></RotaProtegida>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
