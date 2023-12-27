'use client'

import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../utils/spuabase'; 
import { ProfileData } from '@/Helper/Context';
// import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { v4 as uuidv4 } from 'uuid';



const UploadArea = () => {

  const {data, subjects, updateUserData} = useContext(ProfileData);
  const [subjectName, setSubjectName] = useState('');
  const [sem, setSem] = useState("Odd");
  const [sNo, setSNo] = useState(1);
  const branch = data.branch;
  const year = data.year;
  const [bucketCreated, setBucketCreated] = useState(false); 
  const [selectedFile, setSelectedFile] = useState(null); 
  const [uploadedNote, setUploadedNote] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {

      const id = uuidv4();
      
      const metadata = {
        firstName : data.firstName, 
        lastName : data.lastName,
        branch : branch,
        username: data.username,
        year : year,
        sem: sNo,
        subject: subjectName,
        id: id,
      }

      console.log(metadata);

      try {

        const originalFileName = selectedFile.name;
        const uploadedFileName = `${originalFileName}_${id}`;

        const { data, error } = await supabase.storage
          .from('Notes Bucket')
          .upload(uploadedFileName, selectedFile, { metadata });

        if (error) {
          console.error('Error uploading file:', error);
        } else {
          console.log('File uploaded successfully:', data);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error('No file selected');
    }
  };

  const subjectsAvailable = subjects[branch][year][sNo];

  const handleSem = ()=>
  {
    if(sem === "Odd")
    {
      setSem("Even");
      setSNo(2); 
    }
    else
    {
      setSem("Odd");
      setSNo(1);
    } 
  }


  return (
    <button className='uploadSpace'>
      
      <div className='topLevel'>
        <div className='uploadColumn'>
          <div className='fileDrop'>
            <h1 className='text-[1.5vw] font-bold'>Upload Notes here</h1>
            <input
              type='file'
              accept='application/pdf'
              className='uploader'
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className='uploadColumn'>

          <form className='uploadForm'>

            <div className='uFormRow py-[1vw]'>

              <h4 className='uploadField'> Subject Name </h4>

              <select className='inputF' onChange={(e) => {setSubjectName(e.target.value)}} required>
              {subjectsAvailable.map((subject, index) => (
                <option value={subject} key={index}>{subject}</option>
              ))}
              </select>

            </div>
                      

            <div className='uFormRow'>

              <h4 className='uploadField'> Semester </h4>
              <div className='inputF flex items-center justify-center' onClick={handleSem}>
                {sem} Semester  
              </div>    

            </div>

          </form>

        </div>
      </div>

      <button className='uploadsBtn' onClick={handleFileUpload}>Upload File</button>

    </button>
  );
};

export default UploadArea;
