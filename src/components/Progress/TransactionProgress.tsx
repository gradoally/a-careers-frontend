import Image from "next/image";

import UnicornGif from "@/assets/gif/unicorn-low.gif";
export default function TransactionProgress() {
    return <div
        className="bg-primary z-[2000] absolute top-0 left-0 flex flex-col justify-center items-center min-h-screen h-full w-screen min-w-[300px] overflow-x-scroll"
    >
        <div className="m-auto text-center">
            <Image src={UnicornGif} alt="unicorn" className="mx-auto" width={90} height={90} />
            <h1 className="text-[1.1rem] mt-2">Transaction is in progress</h1>
            <h3 className="font-[400] text-[0.9rem]">Please do not close the app</h3>
        </div>
    </div>
}