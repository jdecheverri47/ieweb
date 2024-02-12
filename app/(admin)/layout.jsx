import MainProvider from "../components/Layout/MainProvider";
import SuccessAlert from "../components/ui/SuccessAlert";
import SessionProvider from "../utils/SessionProvider";

function layout({ children }) {
  
  return (
    <>
      <SessionProvider>
        <MainProvider>
          {children}
          <SuccessAlert />
        </MainProvider>
      </SessionProvider>
    </>
  );
}

export default layout;
