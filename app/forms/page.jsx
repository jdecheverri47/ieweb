"use client";

import InputBox from "../components/ui/InputBox";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useSearchParams, useRouter } from "next/navigation";
import inputs from "../utils/clientInputsData";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../utils/firebase";

export default function FormPage() {
  const methods = useForm();
  const router = useRouter();
  const params = useSearchParams();
  const searchUser = params.get("user");
  const [formFilled, setFormFilled] = useState(false);

  const onSubmit = async (data) => {
    setFormFilled(false);
    try {
      const docRef = await addDoc(collection(db, "clients"), {
        name: data.name,
        email: data.email,
        phone: data.phone,
        city: data.city,
        company: data.company,
        cargo: data.position,
      });
      router.push(`/contact?user=${searchUser}`);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    methods.reset();
  };

  const skip = () => {
    router.push(`/contact?user=${searchUser}`);
  };

  const watchAllFields = methods.watch();

  useEffect(() => {
    const requiredFields = ["name", "email", "phone", "city", "company"];
    const isFormFilled = requiredFields.every(field => !!watchAllFields[field]);
    setFormFilled(isFormFilled);
  }, [watchAllFields]);

  const searchParams = useSearchParams();
  const search = searchParams.get("user");

  return (
    <section className="h-screen w-screen">
      <div className="px-10 pb-5 pt-10 bg-[#FFE100] lg:px-[37vw]">
        <p className="text-xl font-extralight">Haz parte de la familia ie</p>
        <p className="text-black text-2xl font-medium">Ingresa tus datos</p>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="flex flex-col items-center pt-5 pb-10 bg-white"
        >
          {inputs.map((input, index) => (
            <div key={index} >
              <InputBox
                key={index}
                htmlFor={input.field}
                label={input.label}
                type={input.type}
                indicator={input.indicator}
                field={input.field}
                rules={input.rules}
              />
              <p className="text-red-500 text-sm">
                {methods.formState.errors[input.indicator]?.message}
              </p>
            </div>
          ))}

          <div className="mx-10 mt-3 max-w-[500px]">
            <p className="text-justify text-[#8B8B8B] text-sm">
              Al registrarte estás aceptando nuestros{" "}
              <a href="#" className="text-[#FFE300]">
                términos y condiciones
              </a>{" "}
              y nuestra,
              <a
                href="/consentimiento-datos-personales"
                className="text-[#FFE300]"
              >
                {" "}
                política de privacidad
              </a>{" "}
              de datos personales.
            </p>
          </div>
          <button className="bg-[#FFE100] text-black font-medium py-2 w-[350px] my-5 rounded-lg lg:w-[500px] disabled:bg-[#fff28d] disabled:text-gray-400 " disabled={!formFilled} >
            Enviar y continuar
          </button>

          <a onClick={skip}>
            <span className="underline text-gray-400 active:text-black hover:cursor-pointer">
              Omitir
            </span>
          </a>
        </form>
      </FormProvider>
    </section>
  );
}
