'use client'
import TableSection from "@/app/components/TableSection";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function AdminTable() {

  const session = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/login");
    }
  })
  
  return (
    <main className="flex flex-col items-center justify-center w-full h-screen pl-[16rem]">
      <TableSection />
    </main>
  );
}

export default AdminTable;
