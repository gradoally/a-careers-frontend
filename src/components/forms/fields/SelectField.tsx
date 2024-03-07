import {ReactNode} from "react";
import MuiSelect, {SelectProps, SelectChangeEvent} from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormHelperText from '@mui/material/FormHelperText';

import Divider from "@/components/ui/Divider";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import FormControl from "@/components/forms/FormControl";

interface Props {
    id: string;
    name: string;
    label?: string;
    SelectProps?: SelectProps;
    value: string;
    helperText?: string;
    error?: boolean;
    children: ReactNode;
    onChange: (e: any) => void
    /**
     * The variant to use.
     * @default 'standard'
     */
    variant?: 'standard' | 'outlined' | 'filled';
    required?: boolean;
    className?: string;
    dividerClassName?: string;
    shrink?: boolean;
    disableUnderline?: boolean;
}

const SelectField = (
    {
        id, label, name, children, error, variant = "standard", helperText, required, value,
        SelectProps = {}, onChange, className, disableUnderline=false,dividerClassName,shrink=true,
    }: Props) => {
    return (

        <FormControl className={className}
                     variant={variant}
                     fullWidth
                     margin={'normal'}
                     error={error}>
            {label && <InputLabel
                shrink={shrink}
                id={`label-${id}`} required={required ?? false}>{label}</InputLabel>}
            <MuiSelect
                sx={{padding: "10px 0"}}
                IconComponent={ArrowRightIcon}
                {...SelectProps}
                disableUnderline
                labelId={`label-${id}`}
                name={name}
                label={label}
                onChange={onChange}
                value={value}
                MenuProps={{sx: {"& .MuiMenu-paper":{"border": "1px solid #fff"}}}}
            >
                {children}
            </MuiSelect>
            {!disableUnderline && <Divider className={`hover-opacity transition-opacity ${dividerClassName}`}/>}
            {helperText && (<FormHelperText>{helperText}</FormHelperText>)}
        </FormControl>
    )
}

export default SelectField;