"use client"
import {useRef, ReactNode} from "react";
import {useTranslations} from "next-intl";

import Stack from "@mui/material/Stack";

import CopyButton from "@/components/ui/buttons/CopyButton";
import {toast} from "@/lib/helper";

const CopyContainer = ({children, className=""}: { children: ReactNode, className?: string }) => {
    const trans = useTranslations()

    const textRef = useRef<HTMLDivElement | null>(null)
    const handleCopy = () => {
        const textElement = textRef.current
        if (!textElement) return
        const targetText = textElement.innerText;
        if (targetText) {
            navigator.clipboard.writeText(targetText)
                .then(() => {
                    toast(trans("copy.copied"))
                })
                .catch(() => {
                    toast(trans("copy.error_copying_to_clipboard"), "warning")
                });
        }
    }
    return (
        <Stack alignItems="center" direction="row" spacing={0} className={className}>
            <div ref={textRef}>{children}</div>
            <CopyButton sx={{fontSize: "10px", paddingTop:"2px",paddingBottom:"2px"}} onClick={handleCopy}/>
        </Stack>
    )
}

export default CopyContainer;
