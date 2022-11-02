import { Button, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ActionDropdown = ({ value, id, updatePath, onDelete, withOutUpdate, nameValue }) => {

    let navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        onDelete?.();
    }

    const handleUpdate = () => {
        navigate(`${updatePath}/${value?.id}?name=${value?.name || ''}`);
    }

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    version="1.1"
                >
                    <g
                        stroke="none"
                        strokeWidth={1}
                        fill="none"
                        fillRule="evenodd"
                    >
                        <rect x={0} y={0} width={24} height={24} />
                        <circle fill="#000000" cx={5} cy={12} r={2} />
                        <circle fill="#000000" cx={12} cy={12} r={2} />
                        <circle fill="#000000" cx={19} cy={12} r={2} />
                    </g>
                </svg>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleDelete}>Eliminar</MenuItem>
                {
                    !withOutUpdate ?
                        <MenuItem onClick={handleUpdate}>Actualizar</MenuItem>
                        :
                        null
                }
            </Menu>
        </div>
    )
}

export default ActionDropdown;