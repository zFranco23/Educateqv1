import React,{useState} from 'react';
import BackContext from './BackContext.js';




function ProviderBackContext({children}) {

    const [userId,setUserId]=useState("");
    const [userName,setUserName]=useState("");

    return (
        <BackContext.Provider value={{userId,userName,setUserId,setUserName}}>
            {children}
        </BackContext.Provider>
    )
}

export default ProviderBackContext;
