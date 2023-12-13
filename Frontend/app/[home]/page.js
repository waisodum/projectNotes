'use client'

import { MyContext } from "@/Helper/Context";
import { useContext, useEffect, useState } from "react";



const page = ({params}) => {

  const [data, setdata] = useState();
  
  const gloData = useContext(MyContext);

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

      {data} {gloData}
    
    </div>
  )
}

export default page;