"use client";
import Card from "@mui/joy/Card";
import CardActions from "@mui/joy/CardActions";
import CardContent from "@mui/joy/CardContent";
import Divider from "@mui/joy/Divider";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import { Person } from "@mui/icons-material";
import { ThemeProvider } from "@mui/joy";
import theme from "../../theme";
import { signInWithEmailAndPassword } from "firebase/auth";
import ErrorBox from "./ErrorBox";
import { db } from "../../utils/firebase";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { auth } from "../../utils/firebase";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import {doc, getDoc} from "firebase/firestore";

export default function CardUI() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorDialog, setErrorDialog] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleInputChange = (event) => {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorDialog(false);
    try {
      await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      if (auth.currentUser !== null) {
        const adminValidation = await isAdmin(auth.currentUser);
  
        if (adminValidation === true) {
          await signIn("credentials", {
            email: loginData.email,
            password: loginData.password,
            redirect: true,
            callbackUrl: "/admin/users",
          });
        } else {
          await signOut(auth); // Haciendo signOut del usuario no administrador
          setErrorDialog(true);
        }
      } else {
        setError("No se pudo iniciar sesión. Por favor, inténtelo de nuevo.");
        setErrorDialog(true);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
      setErrorDialog(true);
    }
    setLoading(false);
  };

  const isAdmin = async (user) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? docSnap.data().rol === "admin" : false;
  };

  useEffect(() => {
    const disabled =
      loginData.email === "" || loginData.password === "" || loading;
    setIsButtonDisabled(disabled);
  }, [loading, loginData]);

  return (
    <ThemeProvider theme={theme}>
      <Card
        variant="outlined"
        sx={{
          mx: "auto",
          minWidth: 500,
          // to make the demo resizable
          overflow: "auto",
          padding: 4,
          fontFamily: "inherit",
        }}
      >
        <Typography level="title-lg" startDecorator={<Person />} sx={{fontFamily: "inherit !important"}}>
          Iniciar sesión en tu cuenta
        </Typography>
        <Divider inset="none" />
        <CardContent
          sx={{
            gap: 3,
          }}
        >
          <form className="w-full h-full" onSubmit={handleSubmit}>
            <FormControl sx={{ gridColumn: "1/-1" }}>
              <FormLabel sx={{fontFamily: "inherit !important"}}>Email</FormLabel>
              <Input
                type="email"
                required
                name="email"
                onChange={handleInputChange}
                value={loginData.email}
                sx={{
                  '--Input-focusedHighlight': 'rgba(255,235,0, 1)',

                }}
              />
            </FormControl>
            <FormControl sx={{ gridColumn: "1/-1", marginTop: "1rem" }}>
              <FormLabel sx={{fontFamily: "inherit !important"}}>Contraseña</FormLabel>
              <Input
                type="password"
                required
                name="password"
                onChange={handleInputChange}
                value={loginData.password}
                sx={{
                  '--Input-focusedHighlight': 'rgba(255,235,0, 1)',
                  
                }}
              />
            </FormControl>
            {errorDialog && (
              <ErrorBox
                setErrorDialog={setErrorDialog}
                errorDialog={errorDialog}
              />
            )}
            <CardActions sx={{ gridColumn: "1/-1" }}>
              <Button
                loading={loading}
                type="submit"
                variant="solid"
                sx={{
                  color: "black",
                  width: "100%",
                  backgroundColor: "#FFE100 !important",
                  transition: "all .3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#FFE1009b !important",
                  },
                  "&.Mui-disabled": {
                    backgroundColor: "#FFE1009b !important",
                    color: "#0000008a !important",
                  }
                }}
                disabled={isButtonDisabled}
              >
                Iniciar sesión
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}
