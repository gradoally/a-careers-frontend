"use client"

import { styled } from '@mui/material/styles'
import { AppBar, Paper, Toolbar } from '@mui/material' 

export const StyledAppBar = styled(AppBar)`
    //z-index: ${({theme}) => theme.zIndex.drawer + 1};
    box-shadow: none;
    position: relative;
`

export const StyledPaper = styled(Paper)`
    border-bottom: ${({theme}) => '1px solid ' + theme.palette.divider};
    box-shadow: none;
    border-radius: 0;
    background-image: none;
    width: 100%;
    overflow-x: scroll;
    overflow-y: hidden;
`


export const StyledToolbar = styled(Toolbar)`
    height: 70px; 
    padding: 15px;
    max-width: 768px;
    min-width: 300px;
    margin: 0 auto;
`
