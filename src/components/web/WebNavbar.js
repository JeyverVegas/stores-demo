import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MobileMenu from './MobileMenu';
import DesktopMenu from './DesktopMenu';

const NavBar = () => {

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <MobileMenu anchorElNav={anchorElNav} onClickLink={handleCloseNavMenu} onToggleMenu={handleOpenNavMenu} />
                    <DesktopMenu onClickLink={handleCloseNavMenu} />
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default NavBar;
