import { Grid, useTheme } from "@mui/material";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import ChatIcon from '@mui/icons-material/Chat';
import InfoCard from "../../components/admin/InfoCard";
import { useEffect } from "react";
import useStores from "../../hooks/useStores";
import useUsers from "../../hooks/useUsers";
import useAxios from "../../hooks/useAxios";

const Dashboard = () => {

    const [{ total: usersTotal, loading: loadingUsers }, getUsers] = useUsers({ options: { useCache: false } });
    const [{ total: storesTotal, loading: loadingStores }, getStores] = useStores({ options: { useCache: false } });
    const [{ data: commentsCount, loading: commentsCountsLoading }, getCommentsCount] = useAxios({ url: `/store-reviews/count` }, { useCache: false });

    useEffect(() => {
        if (commentsCount) {
            console.log(commentsCount)
        }
    }, [commentsCount])

    return (
        <div>
            <Grid container spacing={4} justifyContent="space-between">
                <Grid item xs={4} md={4}>
                    <InfoCard
                        icon={<AddBusinessIcon />}
                        title={'Tiendas registradas'}
                        color="success"
                        value={storesTotal}
                        loading={loadingStores}
                    />
                </Grid>
                <Grid item xs={4} md={4}>
                    <InfoCard
                        icon={<ChatIcon />}
                        title={'Comentarios'}
                        color="warning"
                        value={commentsCount?.count}
                        loading={commentsCountsLoading}
                    />
                </Grid>
                <Grid item xs={4} md={4}>
                    <InfoCard
                        icon={<GroupAddIcon />}
                        title={'Administradores'}
                        color="primary"
                        value={usersTotal}
                        loading={loadingUsers}
                    />
                </Grid>
            </Grid>
        </div >
    )
}

export default Dashboard;