import { InputAdornment, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import debounce from 'lodash/debounce';
import React from 'react';

interface ImageSearchProps {
    onSearchQueryChange: (query: string | undefined) => void;
}

const DEBOUNCE_TIME = 2000;

export const ImageSearch: React.FunctionComponent<ImageSearchProps> = ({ onSearchQueryChange }) => {

    const [searchText, setSearchText] = React.useState<string>('');

    const searchQuery = React.useCallback(debounce((search) => onSearchQueryChange(search || ''), DEBOUNCE_TIME), [onSearchQueryChange]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
        searchQuery(event.target.value);
    }

    return (
        <TextField id="searchbox" label="Search" variant="standard" onChange={handleChange} value={searchText} >
            <InputAdornment position="start">
                <SearchIcon />
            </InputAdornment>
        </TextField>
    )
}