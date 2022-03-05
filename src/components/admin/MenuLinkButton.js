import { List, Collapse, IconButton, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import { useAdminTheme } from "../../context/AdminThemeContext";
import { useNavigate, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const MenuLinkButton = ({ menuLink }) => {

    const navigate = useNavigate();

    const theme = useTheme();

    const location = useLocation();

    const { menuOpen, setMenuOpen, setPageName } = useAdminTheme();

    const [open, setOpen] = useState(false);

    const [active, setActive] = useState(false);

    useEffect(() => {
        if (!menuOpen) {
            setOpen(false);
        }
    }, [menuOpen])

    useEffect(() => {
        if (active) {
            setPageName(menuLink?.title);
        }
    }, [active])

    useEffect(() => {
        setActive(location?.pathname === menuLink.path && !menuLink?.children);
    }, [location])

    const handleClick = () => {
        if (menuLink?.children?.length > 0) {
            setOpen((oldOpen) => !oldOpen);
            setMenuOpen(true);
        } else {
            navigate(menuLink?.path);
            setMenuOpen(false);
        }
    }

    if (menuLink?.forUpdate) {
        return null
    }

    return (
        <>
            <ListItemButton
                color="primary"
                title={menuLink?.title}
                sx={{
                    minHeight: 48,
                    justifyContent: menuOpen ? 'initial' : 'center',
                    px: 2.5,
                }}
                onClick={handleClick}
            >
                <ListItemIcon
                    sx={{
                        minWidth: 0,
                        mr: menuOpen ? 3 : 'auto',
                        justifyContent: 'center',
                        color: active ? theme?.palette.primary.main : ''
                    }}
                >
                    {menuLink?.icon}
                </ListItemIcon>
                <ListItemText primary={menuLink?.title} sx={{ opacity: menuOpen ? 1 : 0, color: active ? theme?.palette.primary.main : '' }} />
                {
                    menuLink.children?.length > 0 && menuOpen ?
                        <ExpandMore
                            expand={open}
                            aria-expanded={open}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </ExpandMore>
                        :
                        null
                }
            </ListItemButton>
            {
                menuLink?.children?.length > 0 &&
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List>
                        {

                            menuLink?.children?.map((childrenMenuLink, i) => {
                                return (
                                    <MenuLinkButton menuLink={childrenMenuLink} key={i} />
                                )
                            })
                        }
                    </List>
                </Collapse>
            }
        </>

    )
}

export default MenuLinkButton;