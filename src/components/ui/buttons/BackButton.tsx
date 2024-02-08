import {IconButton} from "@mui/material";
import ReplyIcon from '@mui/icons-material/Reply';

import Avatar from '@mui/material/Avatar';

const BackButton = ({onClick}: { onClick?: () => void }) => {
    return (
            <IconButton onClick={onClick} aria-label="back"
                    sx={{
                        width: "30px",
                        height: "30px",
                        bgcolor: "info.main",
                        color: "primary.main"
                    }}>
                <ReplyIcon/>
            </IconButton>
    )
}

export default BackButton;