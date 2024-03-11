import React from 'react';
import { useTranslations } from "next-intl";

import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import Divider from "@/components/ui/Divider";
import BpRadio from "@/components/forms/fields/BpRadio";

interface ICustomizedRadioProps {
    onChange: (value: string) => void;
    value: "createdAt" | "deadline" | undefined;
}

export default function CustomizedRadios(
    { onChange, value }: ICustomizedRadioProps
) {
    const trans = useTranslations("filter");
    return (
        <FormControl className="w-full">
            <FormLabel sx={{
                padding: "0 15px",
                color: "common.white",
                "&.Mui-focused": {
                    color: "common.white"
                }
            }}
                id="sort-radios">{trans("sort")}</FormLabel>
            <RadioGroup
                defaultValue={value}
                aria-labelledby="sort-radios"
                name="sort-radios"
            >
                <FormControlLabel
                    sx={{ padding: "0 25px 0 0", margin: "20px 15px" }}
                    slotProps={{ typography: { variant: "caption", "component": "div", sx: { marginRight: "auto" } } }}
                    labelPlacement="start"
                    value="createdAt"
                    control={<BpRadio />}
                    label={(
                        <>
                            {trans("by_publication_date")}
                            {value === "createdAt" && <span className="text-secondary"> ↑</span>}
                        </>
                    )}
                    onClick={() => onChange("createdAt")}
                />
                <Divider />
                <FormControlLabel
                    sx={{ padding: "0 25px 0 0px", margin: "20px 15px" }}
                    onClick={() => onChange("deadline")}
                    slotProps={{ typography: { variant: "caption", "component": "div", sx: { marginRight: "auto" } } }}
                    labelPlacement="start" value="deadline" control={<BpRadio />} label={(
                        <>
                            {trans("by_deadline")}
                            {value === "deadline" && <span className="text-secondary"> ↑</span>}
                        </>
                    )} />
            </RadioGroup>
        </FormControl>
    );
}
