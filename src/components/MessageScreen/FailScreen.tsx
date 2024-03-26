import Image from "next/image";

import { useTranslations } from "next-intl";

import { useScreen } from "@/lib/provider/screen.provider";

import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";

import FailGif from "@/assets/gif/fail.gif";

export default function FailScreen() {

    const trans = useTranslations();
    const { toggleFailScreen } = useScreen();

    return <div
        className="bg-primary flex-1 z-[500] absolute top-0 left-0 flex flex-col justify-center items-center h-screen w-screen min-w-[300px] overflow-x-scroll"
    >
        <div className="m-auto text-center">
            <div className="bg-primary p-10">
                <Image src={FailGif} alt="unicorn" className="mx-auto" width={90} height={90} />
            </div>
            <h1 className="text-[16px] font-InterBold my-2">Something went wrong</h1>
            <h3 className="font-[400] font-InterRegular text-[13px]">Please try again later</h3>
        </div>
        <Footer className="left-0 mb-0 bg-primary !border-none">
            <FooterButton
                onClick={() => toggleFailScreen(false)}
                className="w-full"
                variant="contained">
                {trans("common.back_to_app")}
            </FooterButton>
        </Footer>
    </div>
}