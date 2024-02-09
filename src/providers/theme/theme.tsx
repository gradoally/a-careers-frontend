import {createTheme} from "@mui/material/styles"

export const getTheme = (mode: "light" | "dark") => {
    return createTheme({
        palette: {
            common: {
                black: "#000015",
                white: "#fff"
            },
            primary: {
                main: "#000015",
            },
            secondary: {
                main: "#45AEF5", 
            },
            info: {
                main: "#3A4362"
            },
            warning: {
                main: "#00FF47"
            },
            background: {
                paper:  "#000015",
                default:  "#000015"
            },
            text: {
                primary: "#fff",
                secondary: "#45AEF5",
            },
            divider: "rgba(217, 217, 217, 0.2)",
        },
        typography: {
            fontFamily: '"Inter", serif',
            h4: {
                fontSize: "16px",
                fontWeight: "700",
            },
            h5: {
                fontSize: "14px",
                fontWeight: "700",
            },
            h6:{
                fontSize: "12px",
                fontWeight: "700"
            },
            body1: {
                fontWeight: 600,
                fontSize: "16px",
            },
            body2: {
                fontWeight: 400,
                fontSize: "12px",
            },
            button: {
                textTransform: "none"
            },
            caption: {
                opacity: "40%",
            }
        },
    })
}
