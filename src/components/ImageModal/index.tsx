
import * as React from 'react';
import { Card, CardContent, CardMedia, Grid, Link, Modal, Skeleton, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CodeIcon from '@mui/icons-material/Code';
import Box from '@mui/material/Box';
import { IGif } from '@giphy/js-types';
import './index.scss';



interface ImageModalProps {
    openModal: boolean;
    item: IGif;
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
    const [isLoading, setIsLoading] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
        modalHandleClose();
    };

    React.useEffect(() => {
        setOpen(openModal);
    }, [openModal]);

    const handleImageLoaded = () => {
        setIsLoading(false);
    }

    const size = Math.round(parseInt(item.images.original.mp4_size) / 1024);

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style as any}>


                <Card
                    sx={{ height: '90%', display: 'flex', flexDirection: 'column', p: 2 }}
                >

                    <Typography gutterBottom variant="h5" component="div">
                        {item?.title}
                    </Typography>
                    {isLoading &&
                        <div>
                            <Skeleton variant="rectangular"
                                height="100%"
                                width="100%" />
                        </div>
                    }
                    <CardMedia
                        onLoadedData={handleImageLoaded}
                        component="video"
                        height="100%"
                        width="100%"
                        image={item?.images.original.mp4}
                        autoPlay
                        loop
                        playsInline
                    />
                    <CardContent>
                        <Grid container direction='row'>
                            <Grid item xs={12} sx={{ mb: 1 }}> {item.images.original.height}x{item.images.original.width}px | {size}KB </Grid>
                            <Grid item xs={12} sx={{ mb: 1 }} >
                                <Grid container direction="row" alignItems="center">
                                    <ContentCopyIcon sx={{ mr: 1 }} />
                                    <Link
                                        component="button"
                                        variant="body2"
                                        onClick={() => {
                                            navigator.clipboard.writeText(item.bitly_url)
                                        }}
                                    >
                                        Copy URL
                                    </Link>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} >
                                <Grid container direction="row" alignItems="center">
                                    <CodeIcon sx={{ mr: 1 }} />
                                    <Link
                                        component="button"
                                        variant="body2"
                                        onClick={() => {
                                            navigator.clipboard.writeText(item.embed_url)
                                        }}
                                    >
                                        Copy Embedded URL
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

            </Box>
        </Modal>
    )
}