import { GifsResult, GiphyFetch } from '@giphy/js-fetch-api'
import isNill from 'lodash/isNil';

import { GIPHY_TOKEN, LIMIT_PER_PAGE } from '../constant';

const GIPHY_FETCH = new GiphyFetch(GIPHY_TOKEN as string);

export const fetchGifs = async (offset: number, query?: string)  => {
    let results: GifsResult;
    if(isNill(query)){
        results = await GIPHY_FETCH.trending({ offset, limit: LIMIT_PER_PAGE })
    }else {
        results = await GIPHY_FETCH.search(query, { offset, limit: LIMIT_PER_PAGE })
    }

    return results;
}
