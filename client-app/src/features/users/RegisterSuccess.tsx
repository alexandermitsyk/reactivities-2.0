import React from 'react';
import { toast } from 'react-toastify';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';
import agent from '../../app/api/agent';
import useQuery from '../../app/common/util/hooks';

export default function RegisterSuccess() {
    const email = useQuery().get('email') as string;

    function handleConfirmEmailResend() {
        agent.Account.resendEmailConfirm(email).then(() => {
            toast.success('Verification email resent - please check your email')
        }).catch(e => console.log(e));
    }

    return (
        <Segment placeholder textAlign='center'>
            <Header icon color='green'>
                <Icon name='check' />
                Successfully registreted!
            </Header>
            <p>Please check your email for the verification email</p>
            { email && 
                (
                    <>
                        <p>Didn't receive the email? Click the below to resend</p>
                        <Button primary size='huge' onClick={handleConfirmEmailResend}>Resend email</Button>
                    </>
                )
            }
        </Segment>
    )
}