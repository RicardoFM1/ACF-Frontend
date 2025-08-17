import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login/login";
import { Cadastro } from "../pages/cadastro/cadastro";
import { Home } from "../pages/home/home"
import { Agendar } from "../pages/agendar/agendar";
import { Admin } from "../pages/admin/admin";

export const Rotas = () => {
    return <Routes>
        <Route path="/login" element={<Login/>} />
         <Route path="/cadastro" element={<Cadastro/>} />
          <Route path="/" element={<Home/>} />
          <Route path="/admin" element={<Admin/>}/>
          <Route path="/agendar" element={<Agendar/>}/>
    </Routes>
} 