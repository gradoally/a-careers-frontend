import React from 'react';
import Image, { StaticImageData } from 'next/image';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Link from "@/components/Link";
import { useTranslations } from 'next-intl';
import { UserResponse } from '@/openapi/client';

import DaimondIcon from "@/assets/DaimondProfile.svg";

interface IResponseCardProps {
    response: UserResponse;
    isSelected: boolean;
    select: () => void;
}

export default function ResponseCard({ isSelected, response, select }: IResponseCardProps) {
    const trans = useTranslations();
    return (
        <Card
            sx={{
                bgcolor: isSelected ? "secondary.main" : "info.main",
                color: isSelected ? "common.black" : "common.white",
                width: "100%",
                borderTopLeftRadius: "44px",
                borderBottomLeftRadius: "21px",
                borderBottomRightRadius: "13px"
            }}>
            <CardHeader
                onClick={select}
                avatar={
                    <Image src={DaimondIcon} alt={response.freelancer?.nickname || ""} width={71} height={71} className='aspect-square' />
                }
                action={
                    <Typography variant="caption">
                        <Link className="!font-InterRegular border-b pb-[2px] text-[10px] border-[#fffff] mb-2" noLinkStyle href={"/profile"}>
                            {trans("response.profile")} 📖
                        </Link>
                    </Typography>
                }
                title={<div>
                    <span className='!font-InterBold !text-[12px] mr-2'>@{response.freelancer?.nickname || ""}</span>
                    <span className='!font-InterRegular !text-[12px]'>✅ 2 ❎ 1</span>
                </div>}
                subheader={
                    <p className='!font-InterRegular text-[9.5px] mt-1'>{response.freelancer?.specialization || ""}</p>
                }
                subheaderTypographyProps={{
                    sx: { color: isSelected ? "common.black" : "common.white", fontSize: "9px" }
                }}
                className="border-b-[1px] border-primary"
            />
            <CardContent onClick={select}>
                <p className='!font-InterRegular text-[9.5px] mb-2'> {response.text}</p>
                <div className="!text-[12px] !font-InterRegular">
                    {trans('response.offer')}: 💎 {response.price}
                </div>
                <div className={`w-[21px] h-[21px] ml-auto -mb-3 rounded-full ${isSelected ? "bg-transparent" : "bg-[#000015]"}`}></div>
            </CardContent>
        </Card>
    );
}
