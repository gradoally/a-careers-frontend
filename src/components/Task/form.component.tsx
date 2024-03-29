import { Typography, Button } from "@mui/material";

interface ITaskFormWrapperProps extends React.PropsWithChildren {
    title: string;
    description?: string;
}

interface ISelectorProps {
    isSelected:boolean;
    select:() => void;
    name:string;
    value:string;
}

export function TaskFormWrapper(props: ITaskFormWrapperProps) {
    return <div className="w-full px-5 py-6">
        <Typography className="!font-InterBold !text-[16px] !leading-none">{props.title}</Typography>
        {props.description && <Typography variant="caption" component="div" sx={{ marginTop: "18px",marginBottom:"12px" }}>{props.description}</Typography>}
        {props.children}
    </div>
}

export function Selector(props:ISelectorProps) {
    return <Button
    variant="outlined"
    component="div" 
    color="secondary" key={props.name}
    className={"!p-[16px] rounded-[5px]"}
    sx={{
        borderColor: props.isSelected ? "common.white" : "secondary.main",
        color: props.isSelected ? "common.white" : "secondary.main"
    }}
    onClick={props.select}
>
    <Typography className="w-full !font-InterRegular !text-[12px] leading-[20px]" component="div">
        {props.name}
    </Typography>
</Button>
}