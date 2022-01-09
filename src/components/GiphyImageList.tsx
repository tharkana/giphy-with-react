
import * as React from 'react';
import { Container, ImageList, ImageListItem } from '@mui/material';
import { useImageFetch } from '../hooks/useImageFetch';
import { ImageModal } from './ImageModal';
import { IGif } from '@giphy/js-types';

interface GiphyImageListProps {
    searchQuery: string | undefined;
}

export const GiphyImageList: React.FunctionComponent<GiphyImageListProps> = ({ searchQuery }) => {

    const [open, setOpen] = React.useState(false);
    const [item, setItem] = React.useState<IGif>();

    const {
        loading,
        error: imageError,
        list: imageList,
        fetchMore,
    } = useImageFetch({ query: searchQuery });

    const loader = React.useRef<any>();


    const handleObserver = React.useCallback((entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
            fetchMore();
        }
    }, []);

    React.useEffect(() => {
        const option = {
            root: null,
            rootMargin: '20px',
            threshold: 0,
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader && loader.current) observer.observe(loader.current);
    }, [handleObserver]);

    const imageOnClick = (event: any) => {
        console.log(open);
        const item: IGif = JSON.parse(event.target.dataset.param);
        setItem(item);
        setOpen(true);
    }

    const modalHandleClose = () => {
        setOpen(false);
    }

    return (
        <Container>
            <ImageModal openModal={open} item={item} modalHandleClose={modalHandleClose}/>
            <ImageList variant="masonry" cols={4} gap={2} >
                {imageList.map((item) => (
                    <ImageListItem key={item.id}>
                        <img
                            data-param={JSON.stringify(item)}
                            onClick={imageOnClick}
                            src={item.images.downsized_medium.url}
                            height={item.images.downsized_medium.height}
                            width={item.images.downsized_medium.width}
                        />
                    </ImageListItem>
                ))}
            </ImageList>
            {loading && <p>Loading...</p>}
            {imageError && <p>Error!</p>}
            <div ref={loader} />
        </Container>

    );
}
