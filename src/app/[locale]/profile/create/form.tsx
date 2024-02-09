import Typography from '@mui/material/Typography';

import IconButton from '@mui/material/IconButton';

import AddIcon from '@mui/icons-material/Add';
import BaseForm from "@/components/forms/BaseForm";
import TextField from "@/components/forms/fields/TextField";
import Divider from "@/components/ui/Divider";

const Form = () => {
    return (
        <BaseForm noValidate>
            <div>
                <Typography className="">Telegram</Typography>
                <TextField fullWidth id="username" label="Standard" variant="standard"/>
                <Divider/>
                <TextField fullWidth id="nickname" label="Standard" variant="standard"/>
                <Divider/>
                <TextField fullWidth id="about" label="Standard" variant="standard"/>
                <Divider/>
            </div>
            <div>
                <Typography  className="">Профиль фрилансера</Typography>
                <Typography  className="">Заполните, если планируете делать отклики</Typography>

                <TextField fullWidth id="link_to_website" label="Ссылка на сайт (необязательно)" variant="standard"/>
                <Divider/>
                <TextField fullWidth id="link_to_portfolio" label="Ссылка на портфолио (необязательно)"
                           variant="standard"/>
                <Divider/>
                <TextField fullWidth id="resume" label="Резюме (необязательно)" variant="standard"/>
                <Divider/>
                <Typography variant="caption">Специализация (необязательно)</Typography>
                <IconButton aria-label="add">
                    <AddIcon />
                </IconButton>
            </div>
        </BaseForm>
    )
}

export default Form;