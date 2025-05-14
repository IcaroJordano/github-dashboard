import { useState, useEffect, useRef } from "react"
import { BiMenu } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

const Menu = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null); // Referência para o menu
    const buttonRef = useRef(null); // Referência para o botão

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                menuRef.current && !menuRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
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
                    className="cursor-pointer flex items-end"
                    onClick={() => { setIsOpen(!isOpen) }}
                >
                    {isOpen ? (
                        <IoClose className="z-50 transition-all duration-700 lg:text-xl mx-2 my-auto" />
                    ) : (
                        <BiMenu className="z-50 transition-all duration-700 text-3xl mx-2 my-auto" />
                    )}
                    <span className="me-5 ms-2 hidden lg:flex">Menu</span>
                </button>
            </div>

            <div
                ref={menuRef}
                className={`absolute lg:h-screen bg-white shadow-lg rounded-xl w-9/12 lg:w-0 ${isOpen ? "h-auto lg:w-4/12" : 'h-0 bg-transparent text-transparent w-0 overflow-hidden'} transition-all duration-700 top-12 z-40 left-10`}
            >
                <div className="p-6 pt-10 flex flex-col text-[18px] gap-8 lg:pt-15">
                    {children}
                </div>
            </div>
        </>
    );
}

export default Menu;