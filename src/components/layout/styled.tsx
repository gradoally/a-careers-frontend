"use client"

import {styled} from "@mui/material/styles";


export const StyledBox = styled("div")`
  height: 100%;
  width: 100%; 
  overflow-y: scroll;
  background-color: ${({theme}) => theme.palette.background.default};
  padding: 70px 20px 20px 20px;
`
