import IconButton, {IconButtonProps} from "@mui/material/IconButton";
import EditRoundedIcon from '@mui/icons-material/EditRounded';


interface Props extends IconButtonProps {
    to?: string
}

const EditButton = ({children, ...props}: Props) => {
    return (
        <IconButton aria-label="add"
                    className="h-[30px] w-[30px] p-0"
                    color="primary"
                    sx={{
                        backgroundColor: "info.main",
                        "&:hover": {backgroundColor: "info.main"},
                        "&:focus": {backgroundColor: "info.main"}
                    }}
                    {...props}
        >
            <EditRoundedIcon/>
        </IconButton>
    )
}

export default EditButton;