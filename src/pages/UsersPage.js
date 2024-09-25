import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
    // setUsers, 
    deleteUser, addUser } from '../features/userSlice';
import Users from '../components/Users';
import {
    Button,
} from '@mui/material';
import departmentsData from '../DATA/departments.json';
import countriesData from '../DATA/countries.json';
import statusesData from '../DATA/statyses.json'; // Імпорт JSON файлу зі статусами

import MultiSelectWithSearch from '../components/MultiSelectWithSearch';
import DeleteIcon from '@mui/icons-material/Delete';
import AddUserPopup from '../components/AddUserPopup';


const UsersPage = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);
    const [departments, setDepartments] = useState(departmentsData);
    const [countries, setCountries] = useState(countriesData);
    const [statuses, setStatuses] = useState(statusesData);
    const [selectedDepartments, setSelectedDepartments] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [selectedStatuses, setSelectedStatuses] = useState([]);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const response = await fetch('/api/users');
    //         const data = await response.json();
    //         dispatch(setUsers(data));
    //     };

    //     fetchData();
    // }, [dispatch]);

    const handleDeleteUser = (userId) => {
        dispatch(deleteUser(userId));
    };

    const handleDepartmentFilterChange = (event) => {
        const selectedDepartments = event.target.value;

        // Якщо обрано менше двох департаментів, скидаємо інші фільтри
        if (selectedDepartments.length < 2) {
            setSelectedCountries([]);
            setSelectedStatuses([]);
        }

        setSelectedDepartments(selectedDepartments);
    };

    const handleCountryFilterChange = (event) => {
        setSelectedCountries(event.target.value);
    };

    const handleStatusFilterChange = (event) => {
        setSelectedStatuses(event.target.value);
    };

    const handleClearFilters = () => {
        setSelectedDepartments([]);
        setSelectedCountries([]);
        setSelectedStatuses([]);
    };

    // Відфільтровуємо користувачів за вибраними фільтрами
    const filteredUsers = users.filter(user =>
        (selectedDepartments.length === 0 || selectedDepartments.includes(user.department.value)) &&
        (selectedCountries.length === 0 || selectedCountries.includes(user.country.value)) &&
        (selectedStatuses.length === 0 || selectedStatuses.includes(user.status.value))
    );

    // Деактивуємо фільтри, якщо обрано менше трьох департаментів
    const disableOtherFilters = selectedDepartments.length < 3;

    const handleOpenPopup = () => {
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };
    const handleAddUser = (user) => {
        const newUser = {
            ...user,
            id: Date.now() // Simple ID generation using timestamp
        };
        dispatch(addUser(newUser));
    }
    return (
        <div
            className='container ceneter UsersPage'
        >
            <h2>USERS</h2>
            {disableOtherFilters && <p className='message'>Please add at least 3 departmetns to be able to proceed next steps.</p>}
            <div className='filtersBar_addUser'>
                <MultiSelectWithSearch
                    items={departments}
                    label="Department"
                    selectedValues={selectedDepartments}
                    onChange={handleDepartmentFilterChange}
                />
                <MultiSelectWithSearch
                    items={countries}
                    label="Country"
                    selectedValues={selectedCountries}
                    onChange={handleCountryFilterChange}
                    disabled={disableOtherFilters} // Деактивує
                />
                <MultiSelectWithSearch
                    items={statuses}
                    label="Status"
                    selectedValues={selectedStatuses}
                    onChange={handleStatusFilterChange}
                    disabled={disableOtherFilters} // Деактивуємо фільтр статусів, якщо обрано менше трьох департаментів
                />
                <Button onClick={handleClearFilters}
                    className='clear_filters'
                >
                    {/* <DeleteIcon /> */}
                </Button>
                <Button onClick={handleOpenPopup}
                    className='AddUser'
                >
                    Add User
                </Button>
                <AddUserPopup
                    open={isPopupOpen}
                    onClose={handleClosePopup}
                    onAdd={handleAddUser}
                    departments={departments}
                    countries={countries}
                    statuses={statuses}
                />
            </div>

            <Users users={filteredUsers} onDelete={handleDeleteUser} />
        </div>
    );
};

export default UsersPage;
