import NavBar from "../NavBar";
import logo from "../../assets/logo.png";
import Menu from "./Menu";
import Search from "./Search";

const HeaderMobile = () => {
  return (
    <header className="lg:hidden h-16 text-2xl text-neutral-900/70 border-b border-neutral-400/20 bg-white justify-between items-center flex  w-full fixed top-0 z-50">
      <Menu>
        <NavBar />
      </Menu>

      <span className="flex items-center gap-x-2">
        <img className="h-8 rounded-full"  src={logo} alt="" />
        <p className="text-lg font-semibold  font-sans">Painel Github</p>
      </span>
      <Search />
    </header>
  );
};
export default HeaderMobile;
