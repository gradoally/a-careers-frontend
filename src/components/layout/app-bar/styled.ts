"use client"

import { styled } from '@mui/material/styles'
import { AppBar, Paper, Toolbar } from '@mui/material' 

export const StyledAppBar = styled(AppBar)`
  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
  box-shadow: none;
`

export const StyledPaper = styled(Paper)`
  border-bottom: ${({ theme }) => '1px solid ' + theme.palette.divider};
  box-shadow: none;
  border-radius: 0;
  background-image: none;
`

export const StyledToolbar = styled(Toolbar)`
    height: 60px;
    border: none;
    padding: 15px;
`
