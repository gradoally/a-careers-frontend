import  React from 'react';
import { styled } from '@mui/material/styles';


export const BpIcon = styled('span')(({ theme }) => ({
    opacity: "33%",
    borderRadius: '50%',
    width: 15,
    height: 15,
    border: "0.5px solid #fff",
    '.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
    },
    'input:hover ~ &': {
        opacity: "100%",
    },
    'input:disabled ~ &': {
        boxShadow: 'none',
        background:
            theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
    },
}));

export const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#45AEF5',
    border: "0.5px solid #45AEF5",
    opacity: "100%",

    'input:hover ~ &': {
        backgroundColor: '#106ba3',
    },
});

