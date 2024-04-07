import {ReactNode} from "react";

import {SessionProvider} from "./Session";
import {MockingProvider} from './Mocking';

type ProviderProps = {
    children: ReactNode;
};

const Provider = ({ children }: ProviderProps) => {
    return (
        <SessionProvider>
            <MockingProvider>
                {children}
            </MockingProvider>
        </SessionProvider>
    );
};

export default Provider;
