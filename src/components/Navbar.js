import React from 'react';
import { AppBar, Toolbar, 
     Button } from '@mui/material';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/edit-users">
                    Edit Users
                </Button>
                <Button color="inherit" component={Link} to="/users">
                    Users
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
