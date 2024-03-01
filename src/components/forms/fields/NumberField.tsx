import Typography from '@mui/material/Typography';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import React from "react";
import FormControl from "@/components/forms/FormControl";
import NumberFormat, {NumberFormatProps} from "@/components/forms/fields/NumberFormat";
import Divider from "@/components/ui/Divider";

interface Props {
    fullWidth?: boolean;
    label?: string;
    InputProps?: Partial<NumberFormatProps>;
    id?: string
    value?: string
    name: string
    disableUnderline?: boolean;
    helperText?: string;
    onChange?: (event: { target: { name: string; value: string } }) => void;
    placeholder?: string;
}

const NumberField = (
    {
        InputProps,
        label,
        fullWidth = true,
        disableUnderline,
        onChange,placeholder,
        ...props
    }: Props
) => {
    return (
        <FormControl
            fullWidth={fullWidth} variant="standard"
        >
            {label && (
                <InputLabel
                    // shrink={props.shrink}
                    htmlFor={props.id}>
                    <Typography variant="caption">{label}</Typography>
                </InputLabel>
            )}
            <NumberFormat
                   style={{padding: "10px 0"}}
                   {...InputProps}
                   onChange={onChange}
                   value={props.value}
                   id={props.id}
                   name={props.name}
                   placeholder={placeholder}
                   className="bg-primary focus:outline-none"
            />
            {!disableUnderline && <Divider className="hover-opacity transition-opacity"/>}

            {props.helperText && (
                <FormHelperText>
                    {props.helperText}
                </FormHelperText>
            )}
        </FormControl>
    )
}


export default NumberField;