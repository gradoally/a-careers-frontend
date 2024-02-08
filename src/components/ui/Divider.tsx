import MuiDivider from '@mui/material/Divider';

const Divider = ()=>{
    return (
        <MuiDivider sx={{
            // background: 'linear-gradient(to right, #ff0000, #00ff00)',
            // background: "divider",
            background: "linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 48.96%, rgba(255, 255, 255, 0) 100%)",
            height: "1px",
            opacity: "30%",
            border: 'none',
        }} orientation="horizontal" flexItem/>
    )
}

export default Divider;