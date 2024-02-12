"use client";

import { db } from "../../utils/firebase";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { auth } from "../../utils/firebase";
import LoadingPage from "@/app/components/ui/LoadingPage";

function Home({ children }) {
  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    },
  });

  const checkSession = () => {
    console.log(session.data.user.email);
  };

  if(!session.data) {
    return (
      <LoadingPage />
      
    )
  };

  return (
    <main className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-2xl font-medium text-gray-500">Admin page</h1>
      <button onClick={checkSession}>Cerrar sesión</button>
      {children}
    </main>
  );
}

Home.requireAuth = true;

export default Home;
