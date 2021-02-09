import React, { useEffect, useState } from 'react';
const API_END_POINT = 'http://api.timezonedb.com/';

function TimeZoneDetails({ activeTimeZone }) {
    const [details, setDetails] = useState(null);
    useEffect(() => {
        let intervalId;
        if (activeTimeZone) {
            intervalId = setInterval(() => {
                fetch(`${API_END_POINT}v2/get-time-zone?key=XWSLLPX5RMIZ&format=json&by=zone&zone=${activeTimeZone.zoneName}`)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data?.status === 'OK') {
                            setDetails(data);
                        }
                    });
            }, 5000)
        }

        return () => {
            clearInterval(intervalId);
        }

    }, [activeTimeZone, useState])


    function renderDetails(dataRender) {
        if (dataRender) {
            const { abbreviation, countryCode, countryName, dstStart, formatted, gmtOffset, zoneName } = dataRender;
            return (
                <div>
                    <h3>{countryName}- {zoneName}</h3>
                    <ul>
                        <li>
                            <div><label>CountryCode</label>:    {countryCode}</div>
                        </li>
                        <li>
                            <div><label>Abbreviation</label>:    {abbreviation || 'N/A'}</div>
                        </li>
                        <li>
                            <div><label>DstStart</label>:    {dstStart}</div>
                        </li>
                        <li>
                            <div><label>Formatted</label>:    {formatted}</div>
                        </li>
                        <li>
                            <div><label>GmtOffset</label>:    {gmtOffset}</div>
                        </li>
                    </ul>
                </div>
            )
        }
        return null;
    }

    return (
        <div className="details">
            {
                renderDetails(details ? details : activeTimeZone)
            }
        </div>
    )
}

export default TimeZoneDetails;