import { Box, CircularProgress, Fade, Grid, Grow, Typography } from "@mui/material";
import { useCallback, useRef } from "react";
import StoreCard from "./StoreCard";

const StoresCollection = ({ stores, loading, total, onReachEnd, page }) => {

    const observer = useRef();

    const lastStoreRef = useCallback((store) => {
        if (observer?.current) observer?.current?.disconnect?.();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                onReachEnd?.();
            }
        })
        if (store) observer?.current?.observe?.(store)
    }, [stores, onReachEnd]);


    return (
        <Grid container spacing={2} justifyContent={{ md: "center" }}>
            {
                stores?.map((store, i) => {
                    return (
                        <Grow
                            key={i}
                            in={true}
                            timeout={Number(`${page}000`)}
                            style={{ transformOrigin: '0 0 0' }}
                        >
                            <Grid
                                ref={i + 1 === stores.length ? lastStoreRef : null}
                                item
                                md={4}
                                xs={12}
                                sm={6}
                            >
                                <StoreCard
                                    id={store?.id}
                                    name={store?.name}
                                    imagePath={store?.image_path}
                                    createdAt={store?.created_at}
                                    phoneNumber={store?.phone_number}
                                    email={store?.email}
                                    address={store?.address}
                                />
                            </Grid>
                        </Grow>
                    )
                })
            }
            {
                loading &&
                <Fade in={loading} timeout={1000}>
                    <Grid item xs={12} md={12}>
                        <Box textAlign={"center"}>
                            <Typography variant="h5" color={"primary"}>
                                Obteniendo Tiendas
                            </Typography>
                            <CircularProgress color="primary" />
                        </Box>
                    </Grid>
                </Fade>
            }
        </Grid >
    )
}

export default StoresCollection;