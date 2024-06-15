import React, { useState } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Viewer } from '@react-pdf-viewer/core';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const CardPreview = styled(Box)({
    // width: '100%',
    // height: '100%',
    // display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
});

const FullScreenDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
        backgroundColor: theme.palette.background.default,
        theme: theme,
        margin: 0,
        width: '100%',
        height: '100%',
        maxWidth: '100%',
        maxHeight: '100%',
        borderRadius: 0,
    },
}));

const PdfPreview = ({ pdfUrl }) => {
    const [open, setOpen] = useState(false);
    const defaultLayoutPluginInstance = defaultLayoutPlugin();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <CardPreview>
            <Button variant='contained' color='primary' onClick={handleClickOpen}>
                Lihat Preview PDF
            </Button>
            <FullScreenDialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.0.279/build/pdf.worker.min.js`}>
                        <Box
                            style={{
                                height: '100vh',
                                overflow: 'hidden',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <Viewer fileUrl={pdfUrl} plugins={[defaultLayoutPluginInstance]} theme="dark" defaultScale={1.0} />
                        </Box>
                    </Worker>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                        <HighlightOffIcon />
                    </Button>
                </DialogActions>
            </FullScreenDialog>
        </CardPreview>
    );
};

export default PdfPreview;
