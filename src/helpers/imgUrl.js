const imgUrl = (imagePath) => {
    return `${process.env.REACT_APP_API_HOST}${imagePath}`
}

export default imgUrl;