'use client'
import "../Styles/leftupload.css"
import React ,{useState}from 'react'

const Uploadsection = () => {
 
     // const {data, subjects} = useContext(ProfileData);
     const [semester, setSemester] = useState('even');
     const [subjects, setSubjects] = useState('dummy1');
     const [file, setFile] = useState(null);
   
 
     const handleSubmit = (e) => {
       e.preventDefault();
 
       console.log('Form submitted with:', { semester, subjects, file });
     };
   return (
     <div className='leftupload'>
 
       <form onSubmit={handleSubmit}>
       <label>
         Semester:
         <select value={semester} onChange={(e) => setSemester(e.target.value)}>
           <option value="even">Even</option>
           <option value="odd">Odd</option>
         </select>
       </label>
 
 
       <label>
         Subjects:
         <select value={subjects} onChange={(e) => setSubjects(e.target.value)}>
           <option value="dummy1">Dummy 1</option>
           <option value="dummy2">Dummy 2</option>
           <option value="dummy3">Dummy 3</option>
           <option value="dummy4">Dummy 4</option>
           <option value="dummy5">Dummy 5</option>
         </select>
       </label>
 
 
       <label>
         File:
         <input type="file" onChange={(e) => setFile(e.target.files[0])} />
       </label>
 
 
       <button type="submit">Submit</button>
     </form>
       
       
     </div>
  )
}

export default Uploadsection
