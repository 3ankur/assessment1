import React  from "react";

export const apiStates = {
    'LOADING': 'LOADING',
    'SUCCESS': 'SUCCESS',
    'ERROR': 'ERROR',
};

export const useApi = (url)=>{
    const [data,setData] = React.useState({
        state:apiStates.LOADING,
        error:'',
        data:[]
    });

    const setPartData = (partData)=> setData({...data,...partData});

    React.useEffect(()=>{
        setPartData({
            state: apiStates.LOADING
        })

        fetch(url)
        .then(response=>response.json())
        .then(res=>{
            console.log(res);
            setPartData({
                state: apiStates.SUCCESS,
                data:res.zones
            })
        })
        .catch((err)=>{
            setPartData({
                state: apiStates.ERROR,
                error: 'Failed'
            })
        })

      
    },[])
    return data;
}