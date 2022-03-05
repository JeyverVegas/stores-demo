import CustomTableBodyCollumn from "./CustomTableBodyCollumn";
import CustomTableBodyRow from "./CustomTableBodyRow";
import CustomTableHeadColumn from "./CustomTableHeadColumn";
import swal from "sweetalert";
import { Card, CardContent, CardHeader, Grid, Pagination, Stack, Table, TableBody, TableHead, TableRow, Typography } from "@mui/material";
import ActionDropdown from "../../shared/ActionDropdown";
import { Box } from "@mui/system";

const CustomTable = ({
    title,
    values = [],
    total = 0,
    pages,
    onDeleteSelected,
    currentPage,
    collumns,
    updatePath,
    selectedValues,
    onDelete,
    onSelectAll,
    selectAll,
    onSelectValue,
    changePage,
    loading
}) => {

    const handleDeleteSelected = () => {
        swal({
            title: "¿Estas Seguro?",
            text: "¿Quieres eliminar todos los registros seleccionados?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                onDeleteSelected?.();
            } else {

            }
        })
    }

    return (

        <Card>
            <CardContent>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h5">{title}</Typography>
                    {
                        selectedValues?.length > 0 ?
                            <div style={{ textAlign: 'right' }}>
                                <span>Acciones Globales</span>
                                <ActionDropdown withOutUpdate onDelete={handleDeleteSelected} />
                            </div>
                            :
                            <Typography color={"red"}>Debe seleccionar al menos un registro.</Typography>
                    }
                </div>
                <Table>
                    <TableHead>
                        <TableRow>
                            {
                                collumns?.map(({ Label }, i) => {
                                    return (
                                        <CustomTableHeadColumn key={i}>
                                            {
                                                <Label checked={selectAll} onChange={() => { onSelectAll?.() }} />
                                            }
                                        </CustomTableHeadColumn>
                                    )
                                })
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            loading ?
                                <CustomTableBodyRow>
                                    <CustomTableBodyCollumn align={"center"} className="text-center" colSpan={collumns?.length}>
                                        <h3>Cargando...</h3>
                                    </CustomTableBodyCollumn>
                                </CustomTableBodyRow>
                                :
                                values?.length > 0 ?
                                    values?.map((value, i) => {
                                        return (
                                            <CustomTableBodyRow key={i}>
                                                {
                                                    collumns?.map(({ Component, accessor }, i2) => {
                                                        return (
                                                            <CustomTableBodyCollumn key={i2}>
                                                                {
                                                                    Component ?
                                                                        <Component
                                                                            id={value?.id}
                                                                            updatePath={updatePath}
                                                                            positionName={value?.position?.name}
                                                                            serviceName={value?.service?.name}
                                                                            roleName={value?.role?.name}
                                                                            nameValue={value?.name}
                                                                            date={value?.created_at}
                                                                            imgValue={`${value?.image_path}`}
                                                                            parentCategory={value?.parentCategory}
                                                                            categoryName={value?.category?.name}
                                                                            documentNumberValue={value?.documentNumber}
                                                                            phoneNumberValue={value?.phone_number}
                                                                            onChange={() => { onSelectValue?.(value) }}
                                                                            onDelete={() => { onDelete?.(value) }}
                                                                            checked={selectedValues?.includes(value?.id)}
                                                                        />
                                                                        :
                                                                        accessor ?
                                                                            value[accessor]
                                                                            :
                                                                            null
                                                                }
                                                            </CustomTableBodyCollumn>
                                                        );
                                                    })
                                                }
                                            </CustomTableBodyRow>
                                        )
                                    })
                                    :
                                    <CustomTableBodyRow>
                                        <CustomTableBodyCollumn align={"center"} className="text-center" colSpan={collumns?.length}>
                                            <h3>No hay registros</h3>
                                        </CustomTableBodyCollumn>
                                    </CustomTableBodyRow>
                        }
                    </TableBody>
                </Table>
            </CardContent>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box p={2}>
                    <Typography>
                        Mostrando del {`${currentPage - 1}1 al ${currentPage - 1}${values?.length}`} de {currentPage > 1 ? total : `${currentPage - 1}${total}`}
                    </Typography>
                </Box>
                <Box p={2} textAlign={"center"}>
                    <Pagination count={pages} color="primary" page={currentPage} onChange={changePage} />
                </Box>
            </div>
        </Card>

    );
};

export default CustomTable;
