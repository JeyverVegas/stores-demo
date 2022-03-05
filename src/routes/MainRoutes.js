import { Route, Routes, useLocation } from 'react-router-dom';
import AdminMenuLinks from '../util/MenuLinks';
import { useEffect } from 'react';
import WebLayout from '../components/web/WebLayout';
import AdminLayout from '../components/admin/AdminLayout';
import RequireAuth from '../components/shared/Auth/RequireAuth';
import Login from '../pages/web/Login';
import Home from '../pages/web/Home';
import ForgotPassword from '../pages/web/ForgotPassword';
import NonRequireAuth from '../components/shared/Auth/NonRequireAuth';
import StoreProfile from '../pages/web/StoreProfile';

const MainRoutes = () => {

    const location = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0 });
    }, [location]);

    return (
        <Routes>
            <Route path="/iniciar-sesion" element={<NonRequireAuth><Login /></NonRequireAuth>} />
            <Route path="/recuperar-contraseña" element={<NonRequireAuth><ForgotPassword /></NonRequireAuth>} />

            <Route element={<WebLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/tiendas/:storeName" element={<StoreProfile />} />
            </Route>

            <Route element={<AdminLayout />}>
                {
                    AdminMenuLinks?.map((menuLink, i) => {
                        if (menuLink?.children) {
                            return [...menuLink?.children];
                        } else {
                            return menuLink;
                        }
                    }).flat().map((menuLink, i) => {
                        return (
                            menuLink?.component ?
                                <Route key={i} path={menuLink?.path} element={<RequireAuth>{menuLink?.component}</RequireAuth>} />
                                :
                                null
                        )
                    })
                }
            </Route>
            <Route path='*' element={<div>No extiste esta ruta.</div>} />
        </Routes>
    )
}

export default MainRoutes;