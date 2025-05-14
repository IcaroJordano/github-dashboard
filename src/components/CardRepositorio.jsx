import { useEffect, useState } from "react";
import logo from "../assets/logo2.png";
import Details from "../layout/Details";

const CardRepositorio = ({ repositorio,setRepositorio,setIsClose }) => {

  const [colorLanguage, setColorLanguage] = useState("#E5E7EB");



  const language=repositorio?.language || null
  const title=repositorio?.name
  const description=repositorio?.description
  const time=repositorio?.pushed_at



  async function getColorForLanguage(language) {
    const res = await fetch(
      "https://raw.githubusercontent.com/ozh/github-colors/master/colors.json"
    );
    const colors = await res.json();
    return colors[language]?.color || "#000000";
  }

  function formatarTempoRelativo(dataISO) {
    const agora = new Date();
    const data = new Date(dataISO);
    const diffMs = agora - data;
    const diffMin = Math.floor(diffMs / 1000 / 60);
    const diffHora = Math.floor(diffMin / 60);
    const diffDia = Math.floor(diffHora / 24);
    const diffMes = Math.floor(diffDia / 30);
    const diffAno = Math.floor(diffDia / 365);
  
    if (diffAno > 0) return `há ${diffAno} ano${diffAno > 1 ? "s" : ""}`;
    if (diffMes > 0) return `há ${diffMes} mês${diffMes > 1 ? "es" : ""}`;
    if (diffDia > 0) return `há ${diffDia} dia${diffDia > 1 ? "s" : ""}`;
    if (diffHora > 0) return `há ${diffHora} hora${diffHora > 1 ? "s" : ""}`;
    if (diffMin > 0) return `há ${diffMin} minuto${diffMin > 1 ? "s" : ""}`;
    return "agora mesmo";
  }
  

  useEffect(() => {
    async function fetchColor() {
      const color = await getColorForLanguage(language);
      setColorLanguage(color);
    }
    if (language) {
      fetchColor();
    }
  }, [language]);

  return (
    <div onClick={()=>{
      setIsClose(false)
      setRepositorio(repositorio)
      }} className="w-full lg:w-[331px] max-h-44 rounded-lg hover:shadow-lg transition-all duration-300 bg-white border border-neutral-200">
      <div className="flex px-6">
        <div className=" pt-4">
          <h3 className="text-lg h-8 overflow-hidden">{title}</h3>
          <p className={`text-neutral-600 line-clamp-2 w-72   h-10  ${description?'':'italic text-base'} mt-2 text-sm`}>
            {description || "no-description"}
          </p>
        </div>
      </div>
      <div className="flex w-full justify-between px-6 gap-6 my-4">
        {language ? (
          <p className="flex items-center gap-1">
            <span
              style={{ backgroundColor: colorLanguage }}
              className="w-2 h-2 mr-1 rounded-full inline-block"
            ></span>
            {language}
          </p>
        ):
        (
            <p className="flex items-center gap-1">
              <span
                style={{ backgroundColor: colorLanguage }}
                className="w-2 h-2 mr-1 rounded-full inline-block"
              ></span>
              no-language
            </p>
          )
        }
        <p className="bg-neutral-100 text-sm px-4 py-1 rounded-2xl">{formatarTempoRelativo(time)}</p>
      </div>

    </div>
  );
};

export default CardRepositorio;
