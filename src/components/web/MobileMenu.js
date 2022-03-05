import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import SystemInfo from '../../util/SystemInfo';

const MobileMenu = ({ onClickLink, onToggleMenu, anchorElNav }) => {
    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={(e) => { onToggleMenu?.(e) }}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={(e) => { onClickLink?.(e) }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    <Button href="/iniciar-sesion" onClick={(e) => { onClickLink?.(e) }} sx={{ my: 2, display: 'block' }}>
                        Iniciar Sesión
                    </Button>
                </Menu>
            </Box>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
            >
                {SystemInfo.name}
            </Typography>
        </>
    )
}

export default MobileMenu;