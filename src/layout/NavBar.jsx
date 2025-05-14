import { useContext } from "react";
import { FaCloudArrowUp, FaSquarePollVertical } from "react-icons/fa6";
import { GoHome } from "react-icons/go";
import { LuUsers } from "react-icons/lu";
import { Link } from "react-router-dom";

import { useLocation } from "react-router-dom";
import { SearchContext } from "../context/SearchContext";

const NavBar = () => {
  const location = useLocation();

  const { searchValue, setSearchValue, setUserName, repositorios,dataUser } =
    useContext(SearchContext);

    const deploys =repositorios?repositorios.filter(repo => repo.has_pages) : []


  return (
    <nav className="flex gap-0.5 flex-col justify-center  items-center text-sm text-neutral-700">
      <Link
        to={"/"}
        className={`flex rounded-lg w-full  items-center ps-4 py-3 ${
          location.pathname === "/" ? "bg-neutral-100" : ""
        }`}
      >
        <GoHome className="text-xl mb-1 mr-2" />
        Dashboard
      </Link>
      <Link
        to={"/repositorios"}
        className={`flex rounded-lg w-full justify-between items-center ps-4 py-3 ${
          location.pathname === "/repositorios" ? "bg-neutral-100" : ""
        }`}
      >
        <span className="flex">
          <FaSquarePollVertical className="text-lg mb-1 mr-2" />
          Repositórios
        </span>
        <span className="bg-neutral-100 mr-4 w-6 flex justify-center items-center    h-6 rounded-full">
          {dataUser.public_repos}
        </span>
      </Link>
      <Link
        to={"/deploys"}
        className={`flex justify-between rounded-lg w-full  items-center ps-4 py-3 ${
          location.pathname === "/deploys" ? "bg-neutral-100" : ""
        }`}
      >
        <span className="flex">
          <FaCloudArrowUp className="text-lg mb-1 mr-2" />
          Deploys
        </span>
        <span className="bg-neutral-100 mr-4 w-6 flex justify-center items-center    h-6 rounded-full">
          {deploys.length}
        </span>
      </Link>
      <span className="flex justify-between rounded-lg w-full  items-center ps-4 py-3">
        <span className="flex">
          <LuUsers className="text-base mb-1 mr-2" />
          Seguidores
        </span>
        <span className="bg-neutral-100 mr-4 w-6 flex justify-center items-center    h-6 rounded-full">
          {dataUser.followers}
        </span>
      </span>
      <span className="flex justify-between rounded-lg w-full  items-center ps-4 py-3">
        <span className="flex">
          <LuUsers className="text-base mb-1 mr-2" />
          Seguindo
        </span>
        <span className="bg-neutral-100 mr-4 w-6 flex justify-center items-center    h-6 rounded-full">
          {dataUser.following}
        </span>
      </span>
    </nav>
  );
};

export default NavBar;
