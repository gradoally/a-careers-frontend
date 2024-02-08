import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';


const CloseButton = ({ onClick }: { onClick?: () => void }) => {
    return (
        <IconButton onClick={onClick} aria-label="close"
            sx={{ width: "30px", height: "30px", bgcolor: "info.main", color: "primary.main" }}>
            <CloseIcon />
        </IconButton>
    )
}

export default CloseButton;