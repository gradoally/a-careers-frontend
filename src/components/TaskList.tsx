import React from "react";

import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import Divider from "@/components/ui/Divider";
import Link from "@/components/Link";
import StatusChip from "@/components/StatusChip";

interface DataType {
    title: string;
    date: string;
    diamonds: number;
    proposals: number;
}

const TaskList = ({data, link}: {data: DataType[], link: string})=>{
    return (
        <Stack spacing={"15px"} divider={<Divider/>}>
            {data.map((e, i) => {
                return (
                    <div
                        key={i}>
                        <Link href={link} noLinkStyle>
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
                        {e.proposals === 0 && <StatusChip status={"no_responses"}/>}
                    </div>
                )
            })}
        </Stack>
    )
}

export default TaskList;
