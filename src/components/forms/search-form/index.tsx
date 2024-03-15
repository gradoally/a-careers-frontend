import {StyledInput} from "./styled";

const SearchForm = ({text}: { text: string }) => {
    return (
        <form className="!w-full">
            <StyledInput className="w-full" placeholder={text}/>
        </form>
    )
}

export default SearchForm;