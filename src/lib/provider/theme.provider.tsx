"use client"

import React, {PropsWithChildren, useEffect, useState} from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import {createTheme, ThemeProvider as MuiThemeProvider} from '@mui/material/styles'

import {ToastContainer} from 'react-toastify';
import {ConfirmProvider} from 'material-ui-confirm'

import {getResolution} from '@/lib/helper'


export const getTheme = () => {
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
                paper: "#000015",
                default: "#000015"
            },
            text: {
                primary: "#fff",
                secondary: "#45AEF5",
            },
            divider: "rgba(217, 217, 217, 0.2)",
        },
        typography: {
            fontFamily: '"SF Pro Display", sans',
            h4: {
                fontSize: "16px",
                fontWeight: "700",
                lineHeight: "20px",
                // letterSpacing: "0",
            },
            h5: {
                fontSize: "14px",
                fontWeight: "600",
                // letterSpacing: "0",

            },
            h6: {
                fontSize: "12px",
                fontWeight: "700",
                // letterSpacing: "0",
            },
            body1: {
                fontWeight: 600,
                fontSize: "16px",
                // letterSpacing: "0",
            },
            body2: {
                fontWeight: 400,
                fontSize: "12px",
                // letterSpacing: "0",
            },
            button: {
                textTransform: "none"
            },
            caption: {
                color: "rgba(255, 255, 255, 0.4)",
                // opacity: "40%",
                // letterSpacing: "0",
            }
        },
    })
}


const ThemeProvider = ({children}: PropsWithChildren) => {
    const [themeLoaded, setThemeLoaded] = useState(false);
    const isMobile = getResolution() === 'MOBILE'


    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setThemeLoaded(true);
        }, 0);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);


    const theme = getTheme()

    if (!themeLoaded) {
        return null; // Render a loader or placeholder while the theme is loading
    }

    return (
        <MuiThemeProvider theme={theme}>
            <>

                <CssBaseline/>
                <ConfirmProvider
                    defaultOptions={{
                        title: "Are you sure?",
                        confirmationText: "Yes",
                        cancellationText: "Cancel",
                        confirmationButtonProps: {autoFocus: true, sx: {color: "common.white"}},
                        cancellationButtonProps: {  sx: {color: "common.white"}},
                    }}>
                {children}
                </ConfirmProvider>
                <ToastContainer
                    position={isMobile ? 'top-center' : 'top-right'}
                    pauseOnHover
                    hideProgressBar={false}
                    theme={"dark"}
                    toastStyle={{
                        zIndex: 500
                    }}
                />
            </>
        </MuiThemeProvider>
    )
}

export default ThemeProvider
