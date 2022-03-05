import { Link, Typography } from "@mui/material";

const CopyRight = ({ color, ...rest }) => {
    return (
        <Typography variant="body2" color={color ? color : "text.secondary"} align="center" {...rest}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">

            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default CopyRight;