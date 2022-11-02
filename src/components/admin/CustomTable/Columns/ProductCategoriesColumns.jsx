import TableCheck from "../TableCheck";
import { format } from "date-fns";
import ActionDropdown from "../../../shared/ActionDropdown";

const ProductCategoriesColumns = [
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
        accessor: 'name'
    },
    {
        Label: () => 'Categoria Padre',
        Component: ({ value }) => `${value?.parentCategory?.name || '--'}`
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

export default ProductCategoriesColumns;

