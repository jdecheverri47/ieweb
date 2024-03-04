import "./globals.css";
import { Poppins } from "next/font/google";
import { Providers } from "./redux/Providers"
import { store } from "./redux/store";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata = {
  title: "TuTarjetaDigital || IE Grupo",
  description: "TuTarjetaDigital es una plataforma de tarjetas digitales para empresas y personas",
};

export default function RootLayout({ children }) {
  return (
      <html lang="en" >
      <body className={poppins.className}>
          <Providers store={store}> 
            {children}
          </Providers>
      </body>
    </html>
  );
}
