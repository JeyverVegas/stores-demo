import TableCheck from "../TableCheck";
import { format } from "date-fns";
import ImageAndName from "../../ImageAndName";
import ActionDropdown from "../../../shared/ActionDropdown";

const StoresColumns = [
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
        Label: () => 'Email',
        accessor: 'email'
    },
    {
        Label: () => 'Telefono',
        accessor: 'phoneNumber'
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

export default StoresColumns;

