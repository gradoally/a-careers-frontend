"use client"
import {alpha, styled} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


export const StyledInputMultiline = styled(InputBase)(({theme}) => ({
    height: "100%",
    padding: "0 0 4px",
    '& .MuiInputBase-input': {
        height: "100%",
        overflowY: "scroll",
        resize: "none",
        caretColor: "#fff",
        border: 'none',
        fontWeight: "400",
        fontSize: "12px",
        padding: '10px 20px 0 ',
        lineHeight: "25px",
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
    "& .MuiInputBase-inputMultiline": {caretColor: "common.white",  resize: "none"}
}));
