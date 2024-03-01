import React from "react";
import {NumericFormat as BaseNumericFormat, NumericFormatProps} from "react-number-format";

export interface NumberFormatProps extends NumericFormatProps{
    onChange?: (event: { target: { name: string; value: string } }) => void;
    name: string;
    id?: string;
    prefix?: string;
    suffix?: string;
    placeholder?: string
    className?: string;
}

const NumberFormat = React.forwardRef(function NumberFormatCustom(props: NumberFormatProps, ref) {
    const {onChange, className,
        placeholder, prefix, suffix, ...other} = props;

    return (
        <BaseNumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                if (onChange) {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }
            }}
            placeholder={placeholder}
            thousandSeparator={' '}
            decimalScale={2}
            prefix={prefix}
            suffix={suffix}
            className={className}
        />
    );
});

export default NumberFormat;
