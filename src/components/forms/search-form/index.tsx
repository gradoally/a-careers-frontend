import {StyledInput} from "./styled";

const SearchForm = ({text}: { text: string }) => {
    return (
        <form>
            <StyledInput placeholder={text}/>
        </form>
    )
}

export default SearchForm;