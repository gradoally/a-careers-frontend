import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import {StandardTextFieldProps} from "@mui/material/TextField/TextField";
import React from "react";
import Input from "@/components/forms/fields/Input";
import FormControl from "@/components/forms/FormControl";


const TextField = (
    {
        InputProps,
        InputLabelProps,
        label,
        fullWidth = true,
        className,
        ...props
    }: StandardTextFieldProps
) => {
    return (
        <FormControl
            error={props.error}
            className={className}
            fullWidth={fullWidth} variant="standard"
        >
            {label && (
                <InputLabel
                    shrink={InputLabelProps?.shrink}
                    htmlFor={props.id}>
                    <Typography variant="caption">{label}</Typography>
                </InputLabel>
            )}
            <Input type={props.type}
                   sx={{padding: "10px 0"}}
                   {...InputProps}
                   onChange={props.onChange}
                   multiline={props.multiline}
                   value={props.value}
                   defaultValue={props.defaultValue}
                   id={props.id}
                   name={props.name}
            />
            {props.helperText && (
                <FormHelperText sx={{marginTop: "10px"}}>
                    {props.helperText}
                </FormHelperText>
            )}
        </FormControl>
    )
}


export default TextField;