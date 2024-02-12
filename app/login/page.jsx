import LoginSection from "../components/LoginSection";
import IEGrupoLogo from "@/public/images/2012.png";
import Image from "next/image";

function page() {
  return (
    <main className="flex items-center justify-center w-full h-screen">
      <div className="w-1/2 h-screen bg-[#ffe100] flex items-center justify-center">
        <Image src={IEGrupoLogo} alt="" className="w-[50%]" />
      </div>
      <div className="w-1/2 h-screen flex justify-center items-center">
        <LoginSection />
      </div>
    </main>
  );
}

export default page;
