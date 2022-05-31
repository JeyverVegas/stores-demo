import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Popper } from "@mui/material";
import { styled, alpha } from '@mui/material/styles';

import SystemInfo from "../../util/SystemInfo";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import useStores from "../../hooks/useStores";

const StyledAutocomplete = styled(Autocomplete)({
    "& .MuiAutocomplete-inputRoot": {
        color: "white",
        // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
        '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-child': {
            // Default left padding is 6px
            paddingLeft: 26
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        },
        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "white"
        }
    }
});


const DesktopMenu = () => {

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const [storesFilters, setStoresFilters] = useState({ name: '' });

    const [{ stores, loading }, getStores] = useStores({ axiosConfig: { params: { ...storesFilters } }, options: { useCache: false } });

    const [selectedStore, setSelectedStore] = useState(null);

    useEffect(() => {
        if (selectedStore) {
            navigate?.(`/tiendas/${selectedStore?.name}?id=${selectedStore?.id}`)
        }
    }, [selectedStore])

    const handleClick = () => {
        navigate?.('/')
    }

    const handleChange = (e) => {
        setStoresFilters((oldFilters) => {
            return {
                ...oldFilters,
                [e.target.name]: e?.target.value
            }
        });
    }

    const handleStore = (e, store) => {
        setSelectedStore(store);
    }

    return (
        <>
            <Typography
                onClick={handleClick}
                style={{ cursor: 'pointer' }}
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
            >
                {SystemInfo.name}
            </Typography>
            <StyledAutocomplete
                sx={{ width: 300 }}
                open={open}
                onOpen={() => {
                    setOpen(true);
                }}
                onClose={() => {
                    setOpen(false);
                }}
                onChange={handleStore}
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                getOptionLabel={(store) => store?.name}
                options={stores}
                loading={loading}
                color="neutral"
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Buscar Tiendas..."
                        name="name"
                        color="neutral"
                        value={selectedStore}
                        onChange={handleChange}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'end' }}>
                <Button href="/iniciar-sesion" sx={{ my: 2, color: 'white', display: 'block' }}>
                    Iniciar Sesión
                </Button>
            </Box>
        </>
    )
}

export default DesktopMenu;