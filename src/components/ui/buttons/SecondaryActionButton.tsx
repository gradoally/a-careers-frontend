import { Button, SvgIcon } from '@mui/material';
import {NextLinkComposed} from "@/components/Link";

const SecondaryActionButton = ({to}: {to: string})=>{
    return (
        <Button to={to} component={NextLinkComposed}>
            <SvgIcon sx={{fontSize: "30px"}}>
                <svg width="22" height="43" viewBox="0 0 22 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path opacity="0.33" d="M0.505859 1L21.012 21.5061L0.505859 42.0122" stroke="white"
                          strokeWidth="0.5"/>
                </svg>

            </SvgIcon>
        </Button>
    )
}

export default SecondaryActionButton;