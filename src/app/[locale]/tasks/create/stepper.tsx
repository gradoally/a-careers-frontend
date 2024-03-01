"use client"
import {useTranslations, useLocale} from "next-intl";

import React, {useState, useEffect} from "react";
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
    deadline: string | null;
    title: string;
    description: string;
    technicalTask: string;
}

const Stepper = () => {
    const locale = useLocale();
    const t = useTranslations();

    const [step, setStep] = useState<number>(1);
    const [title, setTitle] = useState(t("tasks.create"))
    const [subtitle, setSubtitle] = useState(t("tasks.first_step"))
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        if (step == 1) {
            setSubtitle(t("tasks.first_step"))
        } else {
            setSubtitle(t("tasks.step_x_from_x", {"value": step, "from": 7}))
        }
    }, [step])

    const formik = useFormik<TaskCreateType>(
        {
            initialValues: {
                language: locale,
                category: "",
                price: 0,
                deadline: null,
                description: "",
                title: "",
                technicalTask: "",
            },
            onSubmit: (values: TaskCreateType) => {

            }
        },
    )

    const handleBack = () => {
        const newStep = step == 1 ? 1 : step - 1
        setStep(newStep)
    }

    const header = (
        <AppBar height="70px">
            <Stack alignItems="center" className="w-full" spacing={2} direction="row">
                {step === 1 ? <div className="h-[30px] w-[30px]"/> : <BackButton onClick={handleBack}/>}
                <div className="flex-grow text-center ">
                    <div className="max-w-[200px] mx-auto">
                        <Typography variant="body1" className="truncate">
                            {title}
                        </Typography>
                        <Typography className="mt-[5px]" variant="caption" component="div">
                            {subtitle}
                        </Typography>
                    </div>
                </div>
                <CloseButton component={NextLinkComposed} to={"/tasks/my"}/>
            </Stack>
        </AppBar>
    )


    const handleClick = () => {
        const newStep = step + 1;
        setStep(newStep);
    }

    const renderStep = () => {
        switch (step) {
            case 7:
                return (<TechnicalTask formik={formik}/>)
            case 6:
                return (<Description formik={formik}/>)
            case 5:
                return (<Price formik={formik}/>)
            case 4:
                return (<Deadline formik={formik}/>)
            case 3:
                return (
                    <Title formik={formik}/>
                )
            case 2:
                return (
                    <SelectCategory setTitle={setTitle} formik={formik}/>
                )
            case 1:
            default:
                return (<SelectLanguage formik={formik}/>)
        }
    }

    const footer = (
        <Footer>
            {step === 7 ? (
                <Stack spacing="10px" className="h-[65px]">
                    <FooterButton
                        component={NextLinkComposed}
                        to={"/create-task/task"}
                        disabled={disabled}
                        className="w-full"
                        color={"secondary"}
                        variant="contained">
                        {t("tasks.send_task_to_blockchain")}
                    </FooterButton>
                    <Typography variant="body2">
                        {t("network.commission", {value: "0.011 TON"})}
                    </Typography>
                </Stack>
            ) : (
                <FooterButton
                    disabled={disabled}
                    onClick={handleClick}
                    color={"secondary"}
                    variant="contained">
                    {t("buttons.next")}
                </FooterButton>
            )}
        </Footer>
    )
    return (
        <Shell header={header} footer={footer}>
            {renderStep()}
        </Shell>
    )
}

export default Stepper;
