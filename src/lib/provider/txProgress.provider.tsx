import React, { useEffect, useState } from "react";

import TransactionProgress from "@/components/Progress/TransactionProgress";

interface ITxProgressContext {
    toggleTxProgress: (active: boolean) => void;
}

const TxProgressContext = React.createContext<ITxProgressContext>({
    toggleTxProgress: (active: boolean) => undefined
})

export const useTxProgress = (): ITxProgressContext => {
    const context = React.useContext(TxProgressContext)
    if (context === undefined) {
        throw new Error('useAuthContext must be used within a AuthProvider')
    }
    return context
}

export default function TransactionProgressProvider(props: React.PropsWithChildren) {
    const [toggle, setToggle] = useState<boolean>(false);

    const toggleTxProgress = (active: boolean) => {
        setToggle(active);
    }

    useEffect(() => {
        console.log(toggle);
    }, [toggle]);

    return (
        <TxProgressContext.Provider value={{ toggleTxProgress }}>
            {props.children}
            {toggle && <TransactionProgress />}
        </TxProgressContext.Provider>
    );
};

