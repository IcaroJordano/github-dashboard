import { useState, useEffect, useRef, useContext } from "react";
import { BiSearch } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

import { SearchContext } from "../../context/SearchContext";

const Search = ({ children }) => {
    const { searchValue, setSearchValue,setUserName,dataUser } = useContext(SearchContext);

    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        console.log("Enter pressionado! Valor:", searchValue);
        setUserName(searchValue)
        // Aqui você pode chamar uma função, fazer busca, etc.
      }
    };

  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div>
        <button
          ref={buttonRef}
          className="cursor-pointer flex items-end mr-2"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {isOpen ? (
            <IoClose className="z-50 transition-all duration-700 lg:text-xl mx-2 my-auto" />
          ) : (
            <BiSearch className="z-50 transition-all duration-700 lg:text-xl mx-2 my-auto" />
          )}
          <span className="me-5 ms-2 hidden lg:flex">Menu</span>
        </button>
      </div>

      <div
        ref={searchRef}
        className={`absolute lg:h-screen bg-white border-neutral-400/40 w-full lg:w-0 ${
          isOpen
            ? "h-20 lg:w-4/12"
            : "h-0 bg-transparent text-transparent w-0 border-b-0 overflow-hidden"
        } border-b transition-all duration-500 top-13 z-40 left-0`}
      >
        {/* <div
          className={`w-11/12 mx-auto my-4 ${
            isOpen ? "h-10 lg:w-4/12" : "h-0"
          } flex text-neutral-400 text-[18px] gap-1 transition-all duration-500 lg:pt-15 border border-neutral-400 rounded-3xl py-1 ps-4`}
        >
          <BiSearch
            className={`z-50 ${
              isOpen ? "h-6" : "h-0"
            } transition-all duration-700 lg:text-xl ms-2 my-auto`}
          />
          <input
            onChange={(e) => {
              onChangeSearch(e.target.value);
              console.log(e.target.value);
            }}
            className="outline-none ring-0 text-sm bg-transparent"
            placeholder="Pesquise p/ título"
            type="text"
          />
        </div> */}
        <div
          className={`w-11/12 mx-auto  items-center   mt-4  flex   transition-all duration-500     border border-neutral-900/20  rounded-xl h-10 ps-4 bg-neutral-50 `}
        >
          <BiSearch className="text-neutral-400 mr-1" />
          <input
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
            onKeyDown={(e) => handleKeyDown(e)}
            value={searchValue}
            className="w-11/12 outline-none ring-0 text-neutral-8 00 text-sm"
            placeholder="Buscar Usuario"
            type="text"
          />
        </div>
      </div>
    </>
  );
};

export default Search;
