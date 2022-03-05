import { Card, CardContent, CardHeader, CircularProgress, Typography, useTheme } from "@mui/material";

const InfoCard = ({ icon, title, color, value, loading }) => {

    const theme = useTheme();

    return (
        <Card>
            <CardHeader title={
                <div style={{ display: 'flex', alignItems: 'center', color: theme?.palette?.[color]?.main }}>
                    {icon}
                    {title}
                </div>
            } />
            <CardContent style={{ textAlign: 'center' }}>
                {
                    loading ?
                        <CircularProgress color={color} style={{ margin: 'auto' }} />
                        :
                        <Typography variant="h4" textAlign={"center"} style={{ color: theme?.palette?.[color]?.main }}>
                            {value}
                        </Typography>
                }
            </CardContent>
        </Card>
    )
}

export default InfoCard;