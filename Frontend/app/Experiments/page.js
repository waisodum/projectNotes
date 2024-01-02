'use client'

import { supabase } from '@/utils/spuabase';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';



export default function FileList() {
  const [files, setFiles] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const folderPath = 'your-folder-path'; // Replace with your folder path

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    try {
      const { data, error } = await supabase.storage.from('your-bucket-name').list(folderPath, {
        limit: 10, // Adjust the limit as per your requirement
        offset: (page - 1) * 10, // Adjust the offset based on page number and limit
      });

      if (error) {
        console.error('Error listing files:', error);
      } else {
        setFiles(prevFiles => [...prevFiles, ...(data || [])]);

        if (!data || data.length === 0) {
          setHasMore(false); // No more files available
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
    <InfiniteScroll
      dataLength={files.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more files</p>}
    >
      {files.map((file, index) => (
        <div key={index}>
          <p>{file.name}</p>
          {/* Render other file details or use the file data as needed */}
        </div>
      ))}
    </InfiniteScroll>
  );
}
