import { Box, Button, Card, CardContent, CardHeader, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ImgUploadInput from "../../../components/shared/ImgUploadInput";
import MapContainer from "../../../components/shared/MapContainer";
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { useNavigate, useParams } from "react-router-dom";
import { useFeedBack } from "../../../context/FeedBackContext";

const StoresUpdate = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const { setCustomAlert, setLoading } = useFeedBack();

    const [data, setData] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        email: '',
        latitude: '',
        longitude: '',
        image: null,
        _method: 'PUT'
    });

    const [imagePreview, setImagePreview] = useState('');

    const [markers, setMarkers] = useState([]);

    const [{ data: getData, loading: getLoading }, getStore] = useAxios({ url: `/stores/${id}` }, { useCache: false });

    const [{ data: updateData, loading: updateLoading }, updateStore] = useAxios({ url: `/stores/${id}`, method: 'POST' }, { manual: true, useCache: false });

    useEffect(() => {
        if (getData) {
            const { imagePath, created_at, id, location, storeReviews, updated_at, ...rest } = getData?.data;

            setImagePreview(`${process.env.REACT_APP_API_HOST}${imagePath}`);
            setData((oldData) => {
                return {
                    ...oldData,
                    ...rest,
                    latitude: location?.lat,
                    longitude: location?.lng
                }
            });
            console.log(getData);
        }
    }, [getData])

    useEffect(() => {
        setLoading({
            show: getLoading,
            message: 'Obteniendo Información'
        });
    }, [getLoading])

    useEffect(() => {
        if (updateData) {
            setCustomAlert({ show: true, message: 'La tienda ha sido actualizada exitosamente.', severity: 'success' });
            navigate?.('/admin/tiendas');
        }
    }, [updateData]);

    useEffect(() => {
        if (data.latitude && data.longitude) {
            setMarkers([{ latitude: data.latitude, longitude: data?.longitude }])
        }
    }, [data.latitude, data.longitude])

    const handleChange = (e) => {
        setData((oldData) => {
            return {
                ...oldData,
                [e.target.name]: e.target.type === "file" ? e.target.files[0] : e.target.value
            }
        });
    }

    const handleMapClick = (e) => {
        setData((oldData) => {
            return {
                ...oldData,
                latitude: e.latLng.lat(),
                longitude: e.latLng.lng(),
            }
        });
    }

    const handleSubmit = (e) => {
        e?.preventDefault?.();

        if (updateLoading) {
            return;
        }

        const formData = new FormData();

        Object?.keys(data).forEach((key, i) => {
            console.log(key);
            if (data[key]) {
                if (key === 'image') {
                    formData.append(key, data[key], data[key].name);
                } else {
                    formData.append(key, data[key]);
                }
            }
        });

        updateStore({ data: formData });
    }

    return (
        <div style={{ marginTop: 20 }}>
            <Card>
                <CardHeader title={'Datos de la Tienda'} />
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <ImgUploadInput previewImage={imagePreview} name="image" change={handleChange} style={{ height: 250 }} />
                        <br></br>
                        <Grid container spacing={4}>
                            <Grid item xs={6} >
                                <TextField
                                    size="small"
                                    fullWidth
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <StoreIcon />
                                            Nombre
                                        </div>
                                    }
                                    variant="outlined"
                                    name="name"
                                    value={data?.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <MailIcon />
                                            Email
                                        </div>
                                    }
                                    variant="outlined"
                                    name="email"
                                    value={data?.email}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <LocalPhoneIcon />
                                            Telefono
                                        </div>
                                    }
                                    variant="outlined"
                                    name="phoneNumber"
                                    value={data?.phoneNumber}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <LocationOnIcon />
                                            Direccion
                                        </div>
                                    }
                                    variant="outlined"
                                    name="address"
                                    value={data?.address}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Typography variant="h5" mt={4}>
                            Ubicacion en el mapa
                        </Typography>
                        <MapContainer
                            zoom={6}
                            markers={markers}
                            style={{ marginTop: 10, height: 400 }}
                            onClick={handleMapClick}
                        />

                        <Box mt={4} textAlign="right">
                            <Button href="/admin/tiendas" type="button" variant="contained" style={{ margin: '0 5px' }} color="error">
                                Cancelar
                            </Button>
                            <Button disabled={updateLoading} type="submit" variant="contained" style={{ margin: '0 5px' }}>
                                Actualizar
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default StoresUpdate;