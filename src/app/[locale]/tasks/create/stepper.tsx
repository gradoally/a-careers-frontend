"use client"
import {useTranslations, useLocale} from "next-intl";

import React, {useState, useEffect} from "react";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import {useFormik} from "formik";

import Shell from "@/components/layout/Shell";
import AppBar from "@/components/layout/app-bar";
import BackButton from "@/components/ui/buttons/BackButton";
import {NextLinkComposed} from "@/components/Link";
import CloseButton from "@/components/ui/buttons/CloseButton";
import Footer from "@/components/layout/Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";
import {checkError, toastLoading, toastUpdate} from "@/lib/helper";

import SelectLanguage from "./select-language";
import SelectCategory from "./select-category";
import Title from "./title";
import Deadline from "./deadline";
import Price from "./price";
import Description from "./description";
import TechnicalTask from "./technical_task";
import {z} from "zod";
import {toFormikValidationSchema} from "zod-formik-adapter";
import {useMasterContract} from "@/hooks/useMasterContract";
import {buildOrderContent, OrderContentData} from "@/contracts/Order";
import {toNano} from "@ton/core";
import {useUserContract} from "@/hooks/useUserContract";
import {useAuthContext} from "@/lib/auth-provider";
import {useTonClient} from "@/hooks/useTonClient";
import {useConfirm} from "material-ui-confirm";


const keys: Record<number, string> = {
    1: "language",
    2: "category",
    3: "name",
    4: "deadline",
    5: "price",
    6: "description",
    7: "technicalTask"
}

export interface TaskCreateType {
    language: string;
    category: string;
    price: string;
    deadline: string | null;
    name: string;
    description: string;
    technicalTask: string;
}



const Stepper = () => {
    const locale = useLocale();
    const t = useTranslations();
    const {user} = useAuthContext();
    const {client} = useTonClient();
    const confirm = useConfirm();

    const {
        sendCreateOrder
    } = useUserContract(String(user?.address));
    const {orderNextIndex} = useMasterContract();

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


    const schema = z.object({
        language: z.string({required_error: t("form.required.default")}),
        category: z.string({required_error: t("form.required.default")}),
        name: z.string({required_error: t("form.required.default")}),
        price: z.string({required_error: t("form.required.default")}),
        deadline: z.date({required_error: t("form.required.default")}),
        description: z.string({required_error: t("form.required.default")}),
        technicalTask: z.string({required_error: t("form.required.default")}),
    });

    const handleSubmit = (values: TaskCreateType)=>{
        {
            if (orderNextIndex == null || client == null || user == null) {
                return;
            }
            confirm().then(async () => {
                const toastId = toastLoading(t("common.please_wait"))

                try {
                    const orderContentData: OrderContentData = {
                        category: values.category,
                        language: values.language,
                        name: values.name,
                        price:  toNano(values.price),
                        deadline: Math.round(Date.now() / 1000) + 604800,
                        description: values.description,
                        technicalTask: values.technicalTask,
                    };
                    const orderContentDataCell = buildOrderContent(orderContentData);
                    sendCreateOrder("0.3",
                        0, orderContentDataCell,
                        toNano(orderContentData.price),
                        orderContentData.deadline,
                        orderContentData.deadline + 259200
                    );
                    toastUpdate(toastId, t("tasks.task_successfully_created"), 'success');

                } catch (e) {
                    console.log("create_order", e)
                    toastUpdate(toastId,  t("errors.something_went_wrong_sorry"), 'warning');

                }
            })
        }
    }

    const formik = useFormik<TaskCreateType>(
        {

            initialValues: {
                language: locale,
                category: "",
                price: "",
                deadline: null,
                description: "",
                name: "",
                technicalTask: "",
            },
            initialErrors: {
                category: t("form.required.default")
            },
            validationSchema: toFormikValidationSchema(schema),

            onSubmit:  handleSubmit
        },
    )

    useEffect(()=>{
        if(checkError(formik, {}, keys[step])){
            setDisabled(true)
        }else(
            setDisabled(false)
        )
    }, [formik.errors])

    const handleBack = () => {
        const newStep = step == 1 ? 1 : step - 1
        setStep(newStep)
    }


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
    console.log(formik.errors, step,keys[step])

    const footer = (
        <Footer>
            {step === 7 ? (
                <>
                    <FooterButton
                        onClick={()=>handleSubmit(formik.values)}
                        disabled={disabled}
                        className="w-full"
                        color={"secondary"}
                        variant="contained">
                        {t("tasks.send_task_to_blockchain")}
                    </FooterButton>
                    <Typography variant="body2">
                        {t("network.commission", {value: "0.011 TON"})}
                    </Typography>
                </>
            ) : (
                <FooterButton
                    disabled={checkError(formik, {}, keys[step])}
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
