import React, { useState } from "react";

import TransactionProgress from "@/components/MessageScreen/TransactionProgress";
import FailScreen from "@/components/MessageScreen/FailScreen";

type ToggleFunc = (active: boolean) => void;

interface IScreenContext {
    toggleTxProgress: ToggleFunc;
    toggleFailScreen: ToggleFunc;
}

const ScreenContext = React.createContext<IScreenContext>({
    toggleTxProgress: (active: boolean) => undefined,
    toggleFailScreen: (active: boolean) => undefined
})

export const useScreen = (): IScreenContext => {
    const context = React.useContext(ScreenContext)
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a AuthProvider')
    }
    return context
}

export default function ScreenProvider(props: React.PropsWithChildren) {
    const [toggleTx, setToggleTx] = useState<boolean>(false);
    const [toggleFail, setToggleFail] = useState<boolean>(false);

    const contextValue = {
        toggleTxProgress: (active: boolean) => setToggleTx(active),
        toggleFailScreen: (active: boolean) => setToggleFail(active)
    }

    return (
        <ScreenContext.Provider value={contextValue}>
            {props.children}
            {toggleTx && <TransactionProgress />}
            {toggleFail && <FailScreen />}
        </ScreenContext.Provider>
    );
};

