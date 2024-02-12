import { CircularProgress } from "@mui/joy";

function LoadingPage() {
  return (
    <div className="fixed z-50 w-screen h-screen bg-black translate-x-50 translate-y-50 top-0 left-0  bg-opacity-50">
      <div className="w-full h-full flex items-center justify-center">
        <CircularProgress />
      </div>
    </div>
  );
}

export default LoadingPage;
