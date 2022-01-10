import * as React from 'react';
import { IGif } from '@giphy/js-types';
import { ImageListItem, Skeleton } from '@mui/material';

interface GiphyImageProps {
    image: IGif;
    onClick: (image: IGif) => void;
}

export const GiphyImage: React.FunctionComponent<GiphyImageProps> = ({ image, onClick }) => {

    const [isLoading, setIsLoading] = React.useState(true);

    const handleImageLoaded = () => {
        setIsLoading(false);
    }

    const imageOnClick = (event: any) => {
        const item: IGif = JSON.parse(event.target.dataset.param);
        onClick(item);
    }

    return (
        <ImageListItem key={image.id} sx={{ cursor: 'pointer' }}>
            {isLoading &&
                <div>
                    <Skeleton variant="rectangular"
                        height={image.images.downsized_medium.height}
                        width={image.images.downsized_medium.width} />
                </div>
            }

            <img
                alt={image.title}
                onLoad={handleImageLoaded}
                data-param={JSON.stringify(image)}
                onClick={imageOnClick}
                src={image.images.downsized_medium.url}
                height={image.images.downsized_medium.height}
                width={image.images.downsized_medium.width}
            />

        </ImageListItem >
    )

}