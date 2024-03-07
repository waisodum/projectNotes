'use client'
import { data } from 'autoprefixer'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function SignUpForm({URL}) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [branch, setBranch] = useState('');
  const [username, setUsername] = useState('');
  const [year, setYear] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router =useRouter();

  const changeBranch = (bra) => {
    setBranch(bra.target.value);
  }

  const changeYear = (yea)=>
  {
    setYear(yea.target.value);
  };




  async function submitUser(e) {
    e.preventDefault();
    var userData = {
      firstname: firstName,
      lasname:lastName,
      email,
      branch,
      year,
      username,
      password,
    };
try
{    var GG = await axios.post(`${URL}/Register`, userData);
  
if (!GG.data.success) {
  
  if (GG.data.message==='email already exists') {
    setEmail("")
    
  }else{
  setUsername("");

}

  alert(GG.data.message);
  return null
} 
else {
  // router.push('')
  setEmail("");
  setFirstName("");
  setLastName("");
  setPassword("");
  setUsername("");
  setBranch("");
  setYear("");
  return null
}
}  
catch(err){
alert('Theres some error in server plz contact us')
  return null;
}


  }

  return (
    <div className='signUpForm'>

      <form className='mainForm' onSubmit={submitUser}>

        <div className='inputRow2'>

          <div className='field1'>

            <h4 className='fieldName'>First name: </h4> <input className='fieldValue' type='text' value={firstName} placeholder='Name' onChange={(ip)=>
            {
              setFirstName(ip.target.value);
            }} required/>

          </div>  
          <div className="field1">
            <h4 className="fieldName">Last name: </h4>{" "}
            <input
              className="fieldValue"
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(ip) => {
                setLastName(ip.target.value);
              }}
              required
            />
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

<h4 className='fieldName'>email: </h4> <input className='fieldValue' value={email} type='text' placeholder='Set a new username' onChange={async (ip)=>
{
  setEmail(ip.target.value);

}} required/>

</div>

          <div className='field1'>

            <h4 className='fieldName'>Username: </h4> <input className='fieldValue' value={username} type='text' placeholder='Set a new username' onChange={async (ip)=>
            {
              setUsername(ip.target.value);
            
            }} required/>

          </div>

          <div className='field1'>

            <h4 className='fieldName'>Password: </h4> <input className='fieldValue w-[18vw]' value={password} type='password' placeholder='Needs to be strong' onChange={(ip)=>
            {
              setPassword(ip.target.value);
              
            }} required/>
</div>
        <button className="createButton" type="submit">
          Create account
        </button>
      </form>{" "}
    </div>
  );
}

export default SignUpForm