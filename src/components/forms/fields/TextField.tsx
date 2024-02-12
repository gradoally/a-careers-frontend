import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Divider from "@/components/ui/Divider";

interface Props {
    withDivider?: boolean;
    name: string
    id: string
    label?: string
    value?: string;
    defaultValue?: string;
    helperText?: string;
    multiline?: boolean;
    fullWidth?: boolean;
    /**
     * The variant to use.
     * @default 'outlined'
     */
    variant?: 'standard' | 'outlined' | 'filled';
}


const TextField = (props: Props) => {
    return (
        <FormControl fullWidth variant={props.variant}>
            {props.label && (
                <InputLabel sx={{color: "common.white"}} htmlFor={props.id}>
                    <Typography variant="caption">{props.label}</Typography>
                </InputLabel>
            )}
            <Input sx={{
                fontSize: "12px",
                fontWeight: "400",
            }} multiline={props.multiline} value={props.value} defaultValue={props.defaultValue} id={props.id}
                   name={props.name}/>
            {props.withDivider && <Divider/>}
            {props.helperText && <FormHelperText id="component-text">{props.helperText}</FormHelperText>}
        </FormControl>
    )
}

export default TextField;
