import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MuiDivider from '@mui/material/Divider';
import {unstable_setRequestLocale} from "next-intl/server";
import {useTranslations} from "next-intl";

import Radio from '@mui/material/Radio';
import Footer from "@/components/layout/Footer";
import Shell from "@/components/layout/Shell";
import AppBar from "@/components/layout/app-bar";
import {Stack} from "@mui/material";
import BackButton from "@/components/ui/buttons/BackButton";
import {locales} from "@/config";
import FooterButton from "@/components/ui/buttons/FooterButton";
import SecondaryActionButton from "@/components/ui/buttons/SecondaryActionButton";
import Divider from "@/components/ui/Divider";
type Props = {
    params: { locale: string };
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}
const Page = ({ params: { locale } }: Props)=>{
    unstable_setRequestLocale(locale);
    const tc = useTranslations("common");
    const t = useTranslations("tasks");
    const footer = (
        <Footer>
            <FooterButton color={"secondary"} sx={{color: "common.black"}} variant="contained" >{t("show", {count: "77"})}</FooterButton>
        </Footer>
    )
    const header = (
        <AppBar withAppbar={true}>
            <Stack direction="row" alignItems="center" spacing={1} >
                <BackButton/>
                <Typography variant="h5" sx={{color: "info.main"}}>{tc("filter")}</Typography>
            </Stack>
        </AppBar>
    )
    return (
        <Shell header={header} footer={footer}>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <nav aria-label="main mailbox folders">
                    <List>
                        <ListItem disablePadding secondaryAction={<SecondaryActionButton to={"/"}/>}>
                            <ListItemButton>
                                <ListItemIcon sx={{fontSize: "24px"}}>
                                    🧩
                                </ListItemIcon>
                                <ListItemText primary={
                                    <Typography variant="caption">Draft</Typography>
                                } secondary={
                                    <Typography  sx={{color: "common.white"}}  variant="body1">Drafts</Typography>
                                }/>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                        <ListItem disablePadding secondaryAction={<SecondaryActionButton to={"/"}/>}>
                            <ListItemButton>
                                <ListItemIcon sx={{fontSize: "24px"}}>
                                    🌎
                                </ListItemIcon>

                                <ListItemText primary={
                                    <Typography variant="caption">Draft</Typography>
                                } secondary={
                                    <Typography sx={{color: "common.white"}} variant="body1">Drafts</Typography>
                                }/>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                        <ListItem disablePadding>
                            <ListItemButton>
                                <ListItemIcon sx={{fontSize: "24px"}}>
                                    💎
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{variant: "body1", sx: {opacity: "33%"}}}
                                              primary="Drafts" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
                <MuiDivider />
                <nav aria-label="secondary mailbox folders">
                    <List>
                        <ListItem disablePadding secondaryAction={<Radio/>}>
                            <ListItemButton>
                                <ListItemText
                                    secondaryTypographyProps={{variant: "caption",  sx: {color: "common.white"}}}
                                    primaryTypographyProps={{sx:{marginBottom: "15px"}, variant: "h5"}}
                                    primary={"Sort"} secondary="By publication date" />
                            </ListItemButton>
                        </ListItem>
                        <Divider/>

                        <ListItem disablePadding secondaryAction={<Radio/>}>
                            <ListItemButton >
                                <ListItemText secondaryTypographyProps={{variant: "caption", sx: {color: "common.white"}}} secondary="By deadline" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </nav>
                <MuiDivider />
            </Box>
        </Shell>
    )
}

export default Page;