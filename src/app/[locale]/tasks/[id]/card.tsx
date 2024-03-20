import React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Link from "@/components/Link";
import { useTranslations } from 'next-intl';

export default function ResponseCard({ isSelected }: { isSelected?: boolean }) {
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
                    <Avatar sx={{ height: "70px", width: "70px" }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <Typography variant="caption">
                        <Link className="underline" noLinkStyle href={"/profile"}>
                            {trans("response.profile")} 📖
                        </Link>
                    </Typography>
                }
                title={`@some_dao  ✅ 2 ❎ 1`}
                subheader="Студия блокчейн-разработки"
                subheaderTypographyProps={{
                    sx: { color: isSelected ? "common.black" : "common.white", fontSize: "9px" }
                }}
                className="border-b-[1px] border-primary"
            />
            <CardContent>
                <div className="text-[9px]">
                    Сделал три аналогичных проекта, готов пообщаться.
                </div>
                <div className="text-sm mt-2">
                    {trans('response.offer')}: 💎 1 777
                </div>
                {!isSelected && <div className='w-[21px] h-[21px] ml-auto -mb-3 rounded-full bg-[#000015]'></div>}
            </CardContent>
        </Card>
    );
}
