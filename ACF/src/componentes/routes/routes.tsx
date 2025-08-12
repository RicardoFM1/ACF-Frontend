import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login/login";
import { Cadastro } from "../pages/cadastro/cadastro";
import { Home } from "../pages/home/home"

export const Rotas = () => {
    return <Routes>
        <Route path="/login" element={<Login/>} />
         <Route path="/cadastro" element={<Cadastro/>} />
          <Route path="/" element={<Home/>} />
    </Routes>
}