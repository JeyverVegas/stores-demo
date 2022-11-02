import { useEffect, useState } from "react"
import update from 'immutability-helper';
import { Box, Button, Grid } from "@mui/material";
import imgUrl from "../../helpers/imgUrl";
import useAxios from "../../hooks/useAxios";
import ImgUploadInput from "../shared/ImgUploadInput";

const ImageCrudComponent = ({ defaultImages, ownerId, title, modelName }) => {

    const [currentImages, setCurrentImages] = useState([]);

    const [{ loading: createLoading }, createImage] = useAxios({ url: `/${modelName}/${ownerId}/images`, method: 'POST' }, { manual: true, useCache: false });

    const [{ loading: deleteLoading }, deleteImage] = useAxios({ method: 'DELETE' }, { manual: true, useCache: false });

    useEffect(() => {
        setCurrentImages(defaultImages);
    }, [defaultImages]);


    const handleAddImage = () => {
        if (createLoading || deleteLoading) return;
        setCurrentImages((oldImages) => {
            return [...oldImages, null]
        });
    }

    const onImageChange = (e, i, image) => {
        if (createLoading || deleteLoading) return;
        const data = new FormData();
        data.append('image', e.target?.files[0], e.target?.files[0].name)
        createImage({ data }).then((res) => {
            console.log(res);
            const { path, id, ...rest } = res?.data?.data;
            const imageCreated = {
                id,
                path: imgUrl(path)
            }
            var newArrayValues = update(currentImages, { [i]: { $set: imageCreated } });
            setCurrentImages(newArrayValues)
        })
    }

    const removeImage = (index, imageId) => {

        if (createLoading || deleteLoading) return;

        if (!imageId) {
            currentImages?.splice(index, 1);
            setCurrentImages([...currentImages])
            return;
        }

        deleteImage({ url: `/${modelName}/${ownerId}/images/${imageId}` })
            .then((resp) => {
                currentImages?.splice(index, 1);
                setCurrentImages([...currentImages]);
            })
    }

    return (
        <Box mb={8} pb={4}>
            <h3>
                {title}
            </h3>
            {
                createLoading || deleteLoading ?
                    <p>
                        {createLoading ? 'Añadiendo Imagen...' : null}
                        {deleteLoading ? 'Eliminando Imagen...' : null}
                    </p>
                    :
                    null
            }
            <Grid container spacing={4} alignItems="center">
                {
                    currentImages?.map((image, i) => {
                        return (
                            <Grid item xs={3} textAlign="center" key={i}>
                                <ImgUploadInput
                                    disabled={image?.id}
                                    previewImage={image?.path}
                                    name="images"
                                    change={(e) => { onImageChange(e, i, image) }}
                                />
                                <br />
                                <Button type="button" disabled={deleteLoading || createLoading} variant="contained" color="error" onClick={() => { removeImage(i, image?.id) }}>
                                    Remover
                                </Button>
                            </Grid>
                        )
                    })
                }
                <Grid item xs={3}>
                    <Button disabled={createLoading || deleteLoading} onClick={handleAddImage} variant="contained" color="primary">
                        Añadir Imagen
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ImageCrudComponent;