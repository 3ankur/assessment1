import React from "react";
import { renderHook } from '@testing-library/react-hooks';
import {useApi} from "./useApi.jsx";
const useApiFetchMock = {zones: [{ title: 'Hello1' }, { title: 'World1' }] };

const mockFetch = (mockData) => {
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        json: () => Promise.resolve(mockData)
    })
    );
}

const mockFetchError = (error) => {
    global.fetch = jest.fn().mockImplementation(() => Promise.reject(error));
};


const mockFetchCleanUp = () => {
    global.fetch.mockClear();
    delete global.fetch;
};

describe('useApi hook',()=>{
    test('should init with success state', async ()=>{
        mockFetch(useApiFetchMock);
        const {result, waitForNextUpdate} = renderHook(()=>useApi('testurl')) ;
        console.log(result.current)
        expect(result.current).toMatchObject(
            { state: 'LOADING', error: '', data: [] }
        )

         await waitForNextUpdate();
        console.log(result.current)
        expect(result.current).toMatchObject(
            {"data": [{"title": "Hello1"}, {"title": "World1"}], "error": "", "state": "SUCCESS"}
        )
        mockFetchCleanUp();
    })
})
