'use client'

import InputBox from "../components/ui/InputBox";
import { useForm, FormProvider } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import inputs from "../utils/clientInputsData"
import { collection, addDoc } from "firebase/firestore";
import {  db  } from "../utils/firebase";

export default function FormPage() {
  const methods = useForm();
  const router = useRouter();
  const params = useSearchParams();
  const searchUser = params.get('user');
  
  const onSubmit = async (data) => {
    try {
      const docRef = await addDoc(collection(db, "clients"), {
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        company: data.company,
      });
      router.push(`/contact?user=${searchUser}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    methods.reset();
  };

  const searchParams = useSearchParams();
  const search = searchParams.get('user');

  return (
    <section className="h-screen w-screen">
      <div className="px-10 pb-5 pt-10 bg-[#FFE100]">
        <p className="text-xl font-extralight">
          Haz parte de la familia ie
        </p>
        <p className="text-black text-2xl font-medium">
          Ingresa tus datos
        </p>
      </div>
     <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col items-center pt-5 pb-10 bg-white">
          {inputs.map((input, index) => (
            <InputBox key={index} htmlFor={input.field} label={input.label} type={input.type} indicator={input.indicator} field={input.field} />
          ))}

          <div className="mx-10 mt-3">
            <p className="text-justify text-[#8B8B8B] text-sm">
            Al registrarte estás aceptando nuestros <a href="#" className="text-[#FFE300]">términos y condiciones</a> y nuestra,<a href="#" className="text-[#FFE300]"> política de privacidad</a> de datos personales.
            </p>
          </div>
          <button className="bg-[#FFE100] text-black font-medium py-2 px-[24vw] my-5 rounded-lg" >
            Enviar y continuar
          </button>
        </form>
      </FormProvider>
    </section>
  )
}