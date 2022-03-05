import { Box, Button, Container, Grid, List, ListItem, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import MapContainer from "../../components/shared/MapContainer";
import useAxios from "../../hooks/useAxios";

import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CommentsBox from "../../components/shared/CommentsBox";
import CommentsForm from "../../components/shared/CommentsForm";

const StoreProfile = () => {

    const { storeName } = useParams();

    const [searchParams] = useSearchParams();

    const [{ data: storeData, loading: storeLoading }, getStore] = useAxios({ url: `/stores/${searchParams?.get('id')}` }, { useCache: false });

    const [store, setStore] = useState(null);

    const [imagePath, setImagePath] = useState('');

    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        if (storeData) {
            const { location, image_path, ...rest } = storeData;
            setImagePath(`${process.env.REACT_APP_API_HOST}${image_path}`)
            setStore((oldStore) => {
                return {
                    ...oldStore,
                    ...rest,
                    latitude: location?.lat,
                    longitude: location.lng
                }
            })
        }
    }, [storeData]);

    useEffect(() => {
        if (store?.latitude && store?.longitude) {
            setMarkers([{ latitude: store?.latitude, longitude: store?.longitude }])
        }
    }, [store?.latitude, store?.longitude])

    const handleNewComment = (newComment) => {
        setStore((oldStore) => {
            return {
                ...oldStore,
                store_reviews: [newComment, ...oldStore?.store_reviews]
            }
        })
    }

    return (
        <Container>
            <Box py={8}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={12} md={6}>
                        <img src={imagePath} style={{ width: '100%', height: 200, borderRadius: 10 }} />
                        <Typography variant="h5" mb={2} component="div">
                            {store?.name}
                        </Typography>
                        <Typography variant="h7">
                            Información de contacto:
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <LocalPhoneIcon />
                                </ListItemIcon>
                                <ListItemText primary={store?.phone_number} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <MailIcon />
                                </ListItemIcon>
                                <ListItemText primary={store?.email} />
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LocationOnIcon />
                                </ListItemIcon>
                                <ListItemText primary={store?.address} />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <MapContainer
                            zoom={12}
                            markers={markers}
                            style={{ height: 400 }}
                        />
                    </Grid>
                </Grid>
                <br></br>
                <br></br>
                <CommentsForm storeId={store?.id} onAddComment={handleNewComment} storeName={store?.name} />
                <CommentsBox comments={store?.store_reviews} />
            </Box>
        </Container>

    )
}

export default StoreProfile;