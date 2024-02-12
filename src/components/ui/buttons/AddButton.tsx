import IconButton, {IconButtonProps} from "@mui/material/IconButton";
import AddRoundedIcon from '@mui/icons-material/AddRounded';


interface Props extends IconButtonProps {
    to?: string
}

const AddButton = ({children, ...props}: Props) => {
    return (
        <IconButton aria-label="add"
                    className="h-[25px] w-[25px] p-0"
                    color="primary"
                    sx={{
                        backgroundColor: "secondary.main",
                        "&:hover": {backgroundColor: "secondary.main"},
                        "&:focus": {backgroundColor: "secondary.main"}
                    }}
                    {...props}
        >
            <AddRoundedIcon/>
        </IconButton>
    )
}

export default AddButton;