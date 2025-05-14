import { Routes, Route } from "react-router-dom";
import Overview from "./Overview";
import Repositorio from "./Repositorios";
import Deploys from "./Deploys";

export function Rotas() {
  return (
    <Routes>
      <Route path="/" element={<Overview />}></Route>
      <Route path="/repositorios" element={<Repositorio/>}></Route>
      <Route path="/deploys" element={<Deploys/>}></Route>
    </Routes>
  );
}
