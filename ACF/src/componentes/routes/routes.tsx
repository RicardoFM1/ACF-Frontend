import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/login/login";

export const Rotas = () => {
    return <Routes>
        <Route path="/login" element={<Login/>} />
    </Routes>
}