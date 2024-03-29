import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import React from "react";


const TaskListSkeleton = () => {
    return (
        <Stack spacing="3px">
            <Typography component="div" variant="h6">
                <Skeleton/>
            </Typography>
            <Typography component="div" variant={"caption"}>
                <Skeleton/>
            </Typography>

            <Typography component="div" variant={"body2"}>
                <Skeleton/>
            </Typography>
            <Skeleton variant="rounded" width={"75px"} height={"14px"}/>
        </Stack>
    )
}

export default TaskListSkeleton;