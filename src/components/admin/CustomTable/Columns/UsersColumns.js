import ImageAndName from "../../ImageAndName";
import TableCheck from "../TableCheck";
import { format } from "date-fns";
import ActionDropdown from "../../../shared/ActionDropdown";

const UsersColumns = [
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
        Label: () => 'Fecha de Creación',
        Component: ({ value }) => format(new Date(value?.createdAt), 'dd/MM/yyyy')
    },
    {
        Label: () => 'Acciones',
        Component: ActionDropdown
    }
];

export default UsersColumns;

