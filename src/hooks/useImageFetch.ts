import { IGif } from '@giphy/js-types';
import { useState, useEffect, useCallback, useRef } from 'react';
import { LIMIT_PER_PAGE } from '../constant';
import { GiphyService } from '../services';

const hasMore = (totalCount: number, currentOffset: number | undefined) => (currentOffset === undefined || totalCount === 0 ||
    totalCount > (currentOffset * LIMIT_PER_PAGE + LIMIT_PER_PAGE));


export const useImageFetch = (
    {
        query,
    }: {
        query: string | undefined;
    }
) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [list, setList] = useState<Array<IGif>>([]);
    const [offset, setOffset] = useState(0);
    const currentQueryRef = useRef<string | undefined>();
    const currentOffSetRef = useRef<number | undefined>();
    const totalCountSetRef = useRef<number>(0);

    const sendQuery = useCallback(async () => {
        try {
            if (currentQueryRef.current !== query) {
                setList([]);
            }
            setLoading(true);
            setError(false);
            const res = await GiphyService.fetchGifs(offset, query);
            setLoading(false);

            if (
                currentQueryRef.current === query
            ) {
                setList((prev) => [...prev, ...res.data]);
            } else {
                currentQueryRef.current = query;
                setList(res.data);
            }
            currentOffSetRef.current = offset;
            totalCountSetRef.current = res.pagination.total_count;
        } catch (err) {
            setOffset(0);
            setError(true);
            setLoading(false);
        }
    }, [query, offset]);

    useEffect(() => {
        if (
            !(
                currentQueryRef.current === query &&
                currentOffSetRef.current === offset
            )
        ) {
            sendQuery();
        }
    }, [sendQuery, query, offset]);

    const fetchMore = useCallback(() => {
        if (hasMore(totalCountSetRef.current, currentOffSetRef.current)) {
            setOffset((prev) => prev + LIMIT_PER_PAGE);
        }
    }, []);

    return { loading, error, list, fetchMore };
}