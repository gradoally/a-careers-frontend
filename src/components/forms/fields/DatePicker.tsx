"use client"
import React from "react";
// import TextField from "@mui/material/TextField";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import ruLocale from "date-fns/locale/ru";
// import enLocale from "date-fns/locale/en-US";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

// const localeMap = {
//     en: enLocale,
//     ru: ruLocale,
// };

export const DatePicker = ({value, setValue, label, minDate, maxDate, disableMaskedInput=true}: {
    value: string, setValue: (value: string)=>void, minDate?: any, maxDate?: any, label: string, disableMaskedInput?: boolean
}) => {
    // const {locale} = useRouter();
    const [open, setOpen] = React.useState<boolean>(false)
    return (
        <LocalizationProvider
            // adapterLocale={localeMap["ru"]}
            dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                label={label}
                value={value}
                // disableMaskedInput={disableMaskedInput}
                minDate={minDate}
                maxDate={maxDate}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                // renderInput={(params:any) => <TextField {...params}
                //                                     // InputProps={{
                //     // endAdornment: (
                //     //     <IconButton><ClearIcon/></IconButton>
                //     // )
                // // }}
                //                                     onClick={(e) => setOpen(true)}/>}
            />
        </LocalizationProvider>
    );
};


