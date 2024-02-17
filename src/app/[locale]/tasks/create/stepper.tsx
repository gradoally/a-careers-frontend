"use client"
import {useTranslations, useLocale} from "next-intl";

import React, {useState} from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

import Shell from "@/components/layout/Shell";
import AppBar from "@/components/layout/app-bar";
import BackButton from "@/components/ui/buttons/BackButton";
import {NextLinkComposed} from "@/components/Link";
import CloseButton from "@/components/ui/buttons/CloseButton";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";

import SelectLanguage from "./select-language";
import SelectCategory from "./select-category";
import Title from "./title";
import Deadline from "./deadline";
import Price from "./price";
import Description from "./description";
import TechnicalTask from "./technical_task";
import {useFormik} from "formik";

export interface TaskCreateType {
    language: string;
    category: string;
    price: number;
    deadline: string;
    title: string;
    description: string;
    technicalTask: string;
}

const Stepper = () => {
    const locale = useLocale();
    const t = useTranslations("tasks");
    const tc = useTranslations("common");

    const [step, setStep] = useState<number>(1);
    const [title, setTitle] = useState(t("create"))
    const [disabled, setDisabled] = useState(false)

    const formik = useFormik<TaskCreateType>(
        {
            initialValues: {
                language: locale,
                category: "",
                price: 0,
                deadline: "",
                description: "",
                title: "",
                technicalTask: "",
            },
            onSubmit: (values: TaskCreateType)=>{}
        },

    )

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
                    <Typography className="mt-[5px]"  variant="caption" component="div">{step} / 7</Typography>
                </div>
                <CloseButton component={NextLinkComposed} to={"/tasks/my"}/>
            </Stack>
        </AppBar>
    )

    const handleClick = () => {
        const newStep = step+1;

        setStep(newStep);
    }

    const renderStep =  ()=>{
        switch (step){
            case 7: return (<TechnicalTask formik={formik}/>)
            case 6: return (<Description formik={formik}/>)
            case 5: return (<Price formik={formik}/>)
            case 4:
                return (<Deadline formik={formik}/>)
            case 3:
                return (
                    <Title formik={formik}/>
                )
            case 2:
                return (
                    <SelectCategory formik={formik}/>
                )
            case 1:
            default:
                return (<SelectLanguage formik={formik}/>)
        }
    }

    const footer = (
        <Footer>
            {step===7?(
                <>
                    <FooterButton
                        component={NextLinkComposed}
                        to={"/create-task/task"}
                        disabled={disabled}
                        className="w-full"
                        color={"secondary"} sx={{color: "common.black"}}
                        variant="contained">
                        Отправить задачу в блокчейн
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
        <Shell withDrawer header={header} footer={footer}>
            {renderStep()}
        </Shell>
    )
}

export default Stepper;
