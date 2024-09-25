import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, TextField, MenuItem } from '@mui/material';

const AddUserPopup = ({ open, onClose, onAdd, departments, countries, statuses }) => {
    const [newUser, setNewUser] = useState({
        name: '',
        department: '',
        country: '',
        status: ''
    });

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleAdd = () => {
        if (newUser.name && newUser.department && newUser.country && newUser.status) {
            const formattedUser = {
                id: Date.now(), // Simple ID generation using timestamp
                name: newUser.name,
                status: {
                    name: statuses.find(status => status.value === newUser.status)?.name || 'Unknown',
                    value: newUser.status
                },
                department: {
                    name: departments.find(dept => dept.value === newUser.department)?.name || 'Unknown',
                    value: newUser.department
                },
                country: {
                    name: countries.find(country => country.value === newUser.country)?.name || 'Unknown',
                    value: newUser.country
                }
            };
            onAdd(formattedUser);
            onClose();
        } else {
            alert('Please fill in all fields.');
        }
    };

    return (
        <Dialog open={open} onClose={onClose}
            className='popupAddUser'
        >
            <DialogContent
                className='container ceneter '

            >
                <h2>
                    Add user
                </h2>
                <div
                    className='row'
                >
                    <TextField
                        name="name"
                        label="Name"
                        value={newUser.name}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        name="department"
                        label="Department"
                        select
                        value={newUser.department}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    >
                        {departments.map((dept) => (
                            <MenuItem key={dept.value} value={dept.value}>
                                {dept.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div
                    className='row second'
                >
                    <TextField
                        name="country"
                        label="Country"
                        select
                        value={newUser.country}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
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
                        value={newUser.status}
                        onChange={handleChange}
                        fullWidth
                        margin="dense"
                    >
                        {statuses.map((status) => (
                            <MenuItem key={status.value} value={status.value}>
                                {status.name}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <DialogActions
                    className='buttons'
                >
                    <Button
                        onClick={onClose}
                        className='Cancel'
                    >
                        Cancel
                    </Button>
                    <Button onClick={handleAdd}
                        className='Add'
                    >
                        Add</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

export default AddUserPopup;
