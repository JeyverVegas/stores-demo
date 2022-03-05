import { Avatar } from "@mui/material";

const ImageAndName = ({ nameValue, imgValue }) => {

    let haveImage = false;

    if (imgValue !== '/storage/') haveImage = true;

    return (
        <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
            {
                haveImage ?
                    <Avatar alt={nameValue} src={`${process.env.REACT_APP_API_HOST}${imgValue}`} />
                    :
                    null
            }
            <span style={{ margin: '0px 5px' }}>{nameValue ? nameValue : ''}</span>
        </div>
    )
}

export default ImageAndName;