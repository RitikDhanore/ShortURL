import { unstable_createMuiStrictModeTheme as createTheme } from "@material-ui/core";

export default createTheme({
    palette: {
        primary:{
            main: "#56B7BA",
            contrastText: "#fff",
        },
        secondary:{
            main: "#03142F",
        },
    },
    typography:{
        fontFamily: 'Poppins , sans-serif',
        button:{
            textTransform: "capitalize",
        },
        h4:{
            fontWeight: 600,
        }
    },
});