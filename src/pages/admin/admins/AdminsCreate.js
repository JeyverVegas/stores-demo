import { Box, Button, Card, CardContent, CardHeader, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import HttpsIcon from '@mui/icons-material/Https';
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { useFeedBack } from "../../../context/FeedBackContext";

const AdminsCreate = () => {

    const navigate = useNavigate();

    const { setCustomAlert } = useFeedBack();

    const [data, setData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [{ data: createData, loading: createLoading }, createAdmin] = useAxios({ url: `/users`, method: 'POST' }, { manual: true, useCache: false });

    useEffect(() => {
        if (createData) {
            setCustomAlert({ show: true, message: 'El administrador ha sido creado exitosamente.', severity: 'success' });
            navigate?.('/admin/administradores');
        }
    }, createData);

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

        createAdmin({ data });
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
                                            Contraseña
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

export default AdminsCreate;