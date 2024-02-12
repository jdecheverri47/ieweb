'use client'
import Sidebar from "../ui/Sidebar";
import { createContext } from "react";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/app/utils/firebase";

export const UserContext = createContext();

function MainProvider({ children }) {
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    const user = getAuth().currentUser;

    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    }
  };

  useEffect(() => {
    getUserData();

    const retrySession = setTimeout(getUserData, 800);

    return () => clearTimeout(retrySession);
  }, [setUserData]);

  return (
    <>
      <UserContext.Provider value={userData}>
        <Sidebar />
        {children}
      </UserContext.Provider>
    </>
  );
}

export default MainProvider;
