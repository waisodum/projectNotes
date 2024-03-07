'use client'

import Context, { ProfileData } from '@/Helper/Context';
import { supabase } from '@/utils/spuabase';
import React, { useState, useEffect, useContext } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import '../Styles/notesContent.css'


export default function MainContent() {
  const {data, currentSubject, changeCurrentSubject} = useContext(ProfileData);
  const [files, setFiles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const branch = data.branch;
  const year = data.year;
  const activeSubject = currentSubject;
  const [folderPath, setFolderPath] = useState(null);

  useEffect(() => {
    changeCurrentSubject(activeSubject);
    setFolderPath(`${branch}/${year}/${activeSubject}`);
  }, [activeSubject, branch, year, changeCurrentSubject]);

  useEffect(() => {
    if (folderPath) {
      setFiles([]);
      fetchFiles();
    }
  }, [folderPath]);

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase.storage.from('Notes Bucket').list(folderPath, {
        limit: 100000, 
        offset: (page - 1) * 10, 
      });

      if (error) {
        console.error('Error listing files:', error);
      } else {
        // Igonring ".emptyFolderPlaceholder" entries
        const filteredData = (data || []).filter(file => file.name !== '.emptyFolderPlaceholder');

        // Get public URL for each file
        const filesWithUrls = await Promise.all(
          filteredData.map(async file => {
            const { data: urlData, error: urlError } = await supabase.storage
              .from('Notes Bucket')
              .getPublicUrl(`${folderPath}/${file.name}`);
            
            if (urlError) {
              console.error(`Error getting public URL for ${file.name}:`, urlError);
              return { ...file, publicURL: null };
            }

            return { ...file, publicURL: urlData };
          })
        );
 
        // Update state with unique files and URLs
        setFiles(prevFiles => {
          const uniqueFileNames = new Set(prevFiles.map(file => file.name));
          return [...prevFiles, ...filesWithUrls.filter(file => !uniqueFileNames.has(file.name))];
        });

        if (!filteredData || filteredData.length === 0) {
          setHasMore(false);
        }
      }
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  const loadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <div className='notesContent'>

        <h2 className=' NOTES font-semibold text-[3vw] mb-[2vw] w-[100%] text-center'> Notes </h2>

        <InfiniteScroll
        dataLength={files.length}
        next={loadMore}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p className='text-center w-[100%] mt-[2vw]'>{
          (files[0]? 'This is the end' : 'No files to Display')
        }</p>}
        >
            {/* {files.map((file, index) => (
            <div key={index}>
            <p>{file.name}</p>
            {file.publicURL && <a href={`https://jglyzjmgodvihjdwdcvt.supabase.co/storage/v1/object/public/Notes%20Bucket/${folderPath}/${file.name}`} target="_blank" rel="noopener noreferrer">Get URL</a>}
            </div>
        ))} */}

          <div className="files-container"
            style={!files[0] ? {backgroundColor: 'transparent'} : null}
          >

          {files.map((file, index) => (

            <div className='fileView' key={index}>

              {file.publicURL && (

                <a href={`https://jglyzjmgodvihjdwdcvt.supabase.co/storage/v1/object/public/Notes%20Bucket/${folderPath}/${file.name}`} target="_blank" rel="noopener noreferrer" 
                className='file-entry'>{index+1} . {file.name}</a>
              )}

            </div>
          ))}

          </div>


        </InfiniteScroll>

    </div>
  );
}