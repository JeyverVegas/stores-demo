import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from '../../components/shared/CopyRight';
import { useEffect, useState } from 'react';
import useAxios from '../../hooks/useAxios';
import { useFeedBack } from '../../context/FeedBackContext';
import { useAuth } from '../../context/AuthContext';

const Login = () => {

    const { setAuthInfo } = useAuth();

    const { setLoading } = useFeedBack();

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [{ data: dataLogin, loading: loadingLogin }, login] = useAxios({ url: `/auth/login`, method: 'POST' }, { manual: true, useCache: false });

    useEffect(() => {
        if (dataLogin) {
            setAuthInfo({
                ...dataLogin
            });
        }
    }, [dataLogin])

    useEffect(() => {
        setLoading({
            show: loadingLogin,
            message: 'Cargando'
        })
    }, [loadingLogin])

    const handleChange = (e) => {
        setLoginData((oldLoginData) => {
            return {
                ...oldLoginData,
                [e.target.name]: e.target.value
            }
        });
    }

    const handleSubmit = (e) => {
        e?.preventDefault?.();
        login({ data: loginData });
    };

    return (
        <>
            <IconButton href='/' color="primary">
                <ArrowBackIcon />
            </IconButton>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Iniciar Sesión
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Correo Electronico"
                            onChange={handleChange}
                            value={loginData?.email}
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Contraseña"
                            onChange={handleChange}
                            value={loginData?.password}
                            name="password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Iniciar Sesión
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </>
    );
}

export default Login;