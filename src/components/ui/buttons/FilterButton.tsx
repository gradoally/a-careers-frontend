"use client"

import {PropsWithChildren} from "react";

import Button from '@mui/material/Button';
import FilterListIcon from '@mui/icons-material/FilterList';
import {useAppContext} from "@/lib/app-providers";
const FilterButton = (props: PropsWithChildren)=>{
    const {isFilterOpen, toggleFilter} = useAppContext()

    return (
        <Button
            onClick={()=>toggleFilter(true)}
            sx={{
            height: "40px",
            borderRadius: "25px",
            padding: "3px 20px",
            color: "common.black",
            fontWeight: "600",
            fontSize: "16px",
        }}  color="secondary" variant="contained" endIcon={<FilterListIcon />}>
            {props.children}
        </Button>
    )
}

export default FilterButton;
