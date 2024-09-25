import React from 'react';
import {
    Paper, Box
} from '@mui/material';
import UserRow from './UserRow';

const Users = ({ users, onDelete }) => {
    return (
        <div>
            <Paper className="Users">
                <Box
                    className="users_head UserRow"
                >
                    <Box className="full_name th">Full Name</Box>
                    <Box className="Department th">Department</Box>
                    <Box className="Country th">Country</Box>
                    <Box className="Status th">Status</Box>
                    <Box className="Actions th">
                        {/* Actions */}
                    </Box>
                </Box>
                {users.map(user => (
                    <UserRow key={user.id} user={user} onDelete={onDelete} />
                ))}
            </Paper>
        </div>
    );
};

export default Users;
