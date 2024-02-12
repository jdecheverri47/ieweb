"use client";

import Dropdown from "@mui/joy/Dropdown";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuButton from "@mui/joy/MenuButton";
import MenuItem from "@mui/joy/MenuItem";
import MoreVert from "@mui/icons-material/MoreVert";
import { signOut } from "next-auth/react";
import { signOut as signOutFirebase } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { useState } from "react";
import LoadingPage from "./LoadingPage";

export default function IconButtonMenu() {
  const [loading, setLoading] = useState(false);

  const signOutAll = () => {
    setLoading(true);
    const auth = getAuth();
    signOutFirebase(auth)
      .then(() => {
        console.log("signOutFirebase Success");
      })
      .catch((error) => {
        console.log("signOutFirebase Error", error);
      });
    signOut({ callbackUrl: "/login" });
  };

  if (loading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <>
      <Dropdown>
        <MenuButton
          slots={{ root: IconButton }}
          slotProps={{ root: { variant: "outlined", color: "neutral" } }}
        >
          <MoreVert />
        </MenuButton>
        <Menu>
          <MenuItem>Profile</MenuItem>
          <MenuItem>My account</MenuItem>
          <MenuItem onClick={signOutAll}>Logout</MenuItem>
        </Menu>
      </Dropdown>
    </>
  );
}
