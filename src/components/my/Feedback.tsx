import * as React from 'react';
import Box from '@mui/material/Box';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import { Alert, AlertColor } from '@mui/material';

interface State extends SnackbarOrigin {
    open: boolean;
    message: string;
    severity: AlertColor;
}

export default function Feedback({ open, message, severity }: State) {
    const [state, setState] = React.useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'right',
        message: "",
        severity: "success",
    });
    const { vertical, horizontal, open: isOpen } = state;

    React.useEffect(() => {
        setState({ ...state, open });
    }, [open]);

    React.useEffect(() => {
        const validSeverity: AlertColor = ["success", "info", "warning", "error"].includes(severity) ? severity : "success";
        setState({ ...state, message, severity: validSeverity });
    }, [message, severity]);

    return (
        <>
            <Box
                sx={{
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    zIndex: 9999,
                }}
            >
                <Snackbar
                    anchorOrigin={{ vertical, horizontal }}
                    open={isOpen}
                    key={vertical + horizontal}
                >
                    <Alert severity={severity} sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
            </Box>
        </>
    );
}
