import IconButton, {IconButtonProps} from "@mui/material/IconButton";
import ReplyIcon from '@mui/icons-material/Reply';

interface Props extends IconButtonProps {
    to?: string
}

const BackButton = ({children,...props}: Props) => {
    return (
            <IconButton aria-label="back"
                    sx={{
                        width: "30px",
                        height: "30px",
                        bgcolor: "info.main",
                        color: "primary.main"
                    }}
                        {...props}
            >
                <ReplyIcon/> {children}
            </IconButton>
    )
}

export default BackButton;
