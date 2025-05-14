import { useState, createContext, useEffect, useRef } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState("");
  const [userName, setUserName] = useState("IcaroJordano");
  const [dataUser, setDataUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [repositorios, setRepositorios] = useState([]);

  const token =
  "";


  useEffect(() => {
    const fetchData = async () => {
      const user = userName === "" ? "IcaroJordano" : userName;

      setIsLoading(true);

      try {
        // Busca dados do usuário

        const resUser = await fetch(`https://api.github.com/users/${user}`, {
          // headers: {
          //   Authorization: `token ${token}`,
          // },
        });

        if (!resUser.ok) throw new Error("Usuário não encontrado");
        const dataUser = await resUser.json();
        setDataUser(dataUser);
        console.log(dataUser)

        // Busca repositórios do usuário
        const resRepos = await fetch(
          `https://api.github.com/users/${user}/repos?per_page=100&sort=updated`,
          // {
          //   headers: {
          //     Authorization: `token ${token}`,
          //   },
          // }
        );

        if (!resRepos.ok) throw new Error("Repositórios não encontrados");
        const dataRepos = await resRepos.json();

        setRepositorios(Array.isArray(dataRepos) ? dataRepos : []);
      } catch (error) {
        console.error("Erro ao buscar dados:", error.message);
        setRepositorios([]); // evita o erro do map
        setDataUser({}); // evita crash em `dataUser.avatar_url`
      } finally {
        setIsLoading(false);
        // setIsOpen(false);
      }
    };

    fetchData();
  }, [userName]);

  return (
    <SearchContext.Provider
      value={{ dataUser,userName, repositorios,isLoading,setUserName, searchValue, setSearchValue }}
    >
      {children}
    </SearchContext.Provider>
  );
};
