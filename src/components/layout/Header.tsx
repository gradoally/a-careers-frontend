import { Stack, Box } from '@mui/material';

import ConnectButton from "@/components/ui/buttons/ConnectButton";
import MenuButton from "@/components/ui/buttons/MenuButton";
import SearchForm from "@/components/forms/search-form";
import AppBar from "./app-bar";
import React from "react";

const Header = ({messages}: {messages: {connect: string, find: string}}) => {
    return (
        <AppBar>
            <Stack sx={{paddingRight: "5px"}} direction="row" alignItems="center" spacing={"15px"} >
                <MenuButton/>
                <SearchForm text={messages.find}/>
            </Stack>
            <Box component="div" sx={{flexGrow: 1}}/>
            <Stack><ConnectButton text={messages.connect}/></Stack>

        </AppBar>
    )
}

export default Header;
