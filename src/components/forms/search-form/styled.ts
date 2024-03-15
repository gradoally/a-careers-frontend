"use client"
import {alpha, styled} from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';


export const StyledInput = styled(InputBase)(({theme}) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        height: "14px",
        backgroundColor: theme.palette.info.main,
        borderRadius: "5px",
        border: 'none',
        "color": theme.palette.common.black,
        fontWeight: "400",
        fontSize: "10px",
        width: '100%',
        padding: '8px 10px 8px 10px',
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
 