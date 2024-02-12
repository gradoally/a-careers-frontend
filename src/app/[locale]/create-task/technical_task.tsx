import {useTranslations} from "next-intl";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import {StyledInput} from "./styled";
import {TaskCreateType} from "./stepper";


const TechnicalTask = ({data}: { data: TaskCreateType }) => {
    const t = useTranslations('tasks')
    const handleChange = (event: any) => {

    };
    return (
        <div className="h-full flex flex-col">
            <Stack className="p-[20px] mb-4" component="div" spacing="20px" direction="column">
                <Typography variant="h4">Техническое задание</Typography>
                <Typography variant="caption">
                    Добавьте техническое задание. Для хранения файлов используйте TON Byte.
                </Typography>
            </Stack>

            <div className="flex-grow">
                <StyledInput
                    fullWidth
                    inputProps={{style: {height: "100%"}}}
                    multiline id="technical_task"
                    value="Необходимо доработать смарт-контракт таким образом, что бы при деплое он хранил ссылку на одни метаданные, а после передачи собственности с кошелька владельца метаданные менялись на другие. Изначально элементы коллекции должны быть скрыты (по аналогии с лутбоксом). После продажи на маркетплейсе у владельца должен появиться"
                    name="technical_task"/>
            </div>
        </div>
    )
}

export default TechnicalTask;