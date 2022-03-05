import { Box, Button, CircularProgress, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const CommentsForm = ({ storeId, onAddComment }) => {

    const [{ data: commentData, loading: commentLoading }, createComment] = useAxios({ url: `/store-reviews`, method: 'POST' }, { manual: true, useCache: false });

    const [data, setData] = useState({
        content: "",
        store_id: ''
    });

    useEffect(() => {
        setData((oldData) => {
            return {
                ...oldData,
                store_id: storeId
            }
        })
    }, [storeId])

    useEffect(() => {
        if (commentData) {
            setData((oldData) => {
                return {
                    ...oldData,
                    content: ''
                }
            })
            onAddComment?.(commentData);
        }
    }, [commentData])

    const handleSubmit = (e) => {
        e.preventDefault?.();

        createComment({ data });

    }

    const handleChange = (e) => {
        setData((oldData) => {
            return {
                ...oldData,
                [e.target.name]: e.target.value
            }
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container alignItems={"center"} spacing={2}>
                <Grid item xs={12} sm={12} md={10}>
                    <TextField
                        fullWidth
                        name="content"
                        onChange={handleChange}
                        value={data?.content}
                        label="Comentario"
                    />
                </Grid>
                <Grid item xs={2} sm={2} md={2}>
                    <Box textAlign={"center"}>
                        <Button disabled={commentLoading || data?.content?.length === 0} type="submit" variant="contained">
                            {
                                commentLoading ?
                                    <CircularProgress />
                                    :
                                    'Enviar'
                            }
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </form>
    )
}

export default CommentsForm;