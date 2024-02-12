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
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import ErrorBox from "./ErrorBox";
import { db } from "../../utils/firebase";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { auth } from "../../utils/firebase";
import { useEffect, useState } from "react";

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
    event.preventDefault(event);
    setLoading(true);
    setErrorDialog(false);
    try {
      await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      await signIn("credentials", {
        email: loginData.email,
        password: loginData.password,
        redirect: true,
        callbackUrl: "/admin/users",
      });
    } catch (error) {
      console.log(error);
      setError(error.message);
      setErrorDialog(true);
    }
    setLoading(false);
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
        <Typography level="title-lg" startDecorator={<Person />}>
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
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                required
                name="email"
                onChange={handleInputChange}
                value={loginData.email}
              />
            </FormControl>
            <FormControl sx={{ gridColumn: "1/-1", marginTop: "1rem" }}>
              <FormLabel>Contraseña</FormLabel>
              <Input
                type="password"
                required
                name="password"
                onChange={handleInputChange}
                value={loginData.password}
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
