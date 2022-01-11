import React from 'react';
import { render } from '@testing-library/react';
import { GiphyImage } from './index';
import { mockTrendingGiphyResponse } from '../../__mocks__/imageMockData';
import { IGif } from '@giphy/js-types';

describe('test GiphyImage', () => {

    const imageData: IGif = mockTrendingGiphyResponse.data[0] as any;
    const mockOnClick = jest.fn();
    test('should render image', () => {
        const imageListItem = render(<GiphyImage image={imageData} onClick={mockOnClick} />);

        const renderedImage = imageListItem.queryByRole('img');
        expect(renderedImage).toHaveAttribute('src', imageData.images.downsized_medium.url);
    });
});