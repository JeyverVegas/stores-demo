import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import ProductCategoriesColumns from "../../../components/admin/CustomTable/Columns/ProductCategoriesColumns";

import CustomTable from "../../../components/admin/CustomTable/CustomTable";
import { useFeedBack } from "../../../context/FeedBackContext";
import useAxios from "../../../hooks/useAxios";
import useProductCategories from "../../../hooks/useProductCategories";

const ProductCategories = () => {

    const basePath = '/admin/productos/categorias';
    const deleteRecordBasePath = '/product-categories';

    const { setCustomAlert, setLoading } = useFeedBack();

    const [filters, setFilters] = useState({
        page: 1
    })

    const [selectedValues, setSelectedValues] = useState([]);

    const [selectAll, setSelectAll] = useState(false);

    const [{ productCategories: records, total, numberOfPages, size, error: recordsErrors, loading }, getRecords] = useProductCategories({ params: { ...filters } }, { useCache: false });

    const [{ error: deleteError, loading: deleteLoading }, deleteRecord] = useAxios({ method: 'DELETE' }, { manual: true, useCache: false });

    useEffect(() => {
        getRecords({
            params: {
                ...filters
            }
        });
    }, [filters])

    useEffect(() => {
        setLoading?.({
            show: deleteLoading,
            message: 'Eliminando registros'
        })
    }, [deleteLoading])

    useEffect(() => {
        if (deleteError) {
            setCustomAlert({
                title: 'error',
                severity: 'error',
                message: 'Ha ocurrido un error al eliminar.',
                show: true
            });
        }

        if (recordsErrors) {
            setCustomAlert({
                title: 'error',
                severity: 'error',
                message: 'Ha ocurrido un error al obtener los registros.',
                show: true
            });
        }
    }, [deleteError, recordsErrors])

    useEffect(() => {
        if (selectAll) {
            setSelectedValues(records?.map?.((value) => value?.id))
        } else {
            setSelectedValues([])
        }
    }, [selectAll])

    const handleDelete = (value) => {
        deleteRecord({ url: `${deleteRecordBasePath}/${value?.id}` }).then((data) => {
            setCustomAlert({
                title: '¡Operación Exitosa!',
                severity: 'success',
                message: 'El registro ha sido eliminado exitosamente.',
                show: true
            });
            getRecords();
        })
    }

    const handleDeleteSelected = () => {
        deleteRecord({ url: `${deleteRecordBasePath}/multiple`, data: { ids: selectedValues } }).then((data) => {
            setCustomAlert({
                title: '¡Operación Exitosa!',
                severity: 'success',
                message: 'Los registros han sido eliminados exitosamente.',
                show: true
            });
            getRecords();
        });
    }

    const handleSelectALL = () => {
        setSelectAll((oldSelectAll) => !oldSelectAll);
    }

    const handleSelectValue = (selectedValue) => {
        const value = selectedValues?.includes(Number(selectedValue?.id));
        if (value) {
            const newValues = selectedValues?.filter(n => n !== Number(selectedValue?.id));
            setSelectedValues(newValues);
        } else {
            setSelectedValues((oldSelectedValues) => [...oldSelectedValues, Number(selectedValue?.id)])
        }
    }

    const handlePageChange = (event, page) => {
        if (page < 11 && page > 0) {
            setFilters((oldFilters) => {
                return {
                    ...oldFilters,
                    page: page
                }
            })
        }
    }

    return (
        <div>
            <Box textAlign={"right"} mb={4}>
                <Button href={`${basePath}/crear`} color="primary" variant="contained">
                    Crear Categoria
                </Button>
            </Box>
            <CustomTable
                onDeleteSelected={handleDeleteSelected}
                onSelectValue={handleSelectValue}
                onSelectAll={handleSelectALL}
                selectAll={selectAll}
                title={'Categorias'}
                updatePath={`${basePath}`}
                onDelete={handleDelete}
                selectedValues={selectedValues}
                pages={numberOfPages}
                total={total}
                perPage={size}
                values={records}
                currentPage={filters.page}
                collumns={ProductCategoriesColumns}
                loading={loading}
                changePage={handlePageChange}
            />
        </div>
    )
}

export default ProductCategories;