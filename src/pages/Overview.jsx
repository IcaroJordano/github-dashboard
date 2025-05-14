import { useContext, useEffect, useState } from "react";
import CardRepositorio from "../components/CardRepositorio";
import logo from "../assets/logo2.png";
import { CiLocationOn } from "react-icons/ci";
import { SearchContext } from "../context/SearchContext";
import { BiX } from "react-icons/bi";
import Details from "../layout/Details";

const Overview = () => {
  const [isClose, setIsClose] = useState(true);
  const [isPreview, setIsPreview] = useState(false);
  const [repositorio, setRepositorio] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const {
    searchValue,
    repositorios,
    isLoading,
    dataUser,
    setSearchValue,
    userName,
  } = useContext(SearchContext);

  const deploys = repositorios
    ? repositorios.filter((repo) => repo.has_pages)
    : [];

  return (
    <section className="mt-16 lg:mt-0mt-14 lg:mt-0 pt-7 bg-neutral-100 relative min-h-screen overflow-x-hidden">
      <div className="ps-4 lg:ps-6 flex mb-8">
        <img
          className="w-20 h-20 rounded-full bg-black object-top "
          src={dataUser.avatar_url || logo}
          alt=""
        />
        <div className="ms-4 text-neutral-500">
          <h2 className="font-semibold text-2xl text-black">{dataUser.name}</h2>
          <p className="my-1">{dataUser.bio}</p>
          <p className="flex items-center mt-1">
            <CiLocationOn className="me-1" />
            {dataUser.location}
          </p>
        </div>
      </div>
      <div className="ms-4 lg:ms-6 flex text-sm    p-1   ">
        <div className="flex bg-zinc-200 rounded-lg p-1 justify-around">
          <span
            className={`flex cursor-pointer ${
              isPreview ? "bg-neutral-200" : "bg-neutral-100"
            } hover: p-1  px-6  text-center justify-center rounded-sm `}
            onClick={() => {
              setIsPreview(false);
            }}
          >
            All
          </span>
          <span
            className={`flex cursor-pointer ${
              isPreview ? "bg-neutral-100" : "bg-neutral-200"
            } hover: p-1  px-4  text-center justify-center rounded-sm `}
            onClick={() => {
              setIsPreview(true);
            }}
          >
            Previews
          </span>
        </div>
      </div>

      {!isLoading && repositorios.length < 1 && (
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

      <div className="px-4 lg:px-6 scroll-custom flex-col min-w-screen w-full  overflow-x-hidden flex lg:flex-row  lg:flex-wrap gap-4 mt-8 h-[500px] lg:h-96 overflow-auto ">
        {!isLoading
          ? isPreview
            ? deploys.map((repositorio, index) => (
                <CardRepositorio
                  setIsClose={setIsClose}
                  repositorio={repositorio}
                  setRepositorio={setRepositorio}
                  key={index}
                />
              ))
            : repositorios.map((repositorio, index) => (
                <CardRepositorio
                  setIsClose={setIsClose}
                  repositorio={repositorio}
                  setRepositorio={setRepositorio}
                  key={index}
                />
              ))
          : ""}

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

export default Overview;
