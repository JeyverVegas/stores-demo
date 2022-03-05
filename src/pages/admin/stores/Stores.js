import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import StoresColumns from "../../../components/admin/CustomTable/Columns/StoresColumns";
import CustomTable from "../../../components/admin/CustomTable/CustomTable";
import { useFeedBack } from "../../../context/FeedBackContext";
import useAxios from "../../../hooks/useAxios";
import useStores from "../../../hooks/useStores";

const Stores = () => {

    const { setCustomAlert, setLoading } = useFeedBack();

    const [filters, setFilters] = useState({
        page: 1
    })

    const [selectedValues, setSelectedValues] = useState([]);

    const [selectAll, setSelectAll] = useState(false);

    const [{ stores, total, numberOfPages, size, error: storesError, loading }, getStores] = useStores({ params: { ...filters } }, { useCache: false });

    const [{ error: deleteError, loading: deleteLoading }, deleteStore] = useAxios({ method: 'DELETE' }, { manual: true, useCache: false });

    useEffect(() => {
        getStores({
            params: {
                ...filters
            }
        });
    }, [filters])

    useEffect(() => {
        setLoading?.({
            show: deleteLoading,
            message: 'Eliminando tiendas'
        })
    }, [deleteLoading])

    useEffect(() => {
        if (deleteError) {
            setCustomAlert({
                title: 'error',
                severity: 'danger',
                message: 'Ha ocurrido un error al eliminar.',
                show: true
            });
        }

        if (storesError) {
            setCustomAlert({
                title: 'error',
                severity: 'danger',
                message: 'Ha ocurrido un error al obtener las tiendas.',
                show: true
            });
        }
    }, [deleteError, storesError])

    useEffect(() => {
        if (selectAll) {
            setSelectedValues(stores?.map?.((value) => value?.id))
        } else {
            setSelectedValues([])
        }
    }, [selectAll])

    const handleDelete = (value) => {
        deleteStore({ url: `/stores/${value?.id}` }).then((data) => {
            setCustomAlert({
                title: '¡Operación Exitosa!',
                severity: 'success',
                message: 'La tienda ha sido eliminada exitosamente.',
                show: true
            });
            getStores();
        })
    }

    const handleDeleteSelected = () => {
        deleteStore({ url: `/stores/multiple`, data: { ids: selectedValues } }).then((data) => {
            setCustomAlert({
                title: '¡Operación Exitosa!',
                severity: 'success',
                message: 'Las tiendas han sido eliminadas exitosamente.',
                show: true
            });
            getStores();
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
                <Button href="/admin/tiendas/crear" color="primary" variant="contained">
                    Crear Tienda
                </Button>
            </Box>

            <CustomTable
                onDeleteSelected={handleDeleteSelected}
                onSelectValue={handleSelectValue}
                onSelectAll={handleSelectALL}
                selectAll={selectAll}
                title={'Tiendas'}
                updatePath={"/admin/tiendas"}
                onDelete={handleDelete}
                selectedValues={selectedValues}
                pages={numberOfPages}
                total={total}
                values={stores}
                currentPage={filters.page}
                collumns={StoresColumns}
                loading={loading}
                changePage={handlePageChange}
            />
        </div>
    )
}

export default Stores;