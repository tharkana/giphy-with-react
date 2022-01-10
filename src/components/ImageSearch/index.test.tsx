import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { ImageSearch } from './index';

jest.useFakeTimers();
describe('test ImageSearch', () => {
    test('should output input values', () => {
        const onSearchQueryChange = jest.fn();
        const imageSearch = render(<ImageSearch onSearchQueryChange={onSearchQueryChange} />);
        const input = imageSearch.getByTestId('image-search').querySelector('input');

        if (input) {
            fireEvent.change(input, { target: { value: 'Apple' } });
            jest.runAllTimers();
        }

        expect(onSearchQueryChange).toHaveBeenCalledWith("Apple");

    });
});