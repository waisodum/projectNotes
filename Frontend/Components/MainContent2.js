import InfiniteScroll from "react-infinite-scroll-component";
import "../Styles/notesContent.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ProfileData } from "@/Helper/Context";
export default function MainContent({ setSubject,URL }) {
  const { data } = useContext(ProfileData);
  const [files, setFiles] = useState([]);
  const [loader, setLoader] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const branch = data.branch;
  const year = data.year;
  
  useEffect(() => {
    console.log(URL);
    if (!setSubject) {
      return
    }
    setFiles([]);
    setPage(0);
    fetchData();
  }, [setSubject]);

  
  useEffect(() => {
    fetchData()
    }, [page])


  async function fetchData() {
    try { 
      var url =`${URL}/upload/fetch?page=${page}`
      // console.log(url);
      const posts = await axios.post(url, {
        Branch: branch,
        Year: year,
        Subject: setSubject,
      });
console.log(posts);
      setLoader(false);
      setFiles((prevFiles) => {
        // Create a Set to store unique file IDs
        const uniqueIds = new Set(prevFiles.map(file => file.id));
      
        // Filter out files that already exist in the state based on their unique identifier
        const newFiles = posts.data.filter(file => !uniqueIds.has(file.id));
      
        // Update the state with the new files
        return [...prevFiles, ...newFiles];
      });
      // Check if there is more data to load
      
      setHasMore(posts.data.length > 0);

    } catch (err) {
      alert('Internal server error. Try again later.');
    }
  }

  if (loader) {
    return (
      <div className="reload-container">
        <div className="reload-icon"></div>
      </div>
    );
  }
if (!setSubject) {
  return(

    <div ></div>
  )
}

  const loadMore = () => {
    setPage((prevPage) => prevPage + 1);
    fetchData();
  };

  return (
    <div className="notesContent flex flex-wrap" style={{ overflowY: 'scroll' }}>
      <h2 className="text-[3vw] w-[100%] text-center"> Notes </h2>

      <InfiniteScroll
        dataLength={files.length}
        next={loadMore}
        hasMore={hasMore}  // Ensure hasMore is correctly set based on your data
        loader={<div className="reload-container"><div className="reload-icon"></div></div>}
        endMessage={<p>No more files</p>}
      >
        <div className="flex flex-wrap w-full  m-1">
        {files.map((e, index) => (
   

<div class="w-72 overflow-auto h-80 m-4 p-6 bg-violet-400 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex flex-col">
    <a href={e.Path} target="_blank">
        <h5 class="mb-2 text-xl font-bold tracking-tight text-white dark:text-white">{e.title}</h5>
    </a>
    <p class="font-normal text-white dark:text-gray-400">{e.Subject}</p>
    <div class="flex-grow"></div>
    <a href={e.Path} target="_blank" class="inline-flex w-auto items-center px-3 py-2 text-sm font-medium text-center text-white bg-violet-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Read more
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </a>
</div>


        ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}
