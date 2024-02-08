"use client"
import {alpha, styled} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


export const StyledInput = styled(InputBase)(({theme}) => ({
    width: "129px",
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        height: "15px",
        backgroundColor: theme.palette.info.main,
        borderRadius: "5px",
        border: 'none',
        "color": theme.palette.common.black,
        fontWeight: "400",
        fontSize: "10px",
        width: 'auto',
        padding: '6px 10px 9px 10px',
        lineHeight: "15px",
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
        "&::placeholder": {"color": theme.palette.common.black, opacity: "100%"}
    },
}));
 