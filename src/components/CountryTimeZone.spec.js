
import React from "react";
import renderer from "react-test-renderer";
import { useApi } from "../hooks/useApi.jsx";
import CountryTimeZone from "./CountryTimeZone";
import { render, waitFor, screen } from "@testing-library/react"

jest.mock('../hooks/useApi.jsx', () => ({
    useApi: () => ({
        state: 'SUCCESS',
        error: '',
        data: [{
            'countryCode': "AD",
            'countryName': "Andorra",
            'gmtOffset': 3600,
            'timestamp': 1612780836,
            'zoneName': "Europe/Andorra"
        }]
    })
}));

describe.only("List Timezone snapshot", () => {
    test('loading renders correctly', () => {
        const { getByTestId } = render(<CountryTimeZone />)
        expect(getByTestId('list')).toBeDefined();
        //for snapshot
        const tree  = renderer.create(<CountryTimeZone />).toJSON();
        console.log(tree)
        expect(tree).toMatchSnapshot();
    })
})