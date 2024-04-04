import { Box } from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

export function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ paddingTop: "20px" }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
        sx: {
            height: "50px",
            width: "155px",
            fontSize: "11px",
            fontWeight: 400,
            lineHeight: "20px",
            letterSpacing: "0.0666em",
            textAlign: "center",
            textTransform: "uppercase",
            '&:hover': {
                color: 'info.main',
                opacity: 1,
            },
            '&.Mui-selected': {
                color: 'common.white',
            },
            '&.Mui-focusVisible': {
                backgroundColor: 'common.white',
            },
        },
        variant: "fullWidth",
    };
}