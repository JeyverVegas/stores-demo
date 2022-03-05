import { Avatar, Box, IconButton, Link, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const UserInfo = () => {

    const navigate = useNavigate();

    const { user, setAuthInfo } = useAuth();

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogOut = () => {
        setAuthInfo((oldAuthInfo) => {
            return {
                ...oldAuthInfo,
                user: null,
                token: null
            }
        });
    }

    const handleProfile = () => {
        navigate?.(`/admin/administradores/${user?.id}?name=${user?.name}`);
    }

    return (
        <Box ml={'auto'}>
            <Link style={{ color: 'white', margin: '0 15px' }} href='/'>
                Ver Pagina
            </Link>
            <Tooltip title="Haz click">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user?.name} src="/static/images/avatar/2.jpg" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem onClick={handleProfile}>
                    <Typography textAlign="center">Mi Perfil</Typography>
                </MenuItem>
                <MenuItem>
                    <Typography textAlign="center" onClick={handleLogOut}>Cerrar Sesión</Typography>
                </MenuItem>
            </Menu>
        </Box>
    )
}

export default UserInfo;