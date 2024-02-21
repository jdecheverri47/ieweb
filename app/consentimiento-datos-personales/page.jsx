import Image from "next/image";
import React from "react";
import logoIE from "/public/images/logo-ie-header.png";

function page() {
  return (
    <>
      <header className="w-full h-[4rem] bg-[#ffe100] pl-[2rem] flex items-center">
        <Image src={logoIE} alt="logo" className="w-[3.5rem] h-[3.5rem]" />
      </header>
      <section className="w-screen h-screen">
        <article className="w-full h-fit p-[20px] lg:p-[2rem] flex flex-col gap-5">
          <div className="w-full flex flex-col justify-center items-center">
            <h1 className="font-bold text-2xl">Aviso de privacidad</h1>
            <h2 className="font-medium text-xl text-center">
              Consentimiento para tratamiento de datos personales
            </h2>
          </div>
          <div className="flex flex-col gap-5 text-md lg:text-xl">
            <p>
              Al momento de darle mis datos por cualquier medio verbal o
              escrito, en cualquier formato, al recibir correo electrónico, al
              aceptar o declinar convocatorias, al enviar o recibir mercancías,
              en redes sociales, chats, foros y blogs, así como en cualquier
              evento o medio en el que me comunique con INTERNACIONAL DE
              ELECTRICOS SAS, manifiesto que estoy dando mi consentimiento de
              manera expresa libre, voluntaria e informada para que
              INTERNACIONAL DE ELECTRICOS SAS, dé tratamiento a mis datos
              personales, o a los de mi representado, incluso a los privados y/o
              sensibles, a los de los menores de edad bajo mi representación
              legal, los cuales pueden ser objeto de transmisión o transferencia
              nacional o internacional, de acuerdo con las finalidades amplias
              para las cuales lo estoy otorgando, esto es para empleo, mercadeo
              y ventas, publicidad, capacitación, contractual, normativa y
              legal, y en general para fines íntimamente ligados con el
              desarrollo del objeto social de INTERNACIONAL DE ELECTRICOS S.A.S.
            </p>
            <p>
              Autorizo a INTERNACIONAL DE ELECTRICOS S.A.S a transferir y
              transmitir los datos personales a otras personas en calidad de
              encargados y/o responsables, incluso si están domiciliadas fuera
              del país, incluyendo los Estados Unidos, China o cualquier país
              del mundo, eximiendo, exonerando y excluyendo de toda
              responsabilidad por el tratamiento de mis datos en esos países, a
              INTERNACIONAL DE ELECTRICOS S.A.S, reservándome los derechos a
              conocer, acceder, rectificar, oponerme y cancelar los datos
              personales.
            </p>

            <p>
              Las partes excluyen, exoneran y eximen a INTERNACIONAL DE
              ELECTRICOS S.A.S de cualquier responsabilidad por el tratamiento
              de datos personales, por su transferencia y/o transmisión nacional
              o internacional cuando ese tratamiento, transferencia y/o
              transmisión nacional o internacional sean necesarios para el
              cumplimiento de obligaciones legales, administrativas o
              contractuales, o cuando no tratarlos pueda impedir o dificultar
              las acciones que INTERNACIONAL DE ELECTRICOS S.A.S tenga o pueda o
              deba ejercer respecto de la otra parte.
            </p>
          </div>
        </article>
      </section>
    </>
  );
}

export default page;
