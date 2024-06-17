import { ReactNode, Suspense } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { Metrika } from "./Metrica/ui";
import { MockingProvider } from "./Mocking";
import { SessionProvider } from "./Session";
import { StoreProvider } from "./Store";

type ProviderProps = {
  children: ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  return (
    <>
      <Suspense fallback={<></>}>
        <Metrika />
      </Suspense>
      <StoreProvider>
        <SessionProvider>
          <MockingProvider>
            {children}
            <ToastContainer />
          </MockingProvider>
        </SessionProvider>
      </StoreProvider>
    </>
  );
};

export default Provider;
