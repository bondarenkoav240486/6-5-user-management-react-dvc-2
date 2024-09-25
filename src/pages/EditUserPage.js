import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, updateUser } from '../features/userSlice';
import { Button, MenuItem, TextField, FormControl, InputLabel, Select } from '@mui/material';
import departmentsData from '../data/departments.json';
import countriesData from '../data/countries.json';
import statusesData from '../data/statyses.json';

const EditUserPage = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);
    const selectedUser = useSelector((state) => state.user.selectedUser);
    const [departments, setDepartments] = useState(departmentsData);
    const [countries, setCountries] = useState(countriesData);
    const [statuses, setStatuses] = useState(statusesData);
    const [editedUser, setEditedUser] = useState(null);
    const [originalUser, setOriginalUser] = useState(null);
    const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
        if (selectedUser) {
            const initialUser = {
                ...selectedUser,
                department: selectedUser.department.value,
                country: selectedUser.country.value,
                status: selectedUser.status.value
            };
            setEditedUser(initialUser);
            setOriginalUser(initialUser);
            setIsChanged(false); // Reset change status when user is selected
        }
    }, [selectedUser]);

    useEffect(() => {
        if (editedUser && originalUser) {
            const hasChanges = JSON.stringify(editedUser) !== JSON.stringify(originalUser);
            setIsChanged(hasChanges);
        }
    }, [editedUser]);

    const handleChange = (e) => {
        setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        if (editedUser) {
            const updatedUser = {
                ...editedUser,
                status: {
                    name: statuses.find(status => status.value === editedUser.status)?.name || 'Unknown',
                    value: editedUser.status
                },
                department: {
                    name: departments.find(dept => dept.value === editedUser.department)?.name || 'Unknown',
                    value: editedUser.department
                },
                country: {
                    name: countries.find(country => country.value === editedUser.country)?.name || 'Unknown',
                    value: editedUser.country
                }
            };
            dispatch(updateUser(updatedUser));
            setOriginalUser(updatedUser); // Update the original user after save
            setIsChanged(false); // Reset change status after save
        }
    };

    const handleUndo = () => {
        setEditedUser(originalUser);
        setIsChanged(false); // Reset change status after undo
    };

    const isSaveDisabled = !isChanged || !editedUser.name || !editedUser.department || !editedUser.country || !editedUser.status;

    return (
        <div
            className='container ceneter EditUsersPage'
        >
            <h2>Edit User</h2>
            <FormControl fullWidth margin="normal"
                className='user_FormControl owner'
            >
                <InputLabel>User</InputLabel>
                <Select
                    className='user_select'
                    value={selectedUser ? selectedUser.id : ''}
                    onChange={(e) => dispatch(selectUser(users.find(user => user.id === e.target.value)))}
                >
                    {users.map(user => (
                        <MenuItem key={user.id} value={user.id}>
                            {user.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            {editedUser && (
                <div
                    className="company_info"
                >
                    <h3
                        className='subtitle'
                    >
                        User Information
                    </h3>
                    <div
                        className="row"
                    >
                        <TextField
                            name="name"
                            label="Name"
                            value={editedUser.name}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            name="department"
                            label="Department"
                            select
                            value={editedUser.department}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        >
                            {departments.map((dept) => (
                                <MenuItem key={dept.value} value={dept.value}>
                                    {dept.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>
                    <div
                        className="row second"
                    >
                        <TextField
                            name="country"
                            label="Country"
                            select
                            value={editedUser.country}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        >
                            {countries.map((country) => (
                                <MenuItem key={country.value} value={country.value}>
                                    {country.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            name="status"
                            label="Status"
                            select
                            value={editedUser.status}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                        >
                            {statuses.map((status) => (
                                <MenuItem key={status.value} value={status.value}>
                                    {status.name}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div
                        className='buttons'
                    >
                        {isChanged && (
                            <Button
                                className='undo'
                                onClick={handleUndo} variant="outlined" color="secondary">
                                Undo
                            </Button>
                        )}
                        <Button
                            className='Save'
                            onClick={handleSave} variant="contained" color="primary" disabled={isSaveDisabled}>
                            Save
                        </Button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default EditUserPage;
