import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import imgUrl from "../../helpers/imgUrl";

const ImageAndName = ({ value }) => {

    const [imagePath, setImagePath] = useState('');

    useEffect(() => {
        if (value?.images?.length > 0) setImagePath(imgUrl(value?.images?.[0]?.path));
        if (value?.imagePath) setImagePath(imgUrl(value?.imagePath));
    }, [value]);

    return (
        <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center' }}>
            {
                imagePath ?
                    <Avatar alt={value?.name} src={`${imagePath}`} />
                    :
                    null
            }
            <span style={{ margin: '0px 5px' }}>{value?.name || ''}</span>
        </div>
    )
}

export default ImageAndName;