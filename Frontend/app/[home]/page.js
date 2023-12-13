'use client'

import { useEffect, useState } from "react";



const page = ({params}) => {

  const [data, setdata] = useState();

  const dat = ()=>
  {
    setdata(params.home)
    // console.log(data)
  }

  useEffect(()=>
  {
    dat()
  }, []);

  return (
    <div>

      {data}
    
    </div>
  )
}

export default page;