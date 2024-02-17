import clsx from "clsx";

import {ReactNode} from "react";

interface Props {
    children: ReactNode;
    transparent?: boolean;
}

const Footer = (props: Props) => {

    return (
        <footer id="footer"
                className={clsx(
                    "flex flex-col items-center justify-center w-full p-[20px]",
                    "min-h-[100px]",
                    "fixed bottom-0 left-0",
                    "space-y-[15p] width-[375px] ms-auto",
                )}
                style={{
                    borderTop: props.transparent ? "none" : "1px solid rgba(217, 217, 217, 0.2)",
                    background: props.transparent ? "transparent" : "linear-gradient(180deg, rgba(0, 0, 21, 0.77) 0%, #000015 100%)",
                }}
        >
            {props.children}
        </footer>
    )
}

export default Footer;
