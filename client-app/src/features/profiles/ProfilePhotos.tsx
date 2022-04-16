import { observer } from "mobx-react-lite"
import { SyntheticEvent, useState } from "react";
import { Card, Header, Tab, Image, Grid, Button } from "semantic-ui-react";
import PhotoUploadWidget from "../../app/common/imageUpload/PhotoUploadWidget";
import { Photo, Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
    profile: Profile
}

export default observer(function ProfilePhotos({ profile } : Props) {
    const { 
            profileStore: { 
                isCurrentUser, 
                uploadPhoto, 
                uploading, 
                loading, 
                setMainPhoto,
                deletePhoto,
        } 
    } = useStore();
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');

    function handlePhotoUpload (file: Blob) {
        uploadPhoto(file).then(() => setAddPhotoMode(false));
    }

    function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        setMainPhoto(photo);
    } 

    function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
        setTarget(e.currentTarget.name);
        deletePhoto(photo);
    } 


    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16}>
                    <Header icon='image' floated="left" content='Photos' />
                    {isCurrentUser && (
                        <Button 
                            floated='right' 
                            basic 
                            content={addPhotoMode ? 'Cancel' : 'Add photo'} 
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={uploading} /> : (
                        <Card.Group itemsPerRow={5}>
                            {
                                profile.photos?.map((p) => 
                                <Card key={p.id}>
                                    <Image src={p.url} />
                                    {isCurrentUser && (
                                         <Button.Group fluid widths={2}>
                                            <Button 
                                                loading={target === 'main' + p.id && loading} 
                                                onClick={(e) => handleSetMainPhoto(p, e)} 
                                                name={'main' + p.id} 
                                                basic
                                                color='green' 
                                                content={'Main'}
                                                disabled={p.isMain}
                                            />
                                            <Button
                                                basic
                                                color="red"
                                                icon='trash'
                                                loading={target === 'delete' + p.id && loading} 
                                                onClick={(e) => handleDeletePhoto(p, e)}
                                                disabled={p.isMain}
                                                name={'delete' + p.id}
                                            />
                                        </Button.Group>
                                    )}
                                </Card>
                                )
                            }
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
});