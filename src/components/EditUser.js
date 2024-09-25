import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Select } from '@mui/material';

const EditUser = ({ user, onSave, onUndo }) => {
    const [editedUser, setEditedUser] = useState(user);
    const [isDirty, setIsDirty] = useState(false);

    useEffect(() => {
        setEditedUser(user);
    }, [user]);

    const handleChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
        setIsDirty(true);
    };

    const handleUndo = () => {
        onUndo();
        setIsDirty(false);
    };

    const handleSave = () => {
        onSave(editedUser);
        setIsDirty(false);
    };

    return (
        <div>
            <h1>Edit User</h1>
            <TextField
                name="name"
                label="Name"
                value={editedUser.name || ''}
                onChange={handleChange}
            />
            <Select
                name="department"
                value={editedUser.department || ''}
                onChange={handleChange}
            >
                {/* Add department options */}
            </Select>
            <Button onClick={handleUndo} disabled={!isDirty}>Undo</Button>
            <Button onClick={handleSave} disabled={!isDirty}>Save</Button>
        </div>
    );
};

export default EditUser;
