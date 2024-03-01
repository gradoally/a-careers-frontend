"use client"
import {useRef, ReactNode} from "react";
import {useTranslations} from "next-intl";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import CopyButton from "@/components/ui/buttons/CopyButton";
import {toast} from "@/lib/helper";

const CopyContainer = ({children, className=""}: { children: ReactNode, className?: string }) => {
    const t = useTranslations("copy")

    const textRef = useRef<HTMLDivElement | null>(null)
    const handleCopy = () => {
        const textElement = textRef.current
        if (!textElement) return
        const targetText = textElement.innerText;
        if (targetText) {
            navigator.clipboard.writeText(targetText)
                .then(() => {
                    toast(t("copied"))
                })
                .catch(() => {
                    toast(t("error_copying_text_to_clipboard"), "warning")
                });
        }
    }
    return (
        <Stack alignItems="center" direction="row" spacing={0} className={className}>
            <div ref={textRef}>{children}</div>
            <CopyButton sx={{fontSize: "10px"}} onClick={handleCopy}/>
        </Stack>
    )
}

export default CopyContainer;
