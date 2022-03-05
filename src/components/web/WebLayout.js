import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import NavBar from "./WebNavbar";
const WebLayout = () => {
    return (
        <>
            <NavBar />
            <Outlet />
            <br></br>
            <br></br>
            <Footer />
        </>

    )
}

export default WebLayout;