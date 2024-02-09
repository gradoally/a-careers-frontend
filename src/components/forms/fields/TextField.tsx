
import Typography from '@mui/material/Typography';
import {TextFieldProps} from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';

interface Props {
    id: string

}
const TextField = (props: TextFieldProps) => {
    return (
        <FormControl fullWidth variant="standard">
            <InputLabel color="primary" id={props.id} htmlFor={props.id}>
                <Typography variant="caption">{props.label}</Typography>
            </InputLabel>
            <Input id={props.id} name={props.name}/>
            {/*<FormHelperText id="component-error-text">Error</FormHelperText>*/}
        </FormControl>
    )
}

export default TextField;
