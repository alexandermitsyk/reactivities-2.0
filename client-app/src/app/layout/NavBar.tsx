import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';

const NavBar = () => {
    const { activityStore } = useStore();
    
    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.svg" alt="logo" style={{marginRight: 5}} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name="Activities" />
                <Menu.Item>
                    <Button onClick={() => activityStore.openForm()} positive content='Create Activitiy' />
                </Menu.Item>   
            </Container>
        </Menu>
    )
}

export default NavBar;
