
import * as React from 'react';
import { Card, CardMedia, Modal } from '@mui/material';
import Box from '@mui/material/Box';
import { IGif } from '@giphy/js-types';

interface ImageModalProps {
    openModal: boolean;
    item: IGif | undefined;
    modalHandleClose: () => void;
}

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const ImageModal: React.FunctionComponent<ImageModalProps> = ({ openModal, item, modalHandleClose }) => {


    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
        modalHandleClose();
    };

    React.useEffect(() => {
        setOpen(openModal);
    }, [openModal]);


    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style as any}>


                <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column', p:2 }}
                >
                    <CardMedia
                        component="video"
                        height="100%"
                        width="100%"
                        image={item?.images.original.mp4}
                        autoPlay
                        loop
                        playsInline
                    />
                </Card>

            </Box>
        </Modal>
    )
}