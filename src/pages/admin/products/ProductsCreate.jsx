import { Autocomplete, Box, Button, Card, CardContent, CardHeader, CircularProgress, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ImgUploadInput from "../../../components/shared/ImgUploadInput";
import { useEffect, useState } from "react";
import useAxios from "../../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import { useFeedBack } from "../../../context/FeedBackContext";
import update from 'immutability-helper';
import useProductCategories from "../../../hooks/useProductCategories";

const ProductsCreate = () => {

    const basePath = '/admin/productos';

    const [open, setOpen] = useState(false);

    const [openSubCategories, setOpenSubCategories] = useState(false);

    const [filters, setFilters] = useState({
        name: '',
        page: 1,
        perPage: 100,
        parentsOnly: true
    });

    const [subCategoriesFilters, setSubCategoriesFilters] = useState({
        name: '',
        page: 1,
        perPage: 100,
        parentId: ''
    });

    const navigate = useNavigate();

    const { setCustomAlert } = useFeedBack();

    const [data, setData] = useState({
        name: '',
        reference: '',
        price: '',
        images: [null],
        description: '',
        category: '',
        subCategory: '',
    });

    const [{ productCategories, total, numberOfPages, size, error: recordsErrors, loading: loadingProductCategories }] = useProductCategories({ axiosConfig: { params: { ...filters } } }, { useCache: false });

    const [{ productCategories: subCategories, loading: loadingSubProductCategories }, getSubCategories] = useProductCategories({ options: { manual: true, useCache: false } });

    const [{ data: createData, loading: createLoading }, createRecord] = useAxios({ url: `/products`, method: 'POST' }, { manual: true, useCache: false });

    useEffect(() => {

        if (!data.category) {
            setData((oldData) => {
                return {
                    ...oldData,
                    subCategory: ''
                }
            })
        }

        setSubCategoriesFilters((oldFilters) => {
            return {
                ...oldFilters,
                parentId: data?.category?.id || ''
            }
        });
    }, [data?.category])

    useEffect(() => {
        if (subCategoriesFilters?.parentId) {
            getSubCategories({
                params: {
                    ...subCategoriesFilters
                }
            })
        }
    }, [subCategoriesFilters])

    useEffect(() => {
        if (createData) {
            setCustomAlert({ show: true, message: 'El registro ha sido creado exitosamente.', severity: 'success' });
            navigate?.(basePath);
        }
    }, createData)

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

        if (createLoading) {
            return;
        }

        const formData = new FormData();

        const { images, category, subCategory, ...rest } = data;

        Object?.keys(rest).forEach((key, i) => {
            if (data[key]) {
                formData.append(key, data[key]);
            }
        });

        images?.forEach((image, i) => {
            if (image) {
                formData?.append(`images[${i}]`, image, image?.name);
            }
        });

        if (category) {
            formData?.append(`categoryId`, category?.id);
        }

        if (subCategory) {
            formData?.append(`subCategoryId`, subCategory?.id);
        }


        createRecord({ data: formData });
    }

    const handleAddImage = () => {
        setData((oldData) => {
            return {
                ...oldData,
                images: [...oldData?.images, null]
            }
        })
    }

    const handleArrayChange = (e, index, arrayName) => {
        var newArrayValues = [];
        if (e.target.name === 'images') {
            newArrayValues = update(data?.[arrayName], { [index]: { $set: e.target.files[0] } });
        } else {
            newArrayValues = update(data?.[arrayName], { [index]: { [e.target.name]: { $set: e.target.type === 'file' ? e.target.files[0] : e.target.value } } });
        }
        setData((oldData) => {
            return {
                ...oldData,
                [arrayName]: newArrayValues
            }
        });
    }

    const removeFromArray = (index, arrayName) => {

        data?.[arrayName]?.splice(index, 1);

        setData((oldData) => {
            return {
                ...oldData,
                [arrayName]: data?.[arrayName]
            }
        });
    }

    return (
        <div style={{ marginTop: 20 }}>
            <Card>
                <CardHeader title={'Crear Producto'} />
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Grid container spacing={4} alignItems="center">
                                    {
                                        data?.images?.map((image, i) => {
                                            return (
                                                <Grid item xs={3} textAlign="center" key={i}>
                                                    {
                                                        image ?
                                                            <ImgUploadInput
                                                                previewImage={URL.createObjectURL(image)}
                                                                name="images"
                                                                change={(e) => { handleArrayChange(e, i, 'images') }}
                                                            />
                                                            :
                                                            <ImgUploadInput
                                                                name="images"
                                                                change={(e) => { handleArrayChange(e, i, 'images') }}
                                                            />
                                                    }
                                                    <br />
                                                    <Button variant="contained" color="error" onClick={() => { removeFromArray(i, 'images') }}>
                                                        Remover
                                                    </Button>
                                                </Grid>
                                            )
                                        })
                                    }
                                    <Grid item xs={3}>
                                        <Button variant="contained" color="primary" onClick={handleAddImage}>
                                            Añadir Imagen
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
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
                                <TextField
                                    size="small"
                                    fullWidth
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <AutoAwesomeIcon />
                                            Referencia
                                        </div>
                                    }
                                    variant="outlined"
                                    name="reference"
                                    value={data?.reference}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    label={
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <AttachMoneyIcon />
                                            Precio
                                        </div>
                                    }
                                    variant="outlined"
                                    name="price"
                                    type="number"
                                    value={data?.price}
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
                                    value={data?.category}
                                    isOptionEqualToValue={(option, value) => option.id === value}
                                    getOptionLabel={(option) => option.name || ''}
                                    options={productCategories}
                                    onChange={(e, value) => { handleChange({ target: { name: 'category', value } }) }}
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
                            <Grid item xs={6}>
                                <Autocomplete
                                    open={openSubCategories}
                                    size="small"
                                    onOpen={() => {
                                        setOpenSubCategories(true);
                                    }}
                                    onClose={() => {
                                        setOpenSubCategories(false);
                                    }}
                                    disabled={!data?.category}
                                    value={data?.subCategory}
                                    isOptionEqualToValue={(option, value) => option.id === value}
                                    getOptionLabel={(option) => option.name || ''}
                                    options={subCategories}
                                    onChange={(e, value) => { handleChange({ target: { name: 'subCategory', value } }) }}
                                    loading={loadingSubProductCategories}
                                    noOptionsText="Sin resultados."
                                    loadingText="Cargando..."
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Sub Categoría"
                                            value={subCategoriesFilters.name}
                                            onChange={(e) => setSubCategoriesFilters({ name: e?.target.value, page: 1, perPage: 100, parentId: data?.category?.id })}
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
                                    minRows={5}
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
                            <Button disabled={createLoading} type="submit" variant="contained" style={{ margin: '0 5px' }}>
                                Crear
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProductsCreate;