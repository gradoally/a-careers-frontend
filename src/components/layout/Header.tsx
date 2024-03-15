import React from "react";
import { Stack, Box } from '@mui/material';

import AppBar from "@/components/layout/app-bar";
import ConnectButton from "@/components/ui/buttons/ConnectButton";
import MenuButton from "@/components/ui/buttons/MenuButton";
import SearchForm from "@/components/forms/search-form";

export default function Header({ messages }: { messages: { connect: string, find: string } }) {
    return (
        <AppBar>
            <Stack sx={{ paddingRight: "5px",flex:1,marginRight:"15px" }} direction="row" alignItems="center" spacing={"15px"} >
                <MenuButton />
                <SearchForm text={messages.find} />
            </Stack>
            <Stack>
                <ConnectButton text={messages.connect} />
            </Stack>
        </AppBar>
    );
}
