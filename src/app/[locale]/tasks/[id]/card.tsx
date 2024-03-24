import React from 'react';
import Image, { StaticImageData } from 'next/image';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from "@/components/Link";
import { useTranslations } from 'next-intl';

export interface IResponse {
    profile: StaticImageData;
    nickname: string;
    offerPrice: number;
    specialization: string;
    description: string;
}

interface IResponseCardProps {
    response: IResponse;
    isSelected: boolean;
}

export default function ResponseCard({ isSelected, response }: IResponseCardProps) {
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
                avatar={
                    <Image src={response.profile} alt={response.nickname} width={71} height={71} className='aspect-square' />
                }
                action={
                    <Typography variant="caption">
                        <Link className="border-b pb-[2px] text-[10px] border-[#fffff] mb-2" noLinkStyle href={"/profile"}>
                            {trans("response.profile")} 📖
                        </Link>
                    </Typography>
                }
                title={<div>
                    <span className='!font-InterBold !text-[12px] mr-2'>@{response.nickname}</span>
                    <span className='!font-InterLight !text-[12px]'>✅ 2 ❎ 1</span>
                </div>}
                subheader={
                    <p className='!font-InterLight text-[9px] mt-1'>{response.specialization}</p>
                }
                subheaderTypographyProps={{
                    sx: { color: isSelected ? "common.black" : "common.white", fontSize: "9px" }
                }}
                className="border-b-[1px] border-primary"
            />
            <CardContent>
                <p className='!font-InterLight text-[9px] mb-2'> {response.description}</p>
                <div className="!text-[12px] !font-InterRegular">
                    {trans('response.offer')}: 💎 {response.offerPrice}
                </div>
                {!isSelected && <div className='w-[21px] h-[21px] ml-auto -mb-3 rounded-full bg-[#000015]'></div>}
            </CardContent>
        </Card>
    );
}
