import { IconButton, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import MuiDrawer from '@mui/material/Drawer';
import { useAdminTheme } from '../../context/AdminThemeContext';
import AdminMenuLinks from '../../util/MenuLinks';

import { Link } from 'react-router-dom';
import MenuLinkButton from './MenuLinkButton';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    backgroundColor: theme.palette.primary.main,
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const AdminSideBar = () => {

    const theme = useTheme();

    const { setMenuOpen, menuOpen } = useAdminTheme();

    return (
        <Drawer variant="permanent" open={menuOpen}>
            <DrawerHeader>
                <Typography variant="h6" color="white">Menu</Typography>
                <IconButton onClick={() => { setMenuOpen((oldMenuOpen) => !oldMenuOpen) }}>
                    {theme.direction === 'rtl' ? <ChevronRightIcon style={{ color: 'white' }} /> : <ChevronLeftIcon style={{ color: 'white' }} />}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {AdminMenuLinks?.map((menuLink, index) => {
                    return (
                        <MenuLinkButton menuLink={menuLink} key={index} />
                    )
                })}
            </List>
        </Drawer>
    )
}

export default AdminSideBar;