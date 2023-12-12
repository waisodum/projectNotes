import React, { useState } from 'react'


function SignUpForm() {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

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

      </form>

      </div>
  )
}

export default SignUpForm