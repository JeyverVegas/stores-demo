import { Container, Fade, Grid, Typography, Box } from "@mui/material";
import { useEffect, useState } from "react";
import StoreCard from "../../components/web/StoreCard";
import StoresCollection from "../../components/web/StoresCollection";
import { useFeedBack } from "../../context/FeedBackContext";
import useStores from "../../hooks/useStores";

const Home = () => {

    const { setCustomToast } = useFeedBack();

    const [filters, setFilters] = useState({
        name: '',
        page: 1,
        perPage: 9,
    });

    const [{ stores, total, numberOfPages, size, error, loading }, getStores] = useStores();

    const [currentStores, setCurrentStores] = useState([]);
    const [isEnded, setIsEnded] = useState(false);
    useEffect(() => {
        getStores({
            params: {
                ...filters
            }
        });
    }, [filters]);

    useEffect(() => {
        setCurrentStores((oldCurrentStores) => {
            return [...oldCurrentStores, ...stores]
        })
    }, [stores])

    const handleEnd = () => {
        if (filters.page < numberOfPages) {
            setFilters((oldFilters) => {
                return {
                    ...oldFilters,
                    page: oldFilters.page + 1
                }
            })
        } else {
            setIsEnded(true);
            if (!isEnded) {
                setCustomToast({
                    message: 'Estas son todas nuestras tiendas 😊',
                    severity: 'success',
                    show: true,
                    position: 'bottom-right'
                })
            }

        }
    }

    return (
        <Container>
            <Fade in timeout={4000}>
                <Box my={7}>
                    <Typography variant="h4" textAlign={"center"} component="div">
                        ¡Conoce todas Nuestras tiendas!
                    </Typography>
                    <Typography variant="h4" textAlign={"center"} component="div">
                        😊
                    </Typography>
                </Box>
            </Fade>
            <StoresCollection
                page={filters?.page}
                onReachEnd={handleEnd}
                stores={currentStores}
                total={total}
                loading={loading}
            />
        </Container>
    )
}

export default Home;