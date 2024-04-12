"use client"
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useAppContext } from "@/lib/provider/app.providers";

import { Drawer as MuiDrawer, Stack, Typography, } from '@mui/material';
import MuiDivider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";

import Image from "@/components/Image";
import BackButton from "@/components/ui/buttons/BackButton";
import Divider from "@/components/ui/Divider";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import HoverOpacityComponent from "@/components/ui/HoverOpacityComponent";
import CustomizedRadios from "@/components/layout/filter/FilterSort";
import AppBar from "@/components/layout/app-bar";
import Shell from "@/components/layout/Shell";
import NumberFormat from "@/components/forms/fields/NumberFormat";
import TextField from "@/components/forms/fields/TextField";
import SelectField from "@/components/forms/fields/SelectField";
import Footer from "../Footer";
import FooterButton from "@/components/ui/buttons/FooterButton";

import { getOrdersCount } from "@/services/order";
import { CircularLoading } from "@/components/features/Loaders";

const FilterContent = () => {
    const { isFilterOpen, toggleFilter, config } = useAppContext()
    const trans = useTranslations();
    const tc = useTranslations();
    const [count, setCount] = useState({ count: 0, loading: false });
    const [filters, setFilters] = React.useState<Record<string, string>>({})
    const router = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams();

    React.useEffect(() => {
        const price = searchParams.get("minPrice") ?? ""
        const orderBy = searchParams.get("orderBy")
        const language = searchParams.get("translateTo")
        const category = searchParams.get("category")
        const params: Record<string, string> = {}
        if (orderBy !== null && !["createdAt", "deadline"].includes(orderBy as string)) {
            params["orderBy"] = orderBy
        }
        if (price) {
            params["minPrice"] = price;
        }
        if (language) {
            params["translateTo"] = language;
        }
        if (category) {
            params["category"] = category;
        }
        setFilters(params)
    }, [])

    useEffect(() => {
        if (!isFilterOpen || count.loading) return;
        (async () => {
            setCount({ loading: true, count: 0 });
            try {
                const res = await getOrdersCount(new URLSearchParams(filters).toString());
                setCount({ count: res.data || 0, loading: false });
            } catch (err) {
                setCount({ count: 0, loading: false });
            }
        })();
    }, [filters, isFilterOpen]);

    const setOptions = (key: "minPrice" | "orderBy" | "translateTo" | "category", value: string) => {
        const options = {
            ...filters,
            [key]: value
        }
        if (options[key] === "all")
            delete options[key];
        setFilters(options)
    }

    const handleBack = () => {
        toggleFilter(false)
        const params = new URLSearchParams(filters);
        router.replace(`${pathname}?${params.toString()}`);
    }

    const header = (
        <AppBar padding="15px" height="60px">
            <Stack direction="row" alignItems="center" spacing={1}>
                <BackButton onClick={handleBack} />
                <Typography variant="h5" color="info.main">{trans("filter.filters")}</Typography>
            </Stack>
        </AppBar>
    )

    const footer = (
        <Footer>
            {!count.loading ? <FooterButton
                onClick={handleBack}
                color={"secondary"}
                variant="contained"
            >
                {tc("tasks.show", { count: count.count })}
            </FooterButton> : <CircularLoading className="m-auto" />}
        </Footer>
    )

    return (
        <MuiDrawer
            variant="temporary"
            onClose={() => toggleFilter(false)}
            open={isFilterOpen}
            sx={{
                zIndex: theme => theme.zIndex.drawer + 2,
                width: "100vw",
            }}
            PaperProps={{
                sx: {
                    width: "100%",
                    backgroundColor: theme => theme.palette.background.paper,
                    backgroundImage: 'none'
                }
            }}
        >

            <Shell header={header} footer={footer}>
                <HoverOpacityComponent>
                    <Stack spacing="15px" alignItems="center" justifyContent="center" direction="row"
                        className="px-[16px] py-[19px]">
                        <div className="h-6 w-6 flex-shrink-0">
                            <Image
                                style={{ width: "24px", height: "24px" }}
                                width="24"
                                height="24"
                                alt="puzzle-piece"
                                src="/images/puzzle-piece.svg"
                            />
                        </div>
                        <SelectField
                            variant="standard"
                            label={trans("filter.categories")}
                            id="category"
                            name="category"
                            value={filters?.category ?? "all"}
                            disableUnderline
                            onChange={(e) => setOptions("category", e.target.value)}
                            className="capitalize"
                            SelectProps={{
                                sx: { padding: "0" },
                                IconComponent: () => null
                            }}
                            sxStyles={{
                                padding: "6px 0 0 0"
                            }}
                        >
                            <MenuItem key={0} value={"all"}>{trans("filter.all")}</MenuItem>
                            {config?.categories && config.categories.filter(cat => cat.isActive && cat?.code).map((cat, index) => <MenuItem key={index + 1} value={cat.code}>{trans(`category.${cat.code}`)}</MenuItem>)}
                        </SelectField>
                        <ArrowRightIcon />
                    </Stack>
                    <Divider className="hover-opacity transition-opacity" />
                </HoverOpacityComponent>
                <HoverOpacityComponent>
                    <Stack spacing="15px" alignItems="center" justifyContent="center" direction="row"
                        className="px-[16px] py-[19px]">
                        <div className="h-6 w-6 flex-shrink-0">
                            <Image style={{ width: "24px", height: "24px" }} width="24" height="24" alt="earth"
                                src="/images/earth_americas.png" />
                        </div>
                        <SelectField
                            variant="standard"
                            label={trans("filter.show_tasks_on_language")}
                            id="language"
                            name="language"
                            value={filters?.translateTo ?? "all"}
                            onChange={(e) => setOptions("translateTo", e.target.value)}
                            disableUnderline
                            SelectProps={{
                                sx: { padding: "0", textTransform: "capitalize" },
                                IconComponent: () => null
                            }}
                            sxStyles={{
                                padding: "6px 0 0 0"
                            }}
                        >
                            <MenuItem value={"all"}>{trans("filter.all_languages")}</MenuItem>
                            {config?.languages && config.languages.map((lang, index) => <MenuItem key={index + 1} value={lang.code}>{lang.code ? tc(`locale_switcher.${lang.code}`) : ""}</MenuItem>)}
                        </SelectField>
                        <ArrowRightIcon />
                    </Stack>
                    <Divider className="hover-opacity transition-opacity" />
                </HoverOpacityComponent>
                <Stack spacing="15px" alignItems="center" justifyContent="center" direction="row"
                    className="px-[16px] py-[24px]">
                    <div className="h-6 w-6 flex-shrink-0 my-auto">
                        <Image width="24" height="24" alt="gem" src="/images/gem.png" />
                    </div>
                    <TextField
                        name="minPrice"
                        type="text"
                        InputProps={{
                            sx: { fontSize: "16px", 'fontWeight': "400" },
                            placeholder: trans("filter.tasks_price_from"),
                            disableUnderline: true,
                            inputComponent: NumberFormat as any,
                            inputProps: {
                                min: 0,
                            },
                        }}
                        value={filters?.minPrice}
                        onChange={(e: any) => setOptions("minPrice", e.target.value)}
                        fullWidth id="price"
                        variant="standard"
                        readonly={count.loading}
                    />
                </Stack>
                <MuiDivider />
                <div className="mt-5">
                    <CustomizedRadios
                        value={filters?.orderBy as "createdAt" | "deadline" | undefined || "createdAt"}
                        onChange={(value: string) => setOptions("orderBy", value)}
                    />
                </div>
                <MuiDivider />
                {count.loading && <div className="cursor-not-allowed w-full h-full absolute top-0 left-0 opacity-40 bg-primary"></div>}
            </Shell>
        </MuiDrawer>
    )
}

export default FilterContent;
