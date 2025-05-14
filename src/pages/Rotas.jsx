import { Routes, Route } from "react-router-dom";
import Overview from "./Overview";
import Repositorio from "./Repositorios";
import Deploys from "./Deploys";

export function Rotas() {
  return (
    <Routes>
      <Route path="/github-dashboard/" element={<Overview />}></Route>
      <Route path="/github-dashboard/repositorios" element={<Repositorio/>}></Route>
      <Route path="/github-dashboard/deploys" element={<Deploys/>}></Route>
    </Routes>
  );
}
