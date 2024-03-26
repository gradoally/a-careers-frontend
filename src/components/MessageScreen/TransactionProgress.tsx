import Image from "next/image";

import UnicornGif from "@/assets/gif/unicorn-low.gif";

export default function TransactionProgress() {
    return <div
        className="bg-primary z-[500] absolute top-0 left-0 flex flex-col justify-center items-center min-h-screen h-full w-screen min-w-[300px] overflow-x-scroll"
    >
        <div className="m-auto text-center">
            <Image src={UnicornGif} alt="unicorn" className="mx-auto" width={90} height={90} />
            <h1 className="text-[16px] font-InterBold mt-4 mb-2">Transaction is in progress</h1>
            <h3 className="font-[400] font-InterRegular text-[13px]">Please do not close the app</h3>
        </div>
    </div>
}