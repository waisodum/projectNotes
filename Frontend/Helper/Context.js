'use client'

import React, {createContext} from 'react'
export const MyContext = createContext();

function Context({children}) {

    const dataIs = "Sanket";

  return (
    <div> 
        
        <MyContext.Provider value={dataIs}>
            {children}
        </MyContext.Provider>

    </div>
  )
}

export default Context