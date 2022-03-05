import { AppBar, Container, Toolbar } from "@mui/material";
import CopyRight from "../shared/CopyRight";

const Footer = () => {
    return (
        <AppBar position="static" style={{ marginTop: '30vh' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <CopyRight color="white" />
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Footer;