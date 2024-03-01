import Radio, {RadioProps} from "@mui/material/Radio";
import React from "react";

import {BpCheckedIcon, BpIcon} from "./styled";

function BpRadio(props: RadioProps) {
    return (
        <Radio
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon/>}
            icon={<BpIcon/>}
            {...props}
        />
    );
}

export default BpRadio;