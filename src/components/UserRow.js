import React from 'react';
import { Box, Button } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';

const UserRow = ({ user, onDelete }) => {
    const handleDelete = () => {
        onDelete(user.id);  // Викликаємо функцію видалення користувача за його ID
    };

    return (
        <Box
            className="UserRow"
        >
            <Box className="full_name td">{user.name}</Box>
            <Box className="Department td">{user.department.name}</Box>
            <Box className="Country td">{user.country.name}</Box>
            <Box className="Status td">{user.status.name}</Box>
            <Box className="Actions td">
                <Button onClick={handleDelete} variant="outlined" color="secondary">
                    {/* <DeleteIcon /> */}
                </Button>
            </Box>
        </Box>
    );
};

export default UserRow;
