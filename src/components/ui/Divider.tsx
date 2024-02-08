import MuiDivider from '@mui/material/Divider';

const Divider = ()=>{
    return (
        <MuiDivider sx={{
            background: "var(--divider-gradient)",
            height: "1px",
            opacity: "30%",
            border: 'none',
        }} orientation="horizontal" flexItem/>
    )
}

export default Divider;