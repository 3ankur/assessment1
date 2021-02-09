import React, { useState } from "react";
import { apiStates, useApi } from "../hooks/useApi.jsx";
import TimeZoneDetails from "./timeZoneDetails";
const API_END_POINT = 'http://api.timezonedb.com/';
let firstLoad = false;
const CountryTimeZone = () =>{
   
    const {data,error,state} = useApi(`${API_END_POINT}v2.1/list-time-zone?key=XWSLLPX5RMIZ&format=json`);
    const [activeTimeZone,setTimeZone] = useState(null);
    const [isLoading, setLoading] = useState( firstLoad ? false : true);

    function setNewTimeZone(newZone){
        setLoading(true);
       fetch(`${API_END_POINT}v2/get-time-zone?key=XWSLLPX5RMIZ&format=json&by=zone&zone=${newZone.zoneName}`)
       .then((response) => response.json())
       .then((data) => {
           if (data?.status === 'OK') {
               setLoading(false);
               setTimeZone(data);
           }
       });
    }

    switch(state){
        case 'ERROR': 
        return <div>{error}</div>
        case 'SUCCESS' : 
            return (
                <div className="timezone" data-testid="timezone">
                    <div className="wrapper">
        
                        {
                            data.length ? (
                                <ul className="timezone__list" data-testid="list">
                                {
                                       data.map((zone) => {
                                        return(
                                            <li className={activeTimeZone ? (activeTimeZone.zoneName === zone.zoneName ? 'active' : '') : '' } key={zone.zoneName}  onClick={()=>  setNewTimeZone(zone)}>
                                            <div>{zone.zoneName}</div>
                                        </li>
                                        )
                                    })
                                }
                            </ul>
                            ) : null
                        }
                        {                   
                            !isLoading ?  ( <TimeZoneDetails   activeTimeZone={activeTimeZone}/>) : (firstLoad ) && 'loading.. ' 
                        }
        
                    </div>
        
                </div>
            )
            default:
                return <p>loading..</p>;
    }
}

export default CountryTimeZone;