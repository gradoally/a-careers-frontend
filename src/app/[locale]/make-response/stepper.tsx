"use client"

import React, {useState} from "react";
import {useTranslations} from "next-intl";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Shell from "@/components/layout/Shell";
import AppBar from "@/components/layout/app-bar";
import BackButton from "@/components/ui/buttons/BackButton";
import {NextLinkComposed} from "@/components/Link";
import CloseButton from "@/components/ui/buttons/CloseButton";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";

import Deadline from "./deadline";
import Price from "./price";
import Comment from "./comment";

export interface TaskCreateType {
    language?: string;
    category?: string;
}

const Stepper = () => {
    const t = useTranslations("tasks");
    const tc = useTranslations("common");

    const [data, setData] = useState<TaskCreateType>({});
    const [step, setStep] = useState<number>(1);
    const [title, setTitle] = useState(t("create"))
    const [disabled, setDisabled] = useState(false)


    const handleBack = () => {
        const newStep = step == 1 ? 1 : step - 1
        setStep(newStep)
    }

    const header = (
        <AppBar height="70px">
            <Stack alignItems="center" className="w-full" spacing={2} direction="row">
                <BackButton onClick={handleBack} />
                <div className="flex-grow text-center">
                    <Typography variant="body1">
                        {title}
                    </Typography>
                    <Typography className="mt-[5px]"  variant="caption" component="div">{step} / 3</Typography>
                </div>
                <CloseButton component={NextLinkComposed} to={"/make-response"}/>
            </Stack>
        </AppBar>
    )

    const handleClick = () => {
        const newStep = step+1;

        setStep(newStep);
    }

    const renderStep =  ()=>{
        switch (step){
            case 3: return (<Comment data={data}/>)
            case 2:
                return (<Deadline data={data}/>)
            case 1:
            default:
                return (<Price data={data}/>)
        }
    }

    const footer = (
        <Footer>
            {step===3?(
                <>
                    <FooterButton
                        component={NextLinkComposed}
                        to={"/make-response/task"}
                        disabled={disabled}
                        className="w-full"
                        color={"secondary"} sx={{color: "common.black"}}
                        variant="contained">
                        {t("send_response")}
                    </FooterButton>
                    <Typography variant="body2">Комиссия сети ≈ 0.011 TON</Typography>
                </>
            ): (
                <FooterButton
                    disabled={disabled}
                    onClick={handleClick}
                    className="w-full"
                    color={"secondary"} sx={{color: "common.black"}}
                    variant="contained">
                    {tc("next")}
                </FooterButton>
            )}
        </Footer>
    )
    return (
        <Shell padding="70px 0 100px 0" header={header} footer={footer}>
            {renderStep()}
        </Shell>
    )
}

export default Stepper;
