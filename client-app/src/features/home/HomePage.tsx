import React from 'react';
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <Segment inverted textAlign='center'  vertical className='masthead'>
            <Container>
                <Header as='h1' inverted>
                    <Image size='massive' src='assets/logo.png' alt='logo' styles={{ marginBottom: 12}}/>
                </Header>
                <Header as='h2' inverted content='Welcome to Reactivities' />
                <Button as={Link} to='/activities' size='huge' iverted>
                    Take me to the activities
                </Button>
            </Container>
        </Segment>
    )
}

export default HomePage;
