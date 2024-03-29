import React from 'react';
import { Container, Header, Segment, Image, Button, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useStore } from '../../app/stores/store';
import { observer } from 'mobx-react-lite';
import LoginForm from '../users/LoginForm';
import RegisterForm from '../users/RegisterForm';

export default observer(function HomePage() {
    const { userStore, modalStore } = useStore();

    return (
        <Segment inverted textAlign='center'  vertical className='masthead'>
            <Container>
                <Header as='h1' inverted>
                    <Image size='massive' src='assets/logo.png' alt='logo' styles={{ marginBottom: 12}}/>
                </Header>
                {
                    userStore.isLoggedIn ? (
                        <>
                            <Header as='h2' inverted content='Welcome to Reactivities' />
                            <Button as={Link} to='/activities' size='huge' inverted>
                                Go to activities
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button onClick={() => modalStore.openModal(<LoginForm />)} size='huge' inverted>
                                Login
                            </Button>
                            <Button onClick={() => modalStore.openModal(<RegisterForm />)} size='huge' inverted>
                                Register
                            </Button>
                            <Divider horizontal inverted> or </Divider>
                            <Button loading={userStore.fbLoading} onClick={userStore.facebookLogin} size='huge' inverted color='facebook'>
                                Login with facebook
                            </Button>
                        </>
                    )
                }
            </Container>
        </Segment>
    )
});
