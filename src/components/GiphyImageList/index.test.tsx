import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GiphyImageList } from './index';
import * as useImageFetchHook from '../../hooks/useImageFetch';


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
});