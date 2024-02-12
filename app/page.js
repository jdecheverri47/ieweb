import Image from "next/image";
import qrImage from "public/images/qr.png";
import appStore from "public/images/download-appstore.png";
import playStore from "public/images/download-playstore.png";
import tarjetaDigital from "/public/images/tutarjetadigital.png";
import nodoCentralizado from "public/images/nodo-centralizado.png";
import flechaGrafica from "public/images/flecha-grafica.png";
import Header from "./components/ui/Header";

export default function Home() {
  return (
    <main className="h-fit">
      <Header />
      <section className="flex-col md:flex-col flex items-start bg-[#ffe100] w-full h-[65vh] relative pt-10">
        <div className="px-[18rem] flex flex-col justify-start items-start relative pt-[6rem]">
          <div>
            <h1 className="font-bold text-7xl text-black">Mi tarjeta digital</h1>
          </div>
          <div className="max-w-3xl mt-5 text-black text-xl">
            <p>
              Bienvenido a la <strong>revolución</strong> del networking
              empresarial. Nuestra aplicación simplifica y potencia la manera en
              que los vendedores de tu empresa se conectan con{" "}
              <strong>potenciales clientes</strong>. Registra fácilmente a tu
              equipo de ventas, <strong>crea tarjetas digitales {" "}</strong>
              personalizadas y <strong>genera códigos QR</strong> exclusivos
              para cada vendedor.
            </p>
          </div>
          <div className="flex justify-center items-center mt-10">
            <Image src={appStore} alt="" className="w-[13rem]" />
            <Image src={playStore} alt="" className="w-[14rem] ml-5" />
          </div>
        </div>
        <Image
          src={tarjetaDigital}
          alt=""
          className="absolute w-[20rem] translate-x-1/2 right-[30%] top-[18%]"
          priority
        />
      </section>

      <section className="pt-[10rem] pb-12">
        <div className="w-full flex justify-between items-center px-[14rem]">
          <div className="w-[22rem] h-[16rem] bg-[#1D1D1D] rounded-2xl flex items-center justify-start flex-col">
            <Image src={qrImage} alt="" className="w-[7rem] mt-5" />
            <div>
              <h1 className="font-bold text-3xl text-center mt-4 text-white ">
                QR <br /> Personalizado
              </h1>
            </div>
          </div>
          <div className="w-[22rem] h-[15rem]  rounded-2xl bg-[#1D1D1D] flex items-center justify-start flex-col">
            <Image src={nodoCentralizado} alt="" className="w-[7rem] mt-5" />
            <div>
              <h1 className="font-bold text-3xl text-center mt-4 text-white">
                Datos <br /> Centralizados
              </h1>
            </div>
          </div>
          <div className="w-[22rem] h-[15rem] rounded-2xl bg-[#1D1D1D] flex items-center justify-start flex-col">
            <Image src={flechaGrafica} alt="" className="w-[7rem] mt-5" />
            <div>
              <h1 className="font-bold text-3xl text-center mt-4 text-white">
                Análisis de <br /> Datos
              </h1>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
