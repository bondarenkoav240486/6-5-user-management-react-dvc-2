import React, {
    useState
} from 'react';
import {
    Select,
    MenuItem,
    FormControl,
    Checkbox,
    ListItemText,
    TextField,
    InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const MultiSelectWithSearch = ({ items, label, selectedValues, onChange, disabled }) => {
    const [searchQuery, setSearchQuery] = useState('');

    // Фільтруємо елементи на основі пошукового запиту
    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Обрані елементи
    const selectedItems = items.filter(item => selectedValues.includes(item.value));
    // Необрані елементи, що відповідають пошуковому запиту
    const unselectedFilteredItems = filteredItems.filter(item => !selectedValues.includes(item.value));

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <FormControl style={{ marginRight: 16, minWidth: 200 }} disabled={disabled}
            className="MultiSelectWithSearch"
        >
            <TextField
                className='search'
                placeholder={`${label}`}
                variant="outlined"
                size="small"
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                style={{ marginBottom: 10 }}
                disabled={disabled}
            />
            <Select
                className='multiselect'
                multiple
                value={selectedValues}
                onChange={onChange}
                // renderValue={(selected) => selected.join(', ')}
                renderValue={() => ''}
                MenuProps={{
                    PaperProps: {
                        style: {
                            maxHeight: 200,
                            width: 250,
                        },
                    },
                }}
            >
                {/* Відображаємо обрані елементи зверху */}
                {selectedItems.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        <Checkbox checked={selectedValues.includes(item.value)} />
                        <ListItemText primary={item.name} />
                    </MenuItem>
                ))}

                {/* Відображаємо елементи, що відповідають пошуку, знизу */}
                {unselectedFilteredItems.map((item) => (
                    <MenuItem key={item.value} value={item.value}>
                        <Checkbox checked={selectedValues.includes(item.value)} />
                        <ListItemText primary={item.name} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
};

export default MultiSelectWithSearch;
