"use client"
import React from "react";
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import {styled} from '@mui/material/styles';

import Chip from '@mui/material/Chip';
import Divider from "@/components/ui/Divider";
import Link from "@/components/Link";

function generate() {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => {
        console.log(value === 0 ? 0 : value % 2)
        return (
            {
                "title": "Доработать мета-данные и память смарт-контракта для крутого заказа",
                "date": "Сегодня, 21:00 – 20 июня, 15:00",
                "proposals": value === 0 ? 0 : value % 2,
                "diamonds": 1225,
            }
        )
    });
}

const data = [
    {
        "title": "Доработать мета-данные и память смарт-контракта для крутого заказа",
        "date": "Сегодня, 21:00 – 20 июня, 15:00",
        "proposals": 1,
        "diamonds": 1225,
    },

    {
        "title": "Заминтить коллекцию тамагочи NFT",
        "date": "10 июня, 21:00 – 20 июня, 15:00",
        "proposals": 0,
        "diamonds": 100500,
    },
    {
        "title": "Расширение редактируемого стандарта NFT",
        "date": "12 июня, 9:00 – 3 августа, 21:00",
        "proposals": 1,
        "diamonds": 567,
    },
    {
        "title": "Разработка TDA фриланс-биржи (часть II)",
        "date": "10 июня, 21:00 – 20 июня, 15:00",
        "proposals": 1,
        "diamonds": 777,
    },
    {
        "title": "Заминтить коллекцию тамагочи NFT",
        "date": "10 июня, 21:00 – 20 июня, 15:00",
        "proposals": 0,
        "diamonds": 100500,
    },
    {
        "title": "Extend Editable NFT Standard (add features)",
        "date": "12 июня, 9:00 – 3 августа, 21:00",
        "proposals": 1,
        "diamonds": 567,
    },
    {
        "title": "Доработать мета-данные и память смарт-контракта для крутого заказа",
        "date": "12 июня, 9:00 – 3 августа, 21:00",
        "proposals": 1,
        "diamonds": 1225,
    },
    {
        "title": "Доработать мета-данные и память смарт-контракта для крутого заказа",
        "date": "12 июня, 9:00 – 3 августа, 21:00",
        "proposals": 1,
        "diamonds": 1225,
    },
]


const Items = ({messages}: { messages: { no_responses: string } }) => {

    return (
        <Stack spacing={0}
               divider={<Divider/>}
        >
            {data.map((e, i) => {
                return (
                    <div style={{padding: "15px 0 14px 0"}} key={i}>
                        <Link href={"/tasks/1"} noLinkStyle>
                        <Typography variant="h6" >
                            {e.title}
                        </Typography>
                        </Link>
                        <Typography sx={{fontSize: "10px", lineHeight: "15px"}} variant="caption">
                            {e.date}
                        </Typography>
                        <Typography variant="body2" sx={{ lineHeight: "none", fontSize: "12px"}}>
                            💎 {e.diamonds}
                        </Typography>
                        {e.proposals === 0 && (
                            <Box component="div" sx={{
                                maxWidth: "67px",
                                color: "warning.main",
                                height: "14px",
                                padding: "3px 0 0 3px",
                                margin: "5px 0",
                                borderRadius: "2px",
                                border: "0.5px solid #00FF47",
                                fontSize: "8px",
                                fontWeight: 400,
                                lineHeight: "8px",
                                letterSpacing: "0.06em",
                            }}>
                                {messages.no_responses}
                            </Box>
                        )}
                    </div>
                )
            })}
        </Stack>
    )
}


export default Items;
