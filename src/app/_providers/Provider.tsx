import { ReactNode } from "react";

import { MockingProvider } from "./Mocking";
import { SessionProvider } from "./Session";
import { StoreProvider } from "./Store";

type ProviderProps = {
  children: ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
  return (
    <StoreProvider>
      <SessionProvider>
        <MockingProvider>{children}</MockingProvider>
      </SessionProvider>
    </StoreProvider>
  );
};

export default Provider;
