"use client"

import React, {PropsWithChildren, useEffect, useState} from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import {ThemeProvider as MuiThemeProvider} from '@mui/material/styles'

import {ToastContainer} from 'react-toastify';
import {
    // parseCookies,
     setCookie} from 'nookies';
import {ConfirmProvider} from 'material-ui-confirm'

import {COOKIE_ENABLE_SECURE, COOKIE_DEFAULT_AGE, COOKIE_PATH, COOKIE_SAME_SITE, COOKIE_THEME} from '@/lib/constants'
import {getResolution} from '@/lib/helper'

import {ThemeContextType} from './index';
import {getTheme} from './theme';


const ThemeContext = React.createContext<ThemeContextType>({
    mode: 'light',
    toggleTheme: () => undefined, 
    toggleDrawer: (value: boolean) => undefined,
    isDrawerOpen: false,
})

const ThemeProvider = ({children}: PropsWithChildren) => {
    const [themeLoaded, setThemeLoaded] = useState(false);
    const [themeMode, setThemeMode] = React.useState<'light' | 'dark'>("dark")
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

    const isMobile = getResolution() === 'MOBILE'

    useEffect(() => {
        // const cookies = parseCookies({})

        // const initialThemeMode = cookies[COOKIE_THEME]
        // if (!initialThemeMode) {
        //     setThemeModeCookie('dark')
        // } else if (initialThemeMode !== 'dark') {
        //     setThemeMode('light')
        // }

    }, [])

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setThemeLoaded(true);
        }, 0);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);


    const setThemeModeCookie = (mode: string) => {
        setCookie({}, COOKIE_THEME, mode, {
            path: COOKIE_PATH,
            maxAge: COOKIE_DEFAULT_AGE,
            secure: COOKIE_ENABLE_SECURE,
            sameSite: COOKIE_SAME_SITE,
        })
    }


    const toggleTheme = () => {
        // const mode = themeMode === 'light' ? 'dark' : 'light'
        // setThemeMode(mode)
        // setThemeModeCookie(mode)
    }

    const toggleDrawer = (value: boolean)=>{
        console.log("value", value)
        setIsDrawerOpen(value)
    }

    const theme = getTheme(themeMode)

 

    const memoValue = React.useMemo(
        () => ({
            mode: themeMode,
            toggleTheme,
            isDrawerOpen: isDrawerOpen, 
            toggleDrawer,
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [themeMode, isDrawerOpen]
    )

    if (!themeLoaded) {
        return null; // Render a loader or placeholder while the theme is loading
    }

    return (
        <ThemeContext.Provider value={memoValue}>
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
                    theme={memoValue.mode}
                    toastStyle={{
                        zIndex: 99999
                    }}
                />
            </MuiThemeProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider

export const useThemeContext = (): ThemeContextType => {
    const context = React.useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useThemeContext must be used within a AppThemeProvider')
    }
    return context
}
