import React from 'react'
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Style from './Style.module.scss'

type Props = {
    children?: any
    title?: string;
    text?: string;
    isOpen: boolean;
    setIsOpen: any
}

const Modal = ({ children, title, text, isOpen, setIsOpen }: Props) => {

    const handleClose = () => {
        setIsOpen(false);
    };
    return (
        <>
            <Dialog open={isOpen} onClose={handleClose} dir="rtl"
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: "100%",
                            maxWidth: "500px",
                        },
                    },
                }}
            >
                <DialogTitle className={`${Style['modal']} text-center mt-4`}>{title}</DialogTitle>
                <DialogContent className={Style['modal']}>
                    <DialogContentText >
                        {text}
                    </DialogContentText>
                    {children}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Modal