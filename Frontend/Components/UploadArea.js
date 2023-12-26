'use client'

import React, { useState, useEffect, useContext } from 'react';
import { supabase } from '../utils/spuabase'; 
import { ProfileData } from '@/Helper/Context';


const UploadArea = () => {

  const {data, subjects, updateUserData} = useContext(ProfileData);
  const [subjectName, setSubjectName] = useState('');
  const [sem, setSem] = useState("Odd");
  const [sNo, setSNo] = useState(1);
  const branch = data.branch;
  const year = data.year;
  const [bucketCreated, setBucketCreated] = useState(false); 
  const [selectedFile, setSelectedFile] = useState(null); 

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      
      const metadata = {
        firstName : data.firstName, 
        lastName : data.lastName,
        branch : branch,
        year : year,
        sem: sNo,
        subject: subjectName,
      }

      console.log(metadata);

      try {
        const { data, error } = await supabase.storage
          .from('NotesBucket')
          .upload(selectedFile.name, selectedFile);

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

  // useEffect(() => {
  //   const createStorageBucket = async () => {
  //     try {
  //       const { data, error } = await supabase.storage.createBucket('NotesBucket', {
  //         public: true, 
  //         maxFileSize: '50MB', 
  //       });

  //       if (error) {
  //         console.error('Error creating storage bucket:', error);
  //       } else {
  //         console.log('Storage bucket created:', data);
  //         setBucketCreated(true); 
  //       }
  //     } catch (error) {
  //       console.error('Error creating storage bucket:', error);
  //     }
  //   };

  //   createStorageBucket(); 
  // }, []); 


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
    <div className='uploadSpace'>
      
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

    </div>
  );
};

export default UploadArea;
