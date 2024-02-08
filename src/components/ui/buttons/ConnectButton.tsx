import Button from '@mui/material/Button';


const ConnectButton = ({text}: {text: string})=>{
    return (
        <Button sx={{
            height: "30px",
            borderRadius: "25px",
            padding: "5px 12px 6px 14px",
            // backgroundColor: "secondary.main",
            color: "common.black",
            fontWeight: "600",
            fontSize: "16px",
            "width": "146px",
        }}  color="secondary" variant="contained">
            {text}
        </Button>
    )
}

export default ConnectButton;