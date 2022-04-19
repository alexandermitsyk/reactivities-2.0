import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { Image, List, Popup } from 'semantic-ui-react';
import { Profile } from '../../../app/models/profile';
import ProfileCard from '../../../features/profiles/ProfileCard';

interface Props {
    attendees: Profile[],
}
 
export default observer(function ActivitiyListItemAttendee({ attendees }: Props) {
    const styles = {
        borderColor: 'pink',
        borderWidth: 3,
    }

    return (
        <List horizontal>
            {attendees.map(attendee => (
                <Popup hoverable key={attendee.username} trigger={
                    <List.Item key={attendee.username} as={Link} to={`/profiles/${attendee.username}`}>
                    <Image 
                        size='mini' 
                        bordered
                        circular 
                        src={attendee.image || '/assets/user.png'} 
                        style={attendee.following ? styles : null}
                    />
                </List.Item>
                }>
                    <Popup.Content>
                        <ProfileCard profile={attendee}/>
                    </Popup.Content>
                </Popup>
            ))}
        </List>
    )
})