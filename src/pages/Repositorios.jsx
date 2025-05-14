import { useContext, useEffect, useState } from "react";
import CardRepositorio from "../components/CardRepositorio";
import logo from "../assets/logo2.png";
import { CiLocationOn } from "react-icons/ci";
import { SearchContext } from "../context/SearchContext";
import { BiSearch, BiX } from "react-icons/bi";
import Details from "../layout/Details";

const Repositorio = () => {
  const [repositorio, setRepositorio] = useState();
  const [searchRepositorios, setSearchRepositorios] = useState('');
  const [isClose, setIsClose] = useState(true);

  const [dataUser, setDataUser] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const { searchValue, setSearchValue, userName,repositorios,isLoading } = useContext(SearchContext);


  const repositoriosFiltrados = repositorios
  ? repositorios.filter(
      (repo) =>
        repo.name.toLowerCase().includes(searchRepositorios.toLowerCase())
    )
  : [];


 

  return (
    <section className="mt-16 lg:mt-0 pt-4 bg-neutral-100 relative min-h-screen overflow-x-hidden">
      <div className=" ms-4 lg:ms-6 flex flex-col lg:flex-row w-full  justify-between lg:items-center">
        <h2 className="text-2xl font-semibold" >Repositórios</h2>
        <div
          className={`w-86   items-center me-16  lg:my-8 mt-8  flex   transition-all duration-500     border border-neutral-900/20  rounded-lg h-10 ps-4 bg-neutral-50 `}
        >
          <BiSearch className="text-neutral-800 mr-1" />
          <input
            onChange={(e) => setSearchRepositorios(e.target.value)}

            className="w-11/12 outline-none ring-0 text-neutral-8 00 text-sm"
            placeholder="Buscar Repositório"
            type="text"
          />
        </div>
      </div>

      {!isLoading && repositoriosFiltrados.length < 1 && (
        <div className="flex  justify-center  ">
          <div className="text-center py-8 mt-28">
            <h4 className="text-lg ">Nenhum repositório encontrado</h4>
            <p className="text-sm text-neutral-500 mt-1">
              Este usuário ainda não tem repositórios públicos
            </p>
          </div>
          <div
            className={` ${
              isOpen ? "translate-x-full  mr-0" : "mr-8"
            } absolute duration-300 transition-all bottom-52 right-0  bg-red-500/90 text-neutral-100 px-6 py-6 rounded-lg group  `}
          >
            <BiX
              onClick={() => {
                setIsOpen(true);
              }}
              className="absolute right-3 text-2xl top-2 text-neutral-300/80 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            <h4 className="text-sm font-semibold">Erro ao carregar usuário</h4>
            <p className="text-sm mt-1">
              Verifique o nome de usuário e tente novamente
            </p>
          </div>
        </div>
      )}

      <div className="px-4 lg:px-6 scroll-custom flex-col min-w-screen w-full  overflow-x-hidden flex lg:flex-row  lg:flex-wrap gap-4 lg:h-auto  mt-8 h-[500px]  overflow-auto ">
        {!isLoading &&
          repositoriosFiltrados.map((repositorio, index) => (
            <CardRepositorio

            repositorio={repositorio}
            setRepositorio={setRepositorio}
            setIsClose={setIsClose}

            />
          ))}

        {isLoading && (
          <>
            <CardRepositorio />
            <CardRepositorio />
            <CardRepositorio />
            <CardRepositorio />
            <CardRepositorio />
            <CardRepositorio />
          </>
        )}
      </div>
      <Details isOpen={isClose} setIsOpen={setIsClose} repositorio={repositorio} />

    </section>
  );
};

export default Repositorio;
