import TableCheck from "../TableCheck";
import { format } from "date-fns";
import ImageAndName from "../../ImageAndName";
import ActionDropdown from "../../../shared/ActionDropdown";

const ProductsColumns = [
    {
        Label: TableCheck,
        Component: TableCheck
    },
    {
        Label: () => 'id',
        accessor: 'id'
    },
    {
        Label: () => 'Nombre',
        Component: ImageAndName
    },
    {
        Label: () => 'Referencia',
        Component: ({ value }) => `${value?.reference || '--'}`
    },
    {
        Label: () => 'Precio',
        Component: ({ value }) => `${value?.price}$`
    },
    {
        Label: () => 'Categoría',
        Component: ({ value }) => `${value?.category?.name || '--'}`
    },
    {
        Label: () => 'Sub Categoría',
        Component: ({ value }) => `${value?.subCategory?.name || '--'}`
    },
    {
        Label: () => 'Fecha de Creación',
        Component: ({ value }) => format(new Date(value?.createdAt), 'dd/MM/yyyy')
    },
    {
        Label: () => 'Acciones',
        Component: ActionDropdown
    }
];

export default ProductsColumns;

