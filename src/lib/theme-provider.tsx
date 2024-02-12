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
            fontFamily: '"Inter", serif',
            h4: {
                fontSize: "16px",
                fontWeight: "700",
                lineHeight: "20px",
            },
            h5: {
                fontSize: "14px",
                fontWeight: "700",
            },
            h6: {
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
            <CssBaseline/>
            <ConfirmProvider
                defaultOptions={{
                    title: "Are you sure?",
                    confirmationText: "Yes",
                    cancellationText: "Cancel",
                    confirmationButtonProps: {autoFocus: true}
                }}>
                {children}
            </ConfirmProvider>
            <ToastContainer
                position={isMobile ? 'top-center' : 'top-right'}
                pauseOnHover
                hideProgressBar={false}
                theme={"dark"}
                toastStyle={{
                    zIndex: 99999
                }}
            />
        </MuiThemeProvider>
    )
}

export default ThemeProvider
