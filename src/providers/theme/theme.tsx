import {createTheme} from "@mui/material/styles"

export const getTheme = (mode: "light" | "dark") => {
    return createTheme({
        palette: {
            mode,
            common: {
                black: "#000015",
                white: "#fff"
            },
            primary: {
                main: "#000015",
                contrastText: "#fff"
            },
            secondary: {
                main: "#45AEF5", 
                contrastText: "#fff"
            },
            info: {
                main: "#3A4362"
            },
            warning: {
                main: "#00FF47"
            },

            background: {
                paper: mode === "dark" ? "#000015" : "#fcfcfc",
                default: mode === "dark" ? "#000015" : "#F6F8FA"
            },
            text: {
                primary: "#fff",
                secondary: "#45AEF5",
            },
            divider: "rgba(217, 217, 217, 0.2)"
        },

        typography: {
            fontFamily: '"Inter", serif',
            h4: {
                fontSize: "16px",
                fontWeight: "700",
                lineHeight: "25px",
            },
            h5: {
                fontSize: "14px",
                fontWeight: "600",
                lineHeight: "30px",
            },
            h6:{
                fontSize: "12px",
                lineHeight: "20px",
                fontWeight: "700"
            },
            body1: {
                fontWeight: 600,
                fontSize: "16px",
                // color: "#45AEF5",
            },
            body2: {
                fontWeight: 400,
                fontSize: "12px",
                lingHeight: "20px",
            },
            button: {
                textTransform: "none"
            },
            caption: {
                opacity: "40%",
                // lineHeight: "15px"
            }
        },
    })
}
