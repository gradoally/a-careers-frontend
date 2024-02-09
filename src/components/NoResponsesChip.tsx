import {useTranslations} from "next-intl";

import Box from "@mui/material/Box";
import React from "react";

const NoResponsesChip = ()=>{
    const t = useTranslations("common");
    return (
        <Box component="div" sx={{
            maxWidth: "67px",
            color: "warning.main",
            height: "14px",
            padding: "3px 0 0 3px",
            margin: "5px 0",
            borderRadius: "2px",
            border: "0.5px solid #00FF47",
            fontSize: "8px",
            fontWeight: 400,
            lineHeight: "8px",
            letterSpacing: "0.06em",
        }}>
            {t("no_responses")}
        </Box>
    )
}

export default NoResponsesChip;