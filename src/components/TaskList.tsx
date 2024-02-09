import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Divider from "@/components/ui/Divider";
import Link from "@/components/Link";
import NoResponsesChip from "@/components/NoResponsesChip";

interface DataType {
    title: string;
    date: string;
    diamonds: number;
    proposals: number;
}

const TaskList = ({data}: {data: DataType[]})=>{
    return (
        <Stack spacing={"15px"}
               divider={<Divider/>}>
            {data.map((e, i) => {
                return (
                    <div
                        key={i}>
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
                        {e.proposals === 0 && <NoResponsesChip/>}
                    </div>
                )
            })}
        </Stack>
    )
}

export default TaskList;