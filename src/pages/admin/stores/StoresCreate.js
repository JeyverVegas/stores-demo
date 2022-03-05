import { Box, Button, Card, CardContent, CardHeader, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import StoreIcon from '@mui/icons-material/Store';
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ImgUploadInput from "../../../components/shared/ImgUploadInput";
import MapContainer from "../../../components/shared/MapContainer";
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { useFeedBack } from "../../../context/FeedBackContext";

const StoresCreate = () => {


    const navigate = useNavigate();

    const { setCustomAlert } = useFeedBack();

    const [data, setData] = useState({
        name: '',
        address: '',
        phone_number: '',
        email: '',
        latitude: '',
        longitude: '',
        image: null
    });

    const [markers, setMarkers] = useState([]);

    const [{ data: createData, loading: createLoading }, createStore] = useAxios({ url: `/stores`, method: 'POST' }, { manual: true, useCache: false });

    useEffect(() => {
        if (createData) {
            setCustomAlert({ show: true, message: 'La tienda ha sido creada exitosamente.', severity: 'success' });
            navigate?.('/admin/tiendas');
        }
    }, createData)

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

        if (createLoading) {
            return;
        }

        const formData = new FormData();

        Object?.keys(data).forEach((key, i) => {
            if (data[key]) {
                if (key === 'image') {
                    formData.append(key, data[key], data[key].name);
                } else {
                    formData.append(key, data[key]);
                }
            }
        });

        createStore({ data: formData });
    }

    return (
        <div style={{ marginTop: 20 }}>
            <Card>
                <CardHeader title={'Datos de la Tienda'} />
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <ImgUploadInput name="image" change={handleChange} style={{ height: 250 }} />
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
                                    name="phone_number"
                                    value={data?.phone_number}
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
                            <Button disabled={createLoading} type="submit" variant="contained" style={{ margin: '0 5px' }}>
                                Crear
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default StoresCreate;