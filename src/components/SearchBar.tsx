import { TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  searchText: string | null;
  setSearchText: React.Dispatch<React.SetStateAction<string | null>>;
}
export function SearchBar({ searchText, setSearchText }: SearchBarProps)
{
    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        setSearchText(event.target.value);
    };
    const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const inputElement = document.getElementById('search-field') as HTMLInputElement;
        console.log(inputElement.value);
        setSearchText(inputElement.value);
    };
    
  return (
    <form onSubmit={handleSearchSubmit}>
      <TextField
        id="search-field"
        label="Search by title"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={handleSearchInputChange}
        InputProps={{
            endAdornment: (
              <SearchIcon />
            ),
        }}
      />
    </form>
  );
}