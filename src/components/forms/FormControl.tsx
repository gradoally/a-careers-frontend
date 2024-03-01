import MuiFormControl, {FormControlProps} from '@mui/material/FormControl';


const FormControl = ({children, fullWidth=true, variant="standard", ...props}: FormControlProps)=>{
    return (
        <MuiFormControl
            sx={{
                "&:hover": {
                    "& .hover-opacity": {
                        "opacity": "100%",
                    }
                },
                "& .MuiInputLabel-formControl": {
                    color: "rgba(255, 255, 255, 0.33)",
                    '&.Mui-focused': {
                        color: "rgba(255, 255, 255, 0.33)"
                    }
                }
            }} variant={variant} fullWidth={fullWidth} {...props}>
            {children}
        </MuiFormControl>
    )
}
export default FormControl;