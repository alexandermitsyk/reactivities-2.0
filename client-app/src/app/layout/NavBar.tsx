import React from 'react';
import { NavLink } from 'react-router-dom';
import { Button, Container, Menu } from 'semantic-ui-react';

const NavBar = () => {    
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src="/assets/logo.svg" alt="logo" style={{marginRight: 5}} />
                    Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to='/activities' name="Activities" />
                <Menu.Item as={NavLink} to='/errors' name="Errors" />
                <Menu.Item>
                    <Button as={NavLink} to='/create' positive content='Create Activitiy' />
                </Menu.Item>   
            </Container>
        </Menu>
    )
}

export default NavBar;
