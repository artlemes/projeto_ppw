import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import PagNaoEncontrada from "./pages/PagNaoEncontrada";
import Cadastro from "./pages/Cadastro";

function AppRoutes() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home/> }> </Route>
                <Route path="/login" element={ <Login/> }> </Route>
                <Route path="/cadastro" element={ <Cadastro/> }> </Route>
                <Route path="*" element={ <PagNaoEncontrada/> }> </Route>


            </Routes>
        
        </BrowserRouter>
    );

}

export default AppRoutes;