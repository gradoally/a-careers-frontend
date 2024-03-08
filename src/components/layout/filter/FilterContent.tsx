"use client"

import {useTranslations} from "next-intl";
import {usePathname, useRouter, useSearchParams} from "next/navigation";

import React from "react";
import {Drawer as MuiDrawer, Stack, Typography,} from '@mui/material';

import MuiDivider from "@mui/material/Divider";

import AppBar from "@/components/layout/app-bar";
import Divider from "@/components/ui/Divider";

import BackButton from "@/components/ui/buttons/BackButton";

import {useAppContext} from "@/lib/app-providers";
import ArrowRightIcon from "@/components/ui/ArrowRightIcon";
import CustomizedRadios from "@/components/layout/filter/FilterSort";
import NumberFormat from "@/components/forms/fields/NumberFormat";
import TextField from "@/components/forms/fields/TextField";
import Image from "@/components/Image";
import SelectField from "@/components/forms/fields/SelectField";
import MenuItem from "@mui/material/MenuItem";
import HoverOpacityComponent from "@/components/ui/HoverOpacityComponent";
import Shell from "@/components/layout/Shell";

const FilterContent = () => {
    const {isFilterOpen, toggleFilter} = useAppContext()
    const trans = useTranslations("filter");
    const [filters, setFilters] = React.useState<Record<string, string>>({})
    const router = useRouter()
    const pathname = usePathname();
    const searchParams = useSearchParams();

    React.useEffect(() => {
        const price = searchParams.get("price") ?? ""
        const orderBy = searchParams.get("orderBy")
        const language = searchParams.get("language")
        const category = searchParams.get("category")
        const params: Record<string, string> = {}
        if (orderBy !== null && !["createdAt", "deadline"].includes(orderBy as string)) {
            params["orderBy"] = orderBy
        }
        if (price) {
            params["price"] = price
        }
        if (language) {
            params["language"] = language
        }
        if (category) {
            params["category"] = category
        }
        setFilters(params)
    }, [])

    const setOptions = (key: "price" | "orderBy" | "language" | "category", value: string) => {
        const options = {
            ...filters,
            [key]: value
        }
        setFilters(options)
    }

    const handleBack = () => {
        toggleFilter(false)
        const params = new URLSearchParams(filters)

        router.replace(`${pathname}?${params.toString()}`);
    }

    const header = (

        <AppBar padding="15px" height="60px">
            <Stack direction="row" alignItems="center" spacing={1}>
                <BackButton onClick={handleBack}/>
                <Typography variant="h5" color="info.main">{trans("filters")}</Typography>
            </Stack>
        </AppBar>
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

            <Shell header={header}>

                <HoverOpacityComponent>
                    <Stack spacing="15px" alignItems="center" justifyContent="center" direction="row"
                           className="h-20 px-[15px]">
                        <div className="h-6 w-6 flex-shrink-0">
                            <Image style={{width: "24px", height: "24px"}} width="24" height="24" alt="puzzle-piece"
                                   src="/images/puzzle-piece.svg"/>
                        </div>
                        <SelectField variant="standard"
                                     label={trans("categories")}
                                     id="category"
                                     name="category"
                                     value={filters?.category ?? "all"}
                                     disableUnderline
                                     onChange={(e) => setOptions("category", e.target.value)}

                                     SelectProps={{
                                         sx: {padding: "0"},
                                         IconComponent: () => null
                                     }}
                        >
                            <MenuItem value={"all"}>{trans("all")}</MenuItem>
                        </SelectField>
                        <ArrowRightIcon/>
                    </Stack>
                    <Divider className="hover-opacity transition-opacity"/>
                </HoverOpacityComponent>
                <HoverOpacityComponent>
                    <Stack spacing="15px" alignItems="center" justifyContent="center" direction="row"
                           className="h-20 px-[15px]">
                        <div className="h-6 w-6 flex-shrink-0">
                            <Image style={{width: "24px", height: "24px"}} width="24" height="24" alt="earth"
                                   src="/images/earth_americas.png"/>
                        </div>
                        <SelectField variant="standard"
                                     label={trans("show_tasks_on_language")}
                                     id="language"
                                     name="language"
                                     value={filters?.language ?? "all"}
                                     onChange={(e) => setOptions("language", e.target.value)}
                                     disableUnderline
                                     SelectProps={{
                                         sx: {padding: "0"},
                                         IconComponent: () => null
                                     }}
                        >
                            <MenuItem value={"all"}>{trans("all_languages")}</MenuItem>
                            <MenuItem value={"ru"}>Русский</MenuItem>
                            <MenuItem value={"en"}>English</MenuItem>
                        </SelectField>
                        <ArrowRightIcon/>
                    </Stack>
                    <Divider className="hover-opacity transition-opacity"/>
                </HoverOpacityComponent>
                <Stack spacing="15px" alignItems="center" justifyContent="center" direction="row"
                       className="h-20 px-[15px]">
                    <div className="h-6 w-6 flex-shrink-0">
                        <Image width="24" height="24" alt="gem" src="/images/gem.png"/>
                    </div>
                    <TextField
                        name="price"
                        type="text"
                        InputProps={{
                            sx: {fontSize: "16px", 'fontWeight': "400"},
                            placeholder: trans("tasks_price_from"),
                            disableUnderline: true,
                            inputComponent: NumberFormat as any,
                            inputProps: {
                                min: 0,
                            },
                        }}
                        value={filters?.price}
                        onChange={(e: any) => setOptions("price", e.target.value)}
                        fullWidth id="price"
                        variant="standard"/>
                </Stack>
                <MuiDivider/>
                <div className="mt-5">
                    <CustomizedRadios
                        value={filters?.orderBy as "createdAt" | "deadline" | undefined}
                        onChange={(value: string) => setOptions("orderBy", value)}/>
                </div>
                <MuiDivider/>
            </Shell>
        </MuiDrawer>
    )
}

export default FilterContent;
