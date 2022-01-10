import * as React from 'react';
import { Container, ImageList } from '@mui/material';
import { useImageFetch } from '../hooks/useImageFetch';
import { ImageModal } from './ImageModal';
import { IGif } from '@giphy/js-types';
import { GiphyImage } from './GiphyImage';

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
    }, [fetchMore]);

    React.useEffect(() => {
        const option = {
            root: null,
            rootMargin: '20px',
            threshold: 0,
        };
        const observer = new IntersectionObserver(handleObserver, option);
        if (loader && loader.current) observer.observe(loader.current);
    }, [handleObserver]);

    const imageOnClick = (item: IGif) => {
        setItem(item);
        setOpen(true);
    }

    const modalHandleClose = () => {
        setOpen(false);
    }

    return (
        <Container>
            {
                item &&  <ImageModal openModal={open} item={item} modalHandleClose={modalHandleClose} />
            }
            <ImageList variant="masonry" cols={4} gap={2} >
                {imageList.map((item) => (
                    <GiphyImage
                        key={item.id as string}
                        image={item}
                        onClick={imageOnClick}
                    />
                ))}
            </ImageList>
            {loading && <p>Loading...</p>}
            {imageError && <p>Error!</p>}
            <div ref={loader} />
        </Container>

    );
}
