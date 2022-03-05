import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import MailIcon from '@mui/icons-material/Mail';
import { Link, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { format } from 'date-fns';



const StoreCard = ({ id, name, createdAt, imagePath, phoneNumber, email, address }) => {

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardHeader
                title={
                    <Link href={`/tiendas/${name}?id=${id}`}>
                        {name}
                    </Link>
                }
                subheader={`Se Registro el: ${format(new Date(createdAt), 'dd/MM/yyyy')}`}
            />
            <CardMedia
                component="img"
                height="194"
                image={`${process.env.REACT_APP_API_HOST}${imagePath}`}
                alt={name}
            />
            <CardContent style={{ padding: 0 }}>
                <List>
                    <ListItem>
                        <ListItemIcon>
                            <PhoneAndroidIcon />
                        </ListItemIcon>
                        <ListItemText primary={phoneNumber} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <MailIcon />
                        </ListItemIcon>
                        <ListItemText primary={email} />
                    </ListItem>
                    <ListItem>
                        <ListItemIcon>
                            <LocationOnIcon />
                        </ListItemIcon>
                        <ListItemText primary={address} />
                    </ListItem>
                </List>
            </CardContent>
        </Card>
    );
}

export default StoreCard;
