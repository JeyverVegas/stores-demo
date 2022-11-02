import { Autocomplete, Box, Button, Card, CardContent, CardHeader, CircularProgress, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import useAxios from "../../../hooks/useAxios";
import { useNavigate, useParams } from "react-router-dom";
import { useFeedBack } from "../../../context/FeedBackContext";
import useProductCategories from "../../../hooks/useProductCategories";

const ProductCategoriesUpdate = () => {

    const basePath = '/admin/productos/categorias';

    const [open, setOpen] = useState(false);

    const { id } = useParams();

    const navigate = useNavigate();

    const { setCustomAlert } = useFeedBack();

    const [filters, setFilters] = useState({
        name: '',
        page: 1,
        perPage: 100
    });

    const [data, setData] = useState({
        name: '',
        description: '',
        parent: '',
        _method: 'PUT'
    });

    const [{ data: dataToUpdate }, getDataToUpdate] = useAxios({ url: `/product-categories/${id}` }, { useCache: false });

    const [{ productCategories, total, numberOfPages, size, error: recordsErrors, loading: loadingProductCategories }, getProductsCategories] = useProductCategories({ axiosConfig: { params: { ...filters } } }, { useCache: false });

    const [{ data: updateData, loading: updateLoading }, updateRecord] = useAxios({ url: `/product-categories/${id}`, method: 'POST' }, { manual: true, useCache: false });

    useEffect(() => {
        if (dataToUpdate) {
            console.log(dataToUpdate?.data);
            setData((oldData) => {
                return {
                    ...oldData,
                    description: dataToUpdate?.data?.description,
                    name: dataToUpdate?.data?.name,
                    parent: dataToUpdate?.data?.parentCategory || ''
                }
            })
        }
    }, [dataToUpdate])

    useEffect(() => {
        if (updateData) {
            setCustomAlert({ show: true, message: 'El registro ha sido actualizado exitosamente.', severity: 'success' });
            navigate?.(basePath);
        }
    }, updateData)

    const handleChange = (e) => {
        setData((oldData) => {
            return {
                ...oldData,
                [e.target.name]: e.target.type === "file" ? e.target.files[0] : e.target.value
            }
        });
    }

    const handleSubmit = (e) => {
        e?.preventDefault?.();

        if (updateLoading) {
            return;
        }

        const formData = new FormData();

        const { parent, ...rest } = data;

        Object?.keys(rest).forEach((key, i) => {
            if (data[key]) {
                formData.append(key, data[key]);
            }
        });

        if (parent) {
            formData.append('parentId', parent?.id);
        }

        updateRecord({ data: formData });
    }

    return (
        <div style={{ marginTop: 20 }}>
            <Card>
                <CardHeader title={'Actualizar Categoria'} />
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={4}>
                            <Grid item xs={6} >
                                <TextField
                                    size="small"
                                    fullWidth
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <DriveFileRenameOutlineIcon />
                                            Nombre
                                        </div>
                                    }
                                    variant="outlined"
                                    name="name"
                                    value={data?.name}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Autocomplete
                                    open={open}
                                    size="small"
                                    onOpen={() => {
                                        setOpen(true);
                                    }}
                                    onClose={() => {
                                        setOpen(false);
                                    }}
                                    value={data?.parent}
                                    isOptionEqualToValue={(option, value) => option.id === value}
                                    getOptionLabel={(option) => option.name || ''}
                                    options={productCategories}
                                    onChange={(e, value) => { handleChange({ target: { name: 'parent', value } }) }}
                                    loading={loadingProductCategories}
                                    noOptionsText="Sin resultados."
                                    loadingText="Cargando..."
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Categoria Padre"
                                            value={filters.name}
                                            onChange={(e) => setFilters({ name: e?.target.value, page: 1, perPage: 100 })}
                                            InputProps={{
                                                ...params.InputProps,
                                                endAdornment: (
                                                    <>
                                                        {loadingProductCategories ? <CircularProgress color="inherit" size={20} /> : null}
                                                        {params.InputProps.endAdornment}
                                                    </>
                                                ),
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    multiline
                                    minRows={6}
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <FormatAlignLeftIcon />
                                            Descripción
                                        </div>
                                    }
                                    variant="outlined"
                                    name="description"
                                    value={data?.description}
                                    onChange={handleChange}
                                />
                            </Grid>
                        </Grid>

                        <Box mt={4} textAlign="right">
                            <Button href={basePath} type="button" variant="contained" style={{ margin: '0 5px' }} color="error">
                                Cancelar
                            </Button>
                            <Button disabled={updateLoading} type="submit" variant="contained" style={{ margin: '0 5px' }}>
                                Actualizar
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductCategoriesUpdate;