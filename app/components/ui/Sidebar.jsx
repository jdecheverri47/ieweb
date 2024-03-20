"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "/public/images/logo-ie-header.png";
import profileImage from "public/images/blank-image.png";
import { usePathname } from "next/navigation";
import { UserGroupIcon } from "@heroicons/react/24/outline";
import { db } from "../../utils/firebase";
import { useEffect, useState } from "react";
import { Skeleton, Typography } from "@mui/joy";
import { useContext } from "react";
import { UserContext } from "../Layout/MainProvider";
import DropdownProfile from "./DropdownProfile";

function Sidebar() {
  const route = usePathname();
  const [loading, setLoading] = useState(true);

  const userData = useContext(UserContext);

  useEffect(() => {
    if (userData) {
      setLoading(false);
    }
  }, [userData]);

  const isActive = (href) => {
    if (route === href) {
      return "text-black bg-[#ffe100]";
    } else {
      return "text-gray-400";
    }
  };

  return (
    <div className="fixed flex flex-col items-center justify-start w-[16rem] h-full border-r-[1px]">
      <div className="w-full h-[6rem] flex items-center justify-around gap-4 px-2">
        <Image src={logo} alt="" className="w-[4rem]" priority />
      </div>
      <div className="flex items-start justify-start w-full pt-6 px-2">
        <ul className="flex flex-col items-start justify-center gap-3 w-full">
          <Link
            href="/admin/users"
            className={`w-full px-3 py-2 rounded-lg hover:bg-[#ffe100b9] transition-all ease-in-out duration-300 hover:text-gray-900 ${isActive(
              "/admin/users"
            )}`}
          >
            <div className="w-full flex justify-start items-center">
              <UserGroupIcon className="w-6 mb-1" />

              <li className="text-md font-medium pl-2">Usuarios</li>
            </div>
          </Link>
        </ul>
      </div>

      <div className="border-t-[1px] w-full h-[80px] mt-auto flex justify-start items-center">
        <div className="pl-5">
          {loading ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <Image
              src={userData?.imageUrl}
              alt=""
              width={120}
              height={120}
              className="w-[3rem] rounded-full"
              priority
              quality={100}
            />
          )}
        </div>{" "}
        <div>
          {loading ? (
            <Skeleton
              variant="text"
              width={120}
              sx={{ ml: "10px" }}
              className="text-xl"
            />
          ) : (
            <Typography
              className="text-black ml-2 text-lg"
              sx={{ fontFamily: "inherit !important" }}
            >
              {userData?.name}
            </Typography>
          )}
        </div>
        <div className="ml-2">
          <DropdownProfile />
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
