"use client"
import {alpha, styled} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


export const StyledInput = styled(InputBase)(({theme}) => ({
    height: "100%",
    padding: 0,
    '& .MuiInputBase-input': {

        backgroundColor: "rgba(43, 43, 60, 0.2)",
        caretColor: "#fff",
        border: 'none',
        fontWeight: "400",
        fontSize: "12px",
        padding: '20px',
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
    // "& .MuiInputBase-inputMultiline": {"height": "100%"}
}));
