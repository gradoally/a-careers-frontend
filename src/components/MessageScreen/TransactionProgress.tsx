import Image from "next/image";

import { useTranslations } from "next-intl";

import UnicornGif from "@/assets/gif/unicorn-low.gif";

export default function TransactionProgress() {
    const trans = useTranslations();
    return <div
        className="bg-primary z-[500] absolute top-0 left-0 flex flex-col justify-center items-center min-h-screen h-full w-screen min-w-[300px] overflow-x-scroll"
    >
        <div className="m-auto text-center">
            <Image src={UnicornGif} alt="unicorn" className="mx-auto" width={90} height={90} />
            <h1 className="text-[16px] font-InterBold mt-4 mb-2">{trans("screen.tx_progress.heading")}</h1>
            <h3 className="font-[400] font-InterRegular text-[13px]">{trans("screen.tx_progress.subheading")}</h3>
        </div>
    </div>
}
