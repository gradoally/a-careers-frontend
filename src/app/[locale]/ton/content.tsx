"use client"
import {TonConnectButton} from "@tonconnect/ui-react";
import {Counter} from "@/components/ton/Counter";
import {Jetton} from "@/components/ton/Jetton";
import {TransferTon} from "@/components/ton/TransferTon";
import {Button, FlexBoxCol, FlexBoxRow} from "@/components/ton/styled/styled";
import {useTonConnect} from "@/components/ton/hooks/useTonConnect";
import {CHAIN} from "@tonconnect/protocol";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {TonConnectUIProvider} from "@tonconnect/ui-react";
import {StyledApp} from "./styled";



function App() {
    const {network} = useTonConnect();

    return (
        <StyledApp>
            <div className="p-12">
                <FlexBoxCol>
                    <FlexBoxRow>
                        <TonConnectButton/>
                        <Button>
                            {network
                                ? network === CHAIN.MAINNET
                                    ? "mainnet"
                                    : "testnet"
                                : "N/A"}
                        </Button>
                    </FlexBoxRow>
                    <Counter/>
                    <TransferTon/>
                    <Jetton/>
                </FlexBoxCol>
            </div>
        </StyledApp>
    );
}

// this manifest is used temporarily for development purposes
const manifestUrl =
    "https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json";


const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
});
const Content = () => {
    return (
        <TonConnectUIProvider manifestUrl={manifestUrl}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </TonConnectUIProvider>
    )
}

export default Content;