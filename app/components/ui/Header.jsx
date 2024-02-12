import Image from "next/image";
import logo from "/public/images/logo-ie-header.png";

function Header() {
  return (
    <header className="bg-black fixed top-0 w-1/2 h-[60px] z-40 translate-x-1/2 rounded-lg mt-4 bg-opacity-50 backdrop-blur-sm shadow-md">
      <div className="flex w-full h-full items-center justify-center">
        <Image src={logo} alt="" className="w-[3rem] mr-auto ml-5 rounded-lg" />
        <ul className="flex items-center gap-8">
          <li className="text-white text-lg font-medium">Dashboard</li>
          <li className="text-white text-lg font-medium">Usuarios</li>
          <li className="text-white text-lg font-medium">Tarjetas</li>
          <li className="text-white text-lg font-medium">Reportes</li>
        </ul>
        <a className="bg-[#ffe100] text-black px-4 py-2 rounded-lg font-medium ml-auto mr-5 hover:bg-[#fff07c] transition-all ease-in-out duration-300 hover:text-gray-800 relative cursor-pointer z-50" href="/login">
          Iniciar sesión
        </a>
      </div>
    </header>
  );
}

export default Header;
