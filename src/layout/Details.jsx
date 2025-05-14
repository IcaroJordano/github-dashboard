import { useContext, useEffect, useState } from "react";
import { BiX } from "react-icons/bi";
import { FaExternalLinkAlt, FaLink } from "react-icons/fa";
import { GoRepoPush } from "react-icons/go";
import { SearchContext } from "../context/SearchContext";

const Details = ({ isOpen, setIsOpen, repositorio }) => {
  const [readme, setReadme] = useState("");

  const {
    searchValue,
    repositorios,
    isLoading,
    dataUser,
    setSearchValue,
    userName,
  } = useContext(SearchContext);


  useEffect(() => {
    // if (!repositorio?.name || !userName) return; // só executa se os dados estiverem prontos

    const request = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/repos/${userName===''?"icarojordano":userName }/${repositorio.name}/readme`
        );
        console.log(res)
        const data = await res.json();

        if (data?.content) {
          const markdown = atob(data.content);
          setReadme(markdown);
          console.log(markdown);
        } else {
          setReadme("README não encontrado.");
          console.log("README não encontrado.");

        }
      } catch (error) {
        console.error("Erro ao buscar README:", error);
        setReadme("Não foi possível carregar o README.");
      }
    };

    request();
  }, [repositorio, userName]);

  return (
    <>
      {!isOpen && (
        <section className="fixed top-0 left-0 z-50 py-8  lg:py-1/12 flex justify-center  lg:items-center  h-screen w-full backdrop-blur bg-neutral-100/30">
          <div className=" lg:w-8/12 w-11/12 border border-neutral-300 rounded-lg bg-white">
            <div className=" py-6 font-semibold   flex px-8 text-2xl items-center justify-between">
              <h2 className="flex items-center">
                <GoRepoPush className="text-lg mr-2 mt-1" />
                {repositorio.name}
              </h2>
              <BiX
                className="cursor-pointer"
                onClick={() => {
                  console.log(false);
                  console.log(isOpen);
                  setIsOpen(true);
                }}
              />
            </div>
            <div className="flex gap-6 flex-wrap flex-row  px-2 justify-around text-sm py-6 border-y border-neutral-300">
              <div className="w-5/12 mx-auto lg:w-3/12">
                <h3 className="font-semibold mb-1 ">Criado em</h3>
                <p>
                  {new Date(repositorio.created_at).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>
              <div className="w-5/12 mx-auto lg:w-3/12">
                <h3 className="font-semibold mb-1 ">Última atualização</h3>
                <p>
                  {new Date(repositorio.updated_at).toLocaleDateString(
                    "pt-BR",
                    {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    }
                  )}
                </p>
              </div>
              <div className="w-5/12 mx-auto lg:w-3/12">
                <h3 className="font-semibold mb-1 ">Criado em</h3>
                <p>
                  {repositorio.language
                    ? repositorio.language
                    : "Não especificada"}
                </p>
              </div>
              <div className="w-5/12 mx-auto lg:w-3/12">
                <h3 className="font-semibold mb-1 ">Stars</h3>
                <p>{repositorio.stargazers_count}</p>
              </div>
              <div className="w-5/12 mx-auto lg:w-3/12">
                <h3 className="font-semibold mb-1 ">Forks</h3>
                <p>{repositorio.forks}</p>
              </div>
              <div className="w-5/12 mx-auto lg:w-3/12">
                <h3 className="font-semibold mb-1 ">Issues abertas</h3>
                <p>{repositorio.open_issues}</p>
              </div>
            </div>
            <div className="w-11/12 mx-auto  mt-2    ">
              <div className="flex justify-between py-4 items-center">
                <h3 className="font-semibold">README</h3>
                <div className="flex gap-4 flex-col lg:flex-row">
                  <a
                    className="flex bg-neutral-100 text-sm py-2 px-4 border border-neutral-300 rounded-lg items-center"
                    href={repositorio.html_url}
                    target="_blank"
                  >
                    <FaExternalLinkAlt className="mr-3" />
                    Abrir no Github
                  </a>
                  {repositorio.has_pages && (
                    <a
                      className="flex bg-neutral-100 text-sm py-2 px-4 border border-neutral-300 rounded-lg items-center"
                      target="_blank"
                      href={`https://${userName}.github.io/${repositorio.name}/`}
                    >
                      <FaLink className="mr-3" />
                      Ver Deploy
                    </a>
                  )}
                </div>
              </div>
              <hr className="text-neutral-300" />
              <div className="overflow-auto h-48  lg:h-48 scroll-custom leading-9  text-neutral-700 text-sm my-8 ">
                {readme}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
export default Details;
