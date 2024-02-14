"use client"
import clsx from "clsx";

import {ReactNode, useEffect, useState} from "react";

interface Props {
    children: ReactNode;
    transparent?: boolean;
}

const Footer = (props: Props) => {
    const [h, setH] = useState<string>("100px")
    const styled = {
        // borderTop: props.transparent ? "none" : "1px solid rgba(217, 217, 217, 0.2)",
        borderTop: props.transparent ? "none" : "1px solid rgba(217, 217, 217, 0.2)",
        background: props.transparent ? "transparent" : "linear-gradient(180deg, rgba(0, 0, 21, 0.77) 0%, #000015 100%)",
    }
    useEffect(() => {
        const footer = document.getElementById("footer");
        if (!footer) return
        const height = footer.clientHeight;
        if (height > 100) setH(`${height}px`);
        console.log(height)
    }, [props.children])
    return (
        <>
            <div style={{"minHeight": h}}/>
            <footer id="footer"
                    className={clsx(
                        "flex flex-col items-center justify-center w-full p-[20px]",
                        "min-h-[100px]",
                        "fixed bottom-0 left-0",
                        "space-y-[15px]"
                    )}
                    style={styled}
            >
                {props.children}
            </footer>
        </>
    )
}

export default Footer;
