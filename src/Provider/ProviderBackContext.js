import React,{useState} from 'react';
import BackContext from './BackContext.js';




function ProviderBackContext({children}) {

    const [userId,setUserId]=useState("");

    return (
        <BackContext.Provider value={{userId,setUserId}}>
            {children}
        </BackContext.Provider>
    )
}

export default ProviderBackContext;
