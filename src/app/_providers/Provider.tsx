import { ReactNode, Suspense } from "react";

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
          <MockingProvider>{children}</MockingProvider>
        </SessionProvider>
      </StoreProvider>
    </>
  );
};

export default Provider;
