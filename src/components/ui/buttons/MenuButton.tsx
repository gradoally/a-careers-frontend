"use client"

import { IconButton } from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

import { useAppContext } from "@/lib/app-providers";

const MenuButton = () => {
    const { toggleDrawer } = useAppContext()
    return (
        <IconButton
            onClick={() => toggleDrawer(true)} aria-label="menu"
            className="h-[30px] w-[30px] p-0"
            color="primary"
            sx={{
                backgroundColor: "info.main",
                borderRadius: "8px",
                "& .MuiTouchRipple-root .MuiTouchRipple-child": {
                    borderRadius: "8px"
                },
                "&:hover": { backgroundColor: "info.main" },
                "&:focus": { backgroundColor: "info.main" }
            }}>
            <MenuRoundedIcon />
        </IconButton>
    )
}

export default MenuButton;
