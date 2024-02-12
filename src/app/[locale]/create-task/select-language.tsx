import {useTranslations} from "next-intl";

import Typography  from "@mui/material/Typography";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Divider from "@/components/ui/Divider";

import {TaskCreateType} from "./stepper";


const SelectLanguage = ({data}: {data: TaskCreateType})=>{
    const t = useTranslations('tasks')
    const handleChange = (event: SelectChangeEvent) => {

    };
    return (
        <Stack className="p-[20px]" component="div" spacing="20px" direction="column">
            <Typography variant="h4">{t("select_language")}</Typography>
            <Typography variant="caption">{t("language")}</Typography>

            <FormControl component="div" fullWidth>

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={"ru"}
                    // label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={"ru"}>Русский</MenuItem>
                    <MenuItem value={"en"}>English</MenuItem>
                </Select>
                <Divider/>
            </FormControl>

        </Stack>
    )
}

export default SelectLanguage;