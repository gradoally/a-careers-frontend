import * as React from 'react';
import { styled } from '@mui/material/styles';
import Radio, { RadioProps } from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {useTranslations} from "next-intl";

const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    width: 15,
    height: 15,
    border: "0.5px solid #fff",
    // boxShadow:
    //     theme.palette.mode === 'dark'
    //         ? '0 0 0 1px rgb(16 22 26 / 40%)'
    //         : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    // backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    // backgroundImage:
    //     theme.palette.mode === 'dark'
    //         ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
    //         : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
    },
    'input:hover ~ &': {
        // backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',

        '&::before': {
            display: 'block',
            width: "100%",
            height: "100%",
            backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
            content: '""',
        },
    },
    'input:disabled ~ &': {
        boxShadow: 'none',
        background:
            theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
    },
}));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#45AEF5',
    border: "0.5px solid #45AEF5",

    // backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    // "& span": {
    //     backgroundColor: 'secondary.info',
    // },
    // '&::before': {
    //     display: 'block',
    //     width: "100%",
    //     height: "100%",
    //     backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    //     content: '""',
    // },
    'input:hover ~ &': {
        backgroundColor: '#106ba3',

    },
});

// Inspired by blueprintjs
function BpRadio(props: RadioProps) {
    return (
        <Radio
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            {...props}
        />
    );
}

export default function CustomizedRadios() {
    const t = useTranslations("filter");

    return (
        <FormControl className="w-full">
            <FormLabel id="demo-customized-radios">{t("sort")}</FormLabel>
            <RadioGroup
                defaultValue={"by_publication_date"}
                aria-labelledby="demo-customized-radios"
                name="customized-radios"
            >
                <FormControlLabel
                    slotProps={{typography: {variant: "caption", "component": "div", sx: {marginRight: "auto"}}}}
                    labelPlacement="start" value="by_publication_date" control={<BpRadio />} label={t("by_publication_date")} />
                <FormControlLabel

                    slotProps={{typography: {variant: "caption",  "component": "div", sx: {marginRight: "auto"}}}}
                    labelPlacement="start" value="by_deadline" control={<BpRadio />} label={t("by_deadline")} />
            </RadioGroup>
        </FormControl>
    );
}
