import { BrowserRouter as Router } from "react-router-dom";
import MenuDesktop from "./layout/MenuDesktop";
import Overview from "./pages/Overview";
import { Rotas } from "./pages/Rotas";
import HeaderMobile from "./layout/HeaderMobile/HeaderMobile";
import Details from "./layout/Details";

function App() {
  return (
    <Router>
      <div className="flex">
        <MenuDesktop />
        <HeaderMobile/>
        <Rotas />
      </div>
    </Router>
  );
}

export default App;
