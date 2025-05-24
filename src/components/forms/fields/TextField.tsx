import React from "react";

import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import { TextFieldProps } from "@mui/material/TextField";

import Input from "@/components/forms/fields/Input";
import FormControl from "@/components/forms/FormControl";

interface ITextFieldProps extends Omit<TextFieldProps, 'variant'> {
    readonly?: boolean;
    variant?: 'standard' | 'outlined' | 'filled';
}

const TextField = (
    {
        InputProps,
        InputLabelProps,
        label,
        fullWidth = true,
        className,
        readonly = false,
        ...props
    }: ITextFieldProps
) => {
    return (
        <FormControl
            error={props.error}
            className={className}
            fullWidth={fullWidth}
            variant="standard"
        >
            {/*
            shrink={InputLabelProps?.shrink}
                    htmlFor={props.id}
    */}
            {label && (
                <InputLabel>
                    <Typography variant="caption" className="!text-[12px]">{label}</Typography>
                </InputLabel>
            )}
            <Input
                type={props.type}
                sx={{ padding: "10px 0" }}
                {...InputProps}
                onChange={props.onChange}
                multiline={props.multiline}
                value={props.value}
                defaultValue={props.defaultValue}
                id={props.id}
                name={props.name}
                error={props.error}
                readOnly={readonly}
            />
            {props.helperText && (
                <FormHelperText sx={{ marginTop: "10px" }} error={props.error}>
                    {props.helperText}
                </FormHelperText>
            )}
        </FormControl>
    )
}


export default TextField;
