"use client";

import { PlusIcon } from "@heroicons/react/24/solid";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import EditModal from "./EditModal";

function MyTable({ data, search }) {
  const tHeaders = [
    {
      name: "NOMBRE",
      key: "name",
    },
    {
      name: "EMAIL",
      key: "email",
    },
    {
      name: "CELULAR",
      key: "phone",
    },
    {
      name: "DEPARTAMENTO",
      key: "department",
    },
    {
      name: "ESTADO",
      key: "estado",
    },
  ];

  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedRow, setSelectedRow] = useState({});

  const handleEditClick = (index) => {
    setSelectedRow(data[index]);
    setOpenUpdate(true);
  };

  return (
    <div className="flex justify-center mt-5 w-full px-[2rem]">
      <div className="overflow-auto rounded-lg border-[1px] border-[#ffe100] shadow w-full">
        <table className="min-w-full">
          <thead className="border-b-[1px] bg-yellow-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <PlusIcon className="w-6 h-6" />
              </th>
              {tHeaders.map((header, index) => (
                header.name === "ESTADO" ? (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.name}
                  </th>
                ) : (
                  <th
                    key={index}
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {header.name}
                  </th>
                )
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">
                  <PencilSquareIcon
                    className="w-6 h-6 text-gray-500 hover:text-black cursor-pointer"
                    onClick={() => handleEditClick(index)}
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.department}
                </td>
                <td className="px-2 py-3 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center justify-center">
                  {item.status === true ? (
                    <span className="text-green-500 bg-green-200 px-4 py-1 rounded-full">
                      Activo
                    </span>
                  ) : (
                    <span className="text-red-500 bg-red-200 px-4 py-1 rounded-full">
                      Inactivo
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <EditModal
          openUpdate={openUpdate}
          setOpenUpdate={setOpenUpdate}
          selectedRow={selectedRow}
        />
      </div>
    </div>
  );
}

export default MyTable;
