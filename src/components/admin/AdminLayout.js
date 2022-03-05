import Box from '@mui/material/Box';
import { Outlet } from "react-router-dom";
import AdminSideBar from './AdminSideBar';
import AdminNavBar from './AdminNavBar';
import { styled } from '@mui/material/styles';
import { AdminThemeProvider } from '../../context/AdminThemeContext';
import { useFeedBack } from '../../context/FeedBackContext';
import { useEffect } from 'react';
import { Alert, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AdminLayout = () => {

    const { customAlert, setCustomAlert } = useFeedBack();
    useEffect(() => {
        if (customAlert?.show) {
            window.scrollTo({ top: 0 });
        }
    }, [customAlert])

    return (
        <AdminThemeProvider>
            <Box sx={{ display: 'flex' }}>
                <AdminNavBar />
                <AdminSideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <DrawerHeader />
                    {customAlert?.show &&
                        <Box mb={4}>
                            <Alert
                                severity={customAlert?.severity}
                                action={
                                    <Button onClick={() => { setCustomAlert({}) }} color="inherit" size="small">
                                        <CloseIcon />
                                    </Button>
                                }
                            >
                                {customAlert?.message}
                            </Alert>
                        </Box>
                    }
                    <Outlet />
                </Box>
            </Box>
        </AdminThemeProvider>
    );
}

export default AdminLayout;
