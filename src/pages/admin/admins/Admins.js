import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import UsersColumns from "../../../components/admin/CustomTable/Columns/UsersColumns";
import CustomTable from "../../../components/admin/CustomTable/CustomTable";
import { useFeedBack } from "../../../context/FeedBackContext";
import useAxios from "../../../hooks/useAxios";
import useUsers from "../../../hooks/useUsers";

const Admins = () => {

    const { setCustomAlert, setLoading } = useFeedBack();

    const [filters, setFilters] = useState({
        page: 1
    })

    const [selectedValues, setSelectedValues] = useState([]);

    const [selectAll, setSelectAll] = useState(false);

    const [{ users, total, numberOfPages, size, error: usersError, loading }, getUsers] = useUsers({ params: { ...filters } }, { useCache: false });

    const [{ error: deleteError, loading: deleteLoading }, deleteUser] = useAxios({ method: 'DELETE' }, { manual: true, useCache: false });

    useEffect(() => {
        getUsers({
            params: {
                ...filters
            }
        });
    }, [filters])

    useEffect(() => {
        setLoading?.({
            show: deleteLoading,
            message: 'Eliminando Usuario(s)'
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

        if (usersError) {
            setCustomAlert({
                title: 'error',
                severity: 'danger',
                message: 'Ha ocurrido un error al obtener los administradores.',
                show: true
            });
        }
    }, [deleteError, usersError])

    useEffect(() => {
        if (selectAll) {
            setSelectedValues(users?.map?.((value) => value?.id))
        } else {
            setSelectedValues([])
        }
    }, [selectAll])

    const handleDelete = (value) => {
        deleteUser({ url: `/users/${value?.id}` }).then((data) => {
            setCustomAlert({
                title: '¡Operación Exitosa!',
                severity: 'success',
                message: 'El Administrador ha sido eliminada exitosamente.',
                show: true
            });
            getUsers();
        })
    }

    const handleDeleteSelected = () => {
        deleteUser({ url: `/users/multiple`, data: { ids: selectedValues } }).then((data) => {
            setCustomAlert({
                title: '¡Operación Exitosa!',
                severity: 'success',
                message: 'Los administradores han sido eliminados exitosamente.',
                show: true
            });
            getUsers();
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
                <Button href="/admin/administradores/crear" color="primary" variant="contained">
                    Crear Administrador
                </Button>
            </Box>

            <CustomTable
                onDeleteSelected={handleDeleteSelected}
                onSelectValue={handleSelectValue}
                onSelectAll={handleSelectALL}
                selectAll={selectAll}
                title={'Administradores'}
                updatePath={"/admin/administradores"}
                onDelete={handleDelete}
                selectedValues={selectedValues}
                pages={numberOfPages}
                total={total}
                values={users}
                currentPage={filters.page}
                collumns={UsersColumns}
                loading={loading}
                changePage={handlePageChange}
            />
        </div>
    )
}

export default Admins;