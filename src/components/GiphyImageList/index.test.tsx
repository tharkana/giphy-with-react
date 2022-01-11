import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { GiphyImageList } from './index';
import * as useImageFetchHook from '../../hooks/useImageFetch';
import { mockTrendingGiphyResponse } from '../../__mocks__/imageMockData';


const mockFetchMoreFn = jest.fn()

const mockHookReturnObject = {
    loading: false,
    error: false,
    list: [],
    fetchMore: mockFetchMoreFn,
};

describe('test GiphyImageList', () => {

    const searchQuery = "";

    test('should show loading message when data is loading', () => {
        jest.spyOn(useImageFetchHook, 'useImageFetch').mockImplementation(() => ({
            ...mockHookReturnObject,
            loading: true
        }));
        const imageList = render(<GiphyImageList searchQuery={searchQuery} />);


        expect(imageList.getByText("Loading...")).toBeInTheDocument();

    });

    test('should hide loading message when data is loaded', async () => {
        jest.spyOn(useImageFetchHook, 'useImageFetch').mockImplementation(() => ({
            ...mockHookReturnObject,
            loading: false
        }));
        const imageList = render(<GiphyImageList searchQuery={searchQuery} />);

        const loadingComponent = imageList.queryAllByText("Loading...");

        expect(loadingComponent.length).toEqual(0);

    });

    test('should readner image list', async () => {
        jest.spyOn(useImageFetchHook, 'useImageFetch').mockImplementation(() => ({
            ...mockHookReturnObject,
            list: mockTrendingGiphyResponse.data as any,
        }));
        const imageList = render(<GiphyImageList searchQuery={searchQuery} />);

        const renderedImageList = imageList.queryAllByRole('img');

        expect(renderedImageList.length).toEqual(mockTrendingGiphyResponse.data.length);
    });

    test('should open modal when user click the image', async () => {
        jest.spyOn(useImageFetchHook, 'useImageFetch').mockImplementation(() => ({
            ...mockHookReturnObject,
            list: mockTrendingGiphyResponse.data as any,
        }));
        const imageList = render(<GiphyImageList searchQuery={searchQuery} />);

        const renderedImageList = imageList.queryAllByRole('img');

        const firstImage = renderedImageList[0];

        expect(firstImage).toBeInTheDocument();

        fireEvent.click(firstImage);

        expect(screen.getByText(mockTrendingGiphyResponse.data[0].title)).toBeInTheDocument();
        
    });
});