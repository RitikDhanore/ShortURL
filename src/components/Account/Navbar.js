import { Button, Typography, AppBar, Toolbar, Box } from "@material-ui/core";

const Navbar = () => {
    return (
        <AppBar color="secondary" position="static">
                <Toolbar>
                    <Typography variant="h6">Shortly</Typography>
                    <Box ml="auto">
                        <Button color="inherit">Links</Button>
                        <Button color="inherit">Logout</Button> 
                    </Box>
                </Toolbar>
        </AppBar>
    );
};

export default Navbar;
