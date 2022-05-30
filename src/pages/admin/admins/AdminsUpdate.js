import { Box, Button, Card, CardContent, CardHeader, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import HttpsIcon from '@mui/icons-material/Https';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { useNavigate, useParams } from "react-router-dom";
import { useFeedBack } from "../../../context/FeedBackContext";
import { useAuth } from "../../../context/AuthContext";

const StoresUpdate = () => {

    const { id } = useParams();

    const { user, setAuthInfo } = useAuth();

    const navigate = useNavigate();

    const { setCustomAlert, setLoading } = useFeedBack();

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        _method: 'PUT'
    });

    const [{ data: getData, loading: getLoading }, getAdmin] = useAxios({ url: `/users/${id}` }, { useCache: false });

    const [{ data: updateData, loading: updateLoading }, updateAdmin] = useAxios({ url: `/users/${id}`, method: 'POST' }, { manual: true, useCache: false });

    useEffect(() => {
        if (getData) {
            const { created_at, id, email_verified_at, updated_at, ...rest } = getData;
            setData((oldData) => {
                return {
                    ...oldData,
                    ...rest
                }
            });
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
            if (updateData?.id === user?.id) {
                setAuthInfo((oldAuthInfo) => {
                    return {
                        ...oldAuthInfo,
                        user: updateData
                    }
                });
            }
            setCustomAlert({ show: true, message: 'El administrador ha sido actualizado exitosamente.', severity: 'success' });
            navigate?.('/admin/administradores');
        }
    }, [updateData]);

    const handleChange = (e) => {
        setData((oldData) => {
            return {
                ...oldData,
                [e.target.name]: e.target.type === "file" ? e.target.files[0] : e.target.value
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
            if (data[key]) {
                formData.append(key, data[key]);
            }
        });

        updateAdmin({ data: formData });
    }

    return (
        <div style={{ marginTop: 20 }}>
            <Card>
                <CardHeader title={'Datos del Administrador'} />
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={4}>
                            <Grid item xs={6} >
                                <TextField
                                    size="small"
                                    fullWidth
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <AccountCircleIcon />
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
                                    type="email"
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
                                    type="password"
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <HttpsIcon />
                                            Cambiar Contraseña
                                        </div>
                                    }
                                    variant="outlined"
                                    name="password"
                                    value={data?.password}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>
                        <Box mt={4} textAlign="right">
                            <Button href="/admin/administradores" type="button" variant="contained" style={{ margin: '0 5px' }} color="error">
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