import MuiDivider, {DividerProps} from '@mui/material/Divider';

const Divider = (props: DividerProps) => {
    return (
        <MuiDivider sx={{
            background: "var(--divider-gradient)",
            height: "1px",
            opacity: "30%",
            border: 'none',
        }}
                    orientation="horizontal"
                    flexItem
                    {...props}
        />
    )
}

export default Divider;
