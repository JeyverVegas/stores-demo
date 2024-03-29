import Admins from "../pages/admin/admins/Admins";
import AdminsCreate from "../pages/admin/admins/AdminsCreate";
import AdminsUpdate from "../pages/admin/admins/AdminsUpdate";
import Dashboard from "../pages/admin/Dashboard";
import Stores from "../pages/admin/stores/Stores";
import StoresCreate from "../pages/admin/stores/StoresCreate";
import StoresUpdate from "../pages/admin/stores/StoresUpdate";
import DashboardIcon from '@mui/icons-material/Dashboard';
import StoreIcon from '@mui/icons-material/Store';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CategoryIcon from '@mui/icons-material/Category';
import Products from "../pages/admin/products/Products";
import ProductsUpdate from "../pages/admin/products/ProductsUpdate";
import ProductsCreate from "../pages/admin/products/ProductsCreate";
import ProductCategories from "../pages/admin/product-categories/ProductCategories";
import ProductCategoriesCreate from "../pages/admin/product-categories/ProductCategoriesCreate";
import ProductCategoriesUpdate from "../pages/admin/product-categories/ProductCategoriesUpdate";

const createLink = (
    title,
    forUpdate,
    component,
    icon,
    path,
    children
) => ({ title, forUpdate, component, icon, path, children });

const AdminMenuLinks = [
    createLink('DashBoard', null, <Dashboard />, <DashboardIcon />, '/admin/dashboard'),

    createLink('Tiendas', null, null, <StoreIcon />, '/admin/tiendas', [
        createLink('Crear Tienda', null, <StoresCreate />, <AddBusinessIcon />, '/admin/tiendas/crear'),
        createLink('Listar Tiendas', null, <Stores />, <FormatListBulletedIcon />, '/admin/tiendas'),
        createLink('Actualizar Tiendas', true, <StoresUpdate />, '', '/admin/tiendas/:id'),
    ]),

    createLink('Productos', null, null, <FastfoodIcon />, '/admin/productos', [
        createLink('Categorias', null, <ProductCategories />, <CategoryIcon />, '/admin/productos/categorias'),
        createLink('Crear Categoria', true, <ProductCategoriesCreate />, <AddCircleIcon />, '/admin/productos/categorias/crear'),
        createLink('Actualizar Categoria', true, <ProductCategoriesUpdate />, '', '/admin/productos/categorias/:id'),
        createLink('Productos', null, <Products />, <FastfoodIcon />, '/admin/productos'),
        createLink('Crear Producto', true, <ProductsCreate />, <AddCircleIcon />, '/admin/productos/crear'),
        createLink('Actualizar Producto', true, <ProductsUpdate />, '', '/admin/productos/:id'),
    ]),

    createLink('Administradores', null, null, <SupervisorAccountIcon />, '/admin/administradores', [
        createLink('Crear Administrador', null, <AdminsCreate />, <GroupAddIcon />, '/admin/administradores/crear'),
        createLink('Listar Administradores', null, <Admins />, <FormatListBulletedIcon />, '/admin/administradores'),
        createLink('Actualizar Administradores', true, <AdminsUpdate />, '', '/admin/administradores/:id'),
    ])
];

export default AdminMenuLinks;