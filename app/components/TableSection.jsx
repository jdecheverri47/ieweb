"use client";
import { CircularProgress } from "@mui/joy";
import ButtonPanel from "./ui/ButtonPanel";
import MyTable from "./ui/MyTable";
import { useState, useEffect, useRef } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../utils/firebase";
import "/public/styles/circularProgress.css";

function TableSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [showCircularProgress, setShowCircularProgress] = useState(false);

  const rowsPerPage = 10;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const userCollectionRef = collection(db, "users");

  useEffect(() => {
    const obtenerDatos = async () => {
      setShowCircularProgress(true);

      try {
        const unsubscribe = onSnapshot(userCollectionRef, (querySnapshot) => {
          const newData = [];
          querySnapshot.forEach((doc) => {
            const userData = { userId: doc.id, ...doc.data() };
            newData.push(userData);
          });
          setData(newData);
          setOriginalData(newData);
          setShowCircularProgress(false);
        });

        // Devuelve una función de limpieza para detener la escucha cuando el componente se desmonta
        return () => unsubscribe();
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <section className="w-full h-full">
      <div className="mt-5 pl-[2rem]">
        <h1 className="font-medium text-2xl">Usuarios</h1>
      </div>
      <ButtonPanel
        nextPage={nextPage}
        prevPage={prevPage}
        currentPage={currentPage}
        indexOfLastRow={indexOfLastRow}
        data={data}
        originalData={originalData}
        setData={setData}
        search={search}
        setSearch={setSearch}
        handleInputChange={handleInputChange}
      />
      {showCircularProgress === true ? (
        <div className={`flex justify-center items-center w-full h-[300px] `}>
          <CircularProgress variant="soft" />
        </div>
      ) : data.length > 0 ? (
        <>
          <MyTable data={data.slice(indexOfFirstRow, indexOfLastRow)} />
          <div className="mt-4 w-full flex items-center justify-center pt-[1rem]">
            <p className="text-gray-600 text-sm text-center">
              Página <strong className="text-black">{currentPage}</strong> de{" "}
              <strong className="text-black">10</strong>
            </p>
          </div>
        </>
      ) : data.length === 0 ? (
        <div className="flex justify-center items-center w-full h-[300px]">
          <p className="text-gray-600 text-lg text-center">
            No se encontraron resultados
          </p>
        </div>
      ) : null}
    </section>
  );
}

export default TableSection;
