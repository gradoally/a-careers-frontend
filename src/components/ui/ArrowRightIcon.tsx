import {SvgIcon} from "@mui/material";

const ArrowRightIcon = ()=>{
    return (
        <SvgIcon className="hover-opacity transition-opacity" sx={{fontSize: "40px", opacity: "33%"}}>
            <svg width="22" height="43" viewBox="0 0 22 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.505859 1L21.012 21.5061L0.505859 42.0122" stroke="white"
                      strokeWidth="0.5"/>
            </svg>
        </SvgIcon>
    )
}

export default ArrowRightIcon;
