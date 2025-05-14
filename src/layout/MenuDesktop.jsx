import { FaCloudArrowUp, FaSquarePollVertical } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { LuUsers } from "react-icons/lu";
import { Link } from "react-router-dom";

import logo from "../assets/logo2.png";
import { BiSearch } from "react-icons/bi";
import { SearchContext } from "../context/SearchContext";
import { useContext } from "react";
import NavBar from "./NavBar";

const MenuDesktop = () => {
  const { searchValue, setSearchValue,setUserName,dataUser } = useContext(SearchContext);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("Enter pressionado! Valor:", searchValue);
      setUserName(searchValue)
      // Aqui você pode chamar uma função, fazer busca, etc.
    }
  };

  return (
    <div className="lg:flex flex-col hidden px-4 h-screen relative w-64  border-e border-neutral-200 ">
      <span className="flex my-4 mx-auto items-center font-semibold gap-2">
        <img
          className="w-6 h-6 bg-neutral-500 rounded-full"
          src={logo}
          alt=""
        />
        <h1>Painel Github</h1>
      </span>
      <div
        className={`w-56 mx-auto  items-center   my-8  flex   transition-all duration-500     border border-neutral-900/20  rounded-lg h-10 ps-4 bg-neutral-50 `}
      >
        <BiSearch className="text-neutral-800 mr-1" />
        <input
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onKeyDown={ (e)=>handleKeyDown(e)}
          value={searchValue}
          className="w-11/12 outline-none ring-0 text-neutral-8 00 text-sm"
          placeholder="Buscar Usuario"
          type="text"
        />
      </div>
      <NavBar/>
    </div>
  );
};

export default MenuDesktop;
