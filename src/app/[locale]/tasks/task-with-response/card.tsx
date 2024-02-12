import React from 'react';
import clsx from "clsx";

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {red} from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from "@/components/Link";


export default function ResponseCard({isSelected}: { isSelected?: boolean }) {

    return (
        <Card
            // className={
            //     clsx(isSelected ? "bg-secondary" : "bg-info")
            // }
            sx={{
                bgcolor: isSelected?"secondary.main":"info.main",
                color: isSelected?"common.black":"common.white",
                width: "335px",
                // height: "170px",
                // borderRadius: "44px, 0px, 13px, 21px"
                borderTopLeftRadius: "44px",
                // "borderTopRightRadius": "0",
                borderBottomLeftRadius: "21px",
                borderBottomRightRadius: "13px"
            }}>
            <CardHeader
                avatar={
                    <Avatar   sx={{height: "70px", width: "70px"}} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <Typography variant="caption">
                        <Link className="underline" noLinkStyle href={"/profile"}>
                            Профиль 📖
                        </Link>
                    </Typography>
                }
                title="@some_dao"
                subheader="Студия блокчейн-разработки"
                subheaderTypographyProps={{
                    // className: "text-[9px]",
                    sx: {color: isSelected?"common.black":"common.white", fontSize: "9px"}
                }}
                className="border-b-[1px] border-primary"
                // sx={{borderBottom: "1px solid #000015"}}
            />
            <CardContent>
                <div className="text-[9px]">
                    Сделал три аналогичных проекта, готов пообщаться.
                </div>
                <div className="text-sm mt-2">
                    Оффер: 💎 1 777
                </div>
            </CardContent>
        </Card>
    );
}
