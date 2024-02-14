import {useTranslations} from "next-intl";
import {TaskCreateType} from "./stepper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {StyledInput} from "./styled";


const Description = ({data}: { data: TaskCreateType }) => {
    const t = useTranslations('tasks')
    const handleChange = (event: any) => {

    };
    return (
        <div className="h-full flex flex-col">
            <Stack className="p-[20px] mb-4" component="div" spacing="20px" direction="column">
                <Typography variant="h4">Описание задания</Typography>
                <Typography variant="caption">
                    Добавьте подробное описание задания, чтобы получить больше откликов
                </Typography>
            </Stack>
            <div className="flex-grow">
                    <StyledInput
                        fullWidth
                        multiline
                        inputProps={{style: {height: "100%"}}}
                        id="description"
                        value="Необходимо доработать смарт-контракт таким образом, что бы при деплое он хранил ссылку на одни метаданные, а после передачи собственности с кошелька владельца метаданные менялись на другие. Изначально элементы коллекции должны быть скрыты (по аналогии с лутбоксом). После продажи на маркетплейсе у владельца должен появиться"
                        name="description"/>
            </div>
        </div>
    )
}

export default Description;