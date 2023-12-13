import { useRouter } from 'next/router';
import React, { useState } from 'react'
import axios from 'axios';

function SignUpForm() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [branch, setBranch] = useState('');
  const [year, setYear] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const submitUser = async(a)=>
  {
    a.preventDefault();
    try
    {
      const response = await axios.post("", {firstName, lastName, branch, year, username, password});
      console.log(response);
      router.push("/Home");
    }
    catch(err)
    {
      console.error(err);
    }
  }

  const changeBranch = (bra) =>
  {
    setBranch(bra.target.value);
  }

  const changeYear = (yea)=>
  {
    setYear(yea.target.value);
  }

  return (
    <div className='signUpForm'>

      <form className='mainForm'>

        <div className='inputRow2'>

          <div className='field1'>

            <h4 className='fieldName'>First name: </h4> <input className='fieldValue' type='text' placeholder='Name' onChange={(ip)=>
            {
              setFirstName(ip.target.value);
            }} required/>

          </div>

          <div className='field1'>

            <h4 className='fieldName'>Last name: </h4> <input className='fieldValue' type='text' placeholder='Last Name' onChange={(ip)=>
            {
              setLastName(ip.target.value);
            }} required/>

          </div>
          
        </div>

        <div className='inputRow2'>

          <div className='field1'>

            <h4 className='fieldName'>Branch: </h4> 
            <select className='fieldValue' value={branch} onChange={changeBranch} required>

              <option value='' disabled> Branch? </option>
              <option value="Comps"> Computer Science</option>
              <option value="IT"> Information Technology</option>
              <option value="EXTC"> Electronics And Telecommunication</option>
              <option value="AIDS"> AIDS</option>
              <option value="Chem"> Chemical </option>

            </select>

          </div>

          <div className='field1'>

            <h4 className='fieldName'>Year: </h4> 
            <select className='fieldValue' onChange={changeYear} required>

              <option value='' selected disabled>Year?</option>
              <option value="FE"> First Year</option>
              <option value="SE"> Second Year</option>
              <option value="TE"> Third Year</option>
              <option value="BE"> Final Year</option>

            </select>

          </div>
          
        </div>

          <div className='field1'>

            <h4 className='fieldName'>Username: </h4> <input className='fieldValue' type='text' placeholder='Set a new username' onChange={(ip)=>
            {
              setUsername(ip.target.value);
            }} required/>

          </div>

          <div className='field1'>

            <h4 className='fieldName'>Password: </h4> <input className='fieldValue w-[18vw]' type='password' placeholder='Needs to be strong' onChange={(ip)=>
            {
              setPassword(ip.target.value);
            }} required/>

          </div>  

          <button onClick={submitUser} className='createButton'>Create account</button>     

      </form>

      </div>
  )
}

export default SignUpForm