import { Stack, Box } from '@mui/material';

import ConnectButton from "@/components/ui/buttons/ConnectButton";
import MenuButton from "@/components/ui/buttons/MenuButton";
import SearchForm from "@/components/forms/search-form";
import AppBar from "./app-bar";

const Header = ({messages}: {messages: {connect: string, find: string}}) => {
    return (
        <AppBar>
            <Stack direction="row" alignItems="center" spacing={"15px"} >
                <MenuButton/>
                <SearchForm text={messages.find}/>
                <ConnectButton text={messages.connect}/>
            </Stack>
        </AppBar>
    )
}

export default Header;