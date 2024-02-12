import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import {auth} from "../utils/firebase";

function AuthRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const checkSignStatus = async () => {
      try {
        setLoading(true);
        const user = auth.currentUser;

        if (user) {
          const userDocRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists() && userDoc.data().rol === "admin") {
            setUser(user);
          } else {
            router.push("/login");
          }
        } else {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    checkSignStatus();
  }, []); // Run only once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    // Redirige solo si el usuario no está autenticado o no es un administrador
    router.push("/login");
    return null;
  }

  return children;
}

export default AuthRoute;