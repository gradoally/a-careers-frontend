"use client"
import React from "react";
import {useLocale} from "next-intl";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import ruLocale from "date-fns/locale/ru";
import enLocale from "date-fns/locale/en-US";

import {MobileDateTimePicker} from '@mui/x-date-pickers/MobileDateTimePicker';
import ClearIcon from '@mui/icons-material/Clear';

const localeMap = {
    en: enLocale,
    ru: ruLocale,
};

interface Props {
    label: string;
    value?: string;
    fullWidth: boolean;
    name: string;
    id: string;
    variant: "standard" | "filled"
}

const DateTimePicker = (
    {
        label, value, variant
    }:
        Props) => {
    const locale = useLocale();
    const [open, setOpen] = React.useState<boolean>(false)
    return (
        <LocalizationProvider
            adapterLocale={localeMap[locale as keyof typeof localeMap]}
            dateAdapter={AdapterDateFns}>
            <MobileDateTimePicker
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                label={label}
                value={value}

                slotProps={{
                    layout: {
                        sx: {
                            backgroundColor: "info.main"
                        },
                    },
                }}
                // minDate={minDate}
                // maxDate={maxDate}
                // onChange={() => (newValue) => {
                //     setValue(newValue);
                // }}
                // renderInput={(params: any) => (
                //     <TextField {...params}
                //                InputProps={{
                //                    endAdornment: (
                //                        <IconButton><ClearIcon/></IconButton>
                //                    )
                //                }}
                //                onClick={(e) => setOpen(true)}/>)
                // }
            />
        </LocalizationProvider>
    );
};


export default DateTimePicker;