import { Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";

const LoadingComponent = ({ message, show }) => {

    const theme = useTheme();

    const [dots, setDots] = useState("");

    useEffect(() => {
        let id;

        if (show) {
            id = setInterval(() => {
                setDots((oldDots) => oldDots.length < 3 ? oldDots + "." : "");
            }, 500);
        }

        return () => {
            if (id) clearInterval(id);
        }
    }, [show]);

    return (
        show ?
            <div style={{ zIndex: 99, background: 'rgba(255,255,255, .5)', width: '100%', height: '100%', display: 'flex', position: 'fixed', justifyContent: 'center', alignItems: 'center' }}>
                <div>
                    <div className="spinner">
                        <div className="double-bounce1" style={{ backgroundColor: theme.palette.primary.main }}></div>
                        <div className="double-bounce2" style={{ backgroundColor: theme.palette.primary.main }}></div>
                    </div>
                    <Typography variant="h4" textAlign={"center"}>{message}{dots}</Typography>
                </div>
            </div>
            :
            null
    )
}

export default LoadingComponent;