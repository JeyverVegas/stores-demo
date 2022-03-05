import { Typography, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import { format } from "date-fns";

const CommentRow = ({ comment }) => {

    const theme = useTheme();

    return (
        <Box py={2} style={{ borderBottom: `1px solid ${theme?.palette?.grey[500]}` }}>
            <Typography>
                {comment?.content}
            </Typography>
            <Typography textAlign={"right"} style={{ color: theme?.palette?.grey[500] }}>
                {
                    format(new Date(comment?.created_at), 'hh:mm:ss b dd/MM/yyyy')
                }
            </Typography>
        </Box>
    )
}

export default CommentRow;