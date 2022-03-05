import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import { useAdminTheme } from '../../context/AdminThemeContext';
import { useLocation, useSearchParams } from 'react-router-dom';
import UserInfo from './UserInfo';
import { Box, Link } from '@mui/material';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const AdminNavBar = () => {

    const location = useLocation();

    const [searchParams] = useSearchParams();

    const { setMenuOpen, menuOpen, pageName, setPageName } = useAdminTheme();

    useEffect(() => {
        if (!pageName) {
            if (location?.pathname.split('/').length < 4) {
                setPageName(location?.pathname.split('/')[location?.pathname.split('/').length - 1])
                return;
            }
            if (location?.pathname.split('/').length > 3) {
                setPageName(`${location?.pathname.split('/')[2]} - ${location?.pathname.split('/')[3]}`)
            }
        }
    }, [location?.pathname, pageName])

    useEffect(() => {
        var nameValue = searchParams?.get('name');
        if (nameValue) {
            setPageName(nameValue);
        }
    }, [searchParams])

    return (
        <AppBar position="fixed" open={menuOpen}>
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => { setMenuOpen((oldMenuOpen) => !oldMenuOpen) }}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(menuOpen && { display: 'none' }),
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" textTransform={"capitalize"}>
                    {pageName}
                </Typography>
                <UserInfo />
            </Toolbar>
        </AppBar>
    )
}

export default AdminNavBar;