import { Box, Typography } from "@mui/material";
import CommentRow from "./CommentRow";

const CommentsBox = ({ comments }) => {
    return (
        <Box my={2}>
            <Typography variant="h4" textAlign={"center"} component="div">
                Comentarios
            </Typography>
            {
                comments?.length > 0 ?
                    comments?.map((comment, i) => {
                        return (
                            <CommentRow comment={comment} key={i} />
                        )
                    })
                    :
                    <Typography variant="h7" textAlign={"center"} color="red" component="div">
                        No hay comentarios aun.
                    </Typography>
            }
        </Box>
    )
}

export default CommentsBox;