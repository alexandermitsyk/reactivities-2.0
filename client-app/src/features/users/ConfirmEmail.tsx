import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Button, Header, Icon, Segment } from 'semantic-ui-react';
import agent from '../../app/api/agent';
import useQuery from '../../app/common/util/hooks';
import { useStore } from '../../app/stores/store';
import LoginForm from './LoginForm';

export default function ConfirmEmail() {
    const { modalStore } = useStore();
    const email = useQuery().get('email') as string;
    const token =  useQuery().get('token') as string;

    const Status = {
        Verifying: 'Verifying',
        Failed: 'Failed',
        Success: 'Success',
    }

    const [status, setStatus] = useState(Status.Verifying);

    function handleConfirmEmailResend() {
        agent.Account.resendEmailConfirm(email).then(() => {
            toast.success('Verification email resent - please check your email')
        }).catch(e => console.log(e));
    }

    useEffect(() => {
        agent.Account.verifyEmail(token, email).then(() => {
            setStatus(Status.Success);
        }).catch(e => { 
            setStatus(Status.Failed); console.log(e) 
        });
    }, [Status.Failed, Status.Success, email, token]);

    function getBody() {
        switch (status) {
            case Status.Verifying:
                return <p>Verifying...</p>
            case Status.Failed:
                return (
                    <div>
                        <p>Verification failed. You can try resending the verify link to your email</p>
                        <Button primary size='huge' onClick={handleConfirmEmailResend}>Resend email</Button>
                    </div>
                )
            case Status.Success:
                return (
                    <div>
                        <p>Email has been verified - you can now login</p>
                        <Button primary size='huge' onClick={() => modalStore.openModal(<LoginForm />)}>Login</Button>
                    </div>
                )
            default:
                break;
        }
    }

    return (
        <Segment placeholder textAlign='center'>
            <Header icon>
                <Icon name='envelope' />
                Email verification
            </Header>
            <Segment.Inline>
                {getBody()}
            </Segment.Inline>
        </Segment>
    )
}