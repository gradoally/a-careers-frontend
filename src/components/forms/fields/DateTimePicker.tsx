"use client"

import React from "react";
import {useLocale} from "next-intl";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import ruLocale from "date-fns/locale/ru";
import enLocale from "date-fns/locale/en-US";

import {MobileDateTimePicker} from '@mui/x-date-pickers/MobileDateTimePicker';
import InputAdornment from "@mui/material/InputAdornment";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";

import FormControl from "@/components/forms/FormControl";
import Divider from "@/components/ui/Divider";
import Image from "@/components/Image";

const localeMap = {
    en: enLocale,
    ru: ruLocale,
};

interface Props {
    label?: string;
    value?: string | null;
    fullWidth: boolean;
    name: string;
    id: string;
    onChange: (e: any) => void
    placeholder?: string
    className?: string;
    formControlClassName?: string;
}

const DateTimePicker = (
    {
        label, value, onChange, placeholder, className, formControlClassName
    }:
        Props) => {
    const locale = useLocale();
    // const [open, setOpen] = React.useState<boolean>(false)
    return (
        <LocalizationProvider
            adapterLocale={localeMap[locale as keyof typeof localeMap]}
            dateAdapter={AdapterDateFns}>
            <FormControl className={formControlClassName}>
                <MobileDateTimePicker
                    disablePast
                    label={label}
                    value={value}
                    onChange={onChange}
                    className={className}
                    slotProps={{
                        layout: {sx: {backgroundColor: "info.main"}},
                        textField: {
                            variant: "standard",
                            InputProps: {
                                sx: {padding: "20px 0"},
                                disableUnderline: true,
                                placeholder: placeholder,
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <div className="h-6 w-6">
                                            <Image width="24" height="24" alt="earth"
                                                   src="/images/spiral_calendar_pad.png"/>
                                        </div>
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment className="hover-opactiry  transition-opacity" position="start">
                                        <ArrowRightIcon/>
                                    </InputAdornment>
                                ),
                            },
                        }
                    }}
                />
                <Divider className="hover-opacity transition-opacity"/>
            </FormControl>
        </LocalizationProvider>
    );
};


export default DateTimePicker;
