
'use client'
import LeftMenu from "@/Components/LeftMenu";
import { ProfileData } from "@/Helper/Context";
import { useContext, useEffect,useState } from "react";
import "../../Styles/notesPage.css";
import { useRouter } from "next/navigation";
import axios from "axios";
import Navbar from "@/Components/Navbar";
// import { supabase } from "@/utils/spuabase";


const Page = () => {
  const { data, setData } = useContext(ProfileData);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  // const [filteredMathFiles, setFilteredMathFiles] = useState([]);
  // const subjectName = "Network Theory";

  // const mathematicsFiles = async () => {
  //   try {
  //     const { data: files, error } = await supabase.storage.from('Notes Bucket').list();
  
  //     if (error) {
  //       console.error('Error fetching files:', error);
  //       return [];
  //     }
  
  //     const mathematicsFiles = [];
  
  //     for (const file of files) {
  //       const { data: metadata, error: metaError } = await supabase
  // .from('NotesBucket') // Make sure this points to the correct storage bucket
  // .storage // Ensure that the Supabase client has access to the storage module
  // .getMetadata(subjectName);

  
  //       if (metaError) {
  //         console.error(`Error fetching metadata for ${subjectName}:`, metaError);
  //       } else {
  //         if (metadata && metadata.subject === 'Digital System Design') {
  //           mathematicsFiles.push({ file, metadata });
  //         }
  //       }
  //     }
  
  //     return mathematicsFiles;
  //   } catch (error) {
  //     console.error('Error fetching files with Mathematics subject:', error);
  //     return [];
  //   }
  // };
  
  // // ... (inside useEffect or any other function)
  
  // const fetchMathematicsFiles = async () => {
  //   try {
  //     const files = await mathematicsFiles();
  //     return files;
  //   } catch (error) {
  //     console.error('Error fetching mathematics files:', error);
  //     return [];
  //   }
  // };
  
  // useEffect(() => {
  //   const fetchAndSetMathFiles = async () => {
  //     const files = await fetchMathematicsFiles();
  //     setFilteredMathFiles(files);
  //   };
  
  //   fetchAndSetMathFiles();
  // }, []);
  

  if (loading) {
    // Render loading state or spinner here
    return <div class="reload-container">
    <div class="reload-icon"></div>
  </div>;
  }

  return (
    <div className="notesMain">
      {data.branch ? <Navbar /> : null}
      {data.branch ? <LeftMenu /> : null}

      {/* <div >

      <h2>Files with Mathematics Subject:</h2>
      <ul>
      {filteredMathFiles.map(({ file, metadata }) => (
            <li key={file.name}>
              <a href={file.url}>{file.name}</a>
              <p>Metadata: {JSON.stringify(metadata)}</p>
            </li>
          ))}
      </ul>

      </div> */}

    </div>
  );
};

export default Page;
