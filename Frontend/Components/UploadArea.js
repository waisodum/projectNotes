"use client";
import React, { useState, useEffect, useContext } from "react";
import { supabase } from "../utils/spuabase";
import { ProfileData } from "@/Helper/Context";

import { v4 as uuidv4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const UploadArea = ({ token }) => {
  const { data, subjects, updateUserData } = useContext(ProfileData);
  const [sem, setSem] = useState("Odd");
  const [sNo, setSNo] = useState(1);
  const branch = data.branch;
  const year = data.year;
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedNote, setUploadedNote] = useState([]);
  const [subjectName, setSubjectName] = useState(subjects[branch][year][1][0]);
  var fileData;

  async function Getlink(link) {
    try {
      const { data, error } = await supabase.storage
        .from("Notes Bucket")
        .getPublicUrl(link);
      return { success: true, Data: data.publicUrl };
    } catch (err) {
      return { success: false, err };
    }
  }

  const username = data.username;
  const [bucketCreated, setBucketCreated] = useState(false);
  const [mainPath, setMainPath] = useState("");

  const handleFileChange = async (event) => {
    await setSelectedFile(event.target.files[0]);
    console.log(selectedFile);
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const id = await uuidv4();

      toast("Uploading... \nPlease Wait", {
        icon: "⏳",
      });

      const metadata = {
        firstName: data.firstName,
        lastName: data.lastName,
        branch: branch,
        username: data.username,
        year: year,
        sem: sNo,
        subject: subjectName,
        id: id,
      };

      try {
        const path = `${branch}/${year}/${subjectName}`;
        const originalFileName = selectedFile.name;
        const uploadedFileName = `${path}/${id}/${originalFileName}`;
        console.log(uploadedFileName);

        const { data, error } = await supabase.storage
          .from("Notes Bucket")
          .upload(uploadedFileName, selectedFile, { metadata });

        if (error) {
          console.error("Error uploading file:", error);
          toast.error("Unable to Upload:", error, {
            icon: "👎🏼",
          });
        } else {
          console.log("File uploaded successfully:", data);
          console.log(data.id);

          setSelectedFile(null);
          try {
            const pathURl = await Getlink(uploadedFileName);
            fileData = {
              title: originalFileName,
              Branch: branch,
              Year: year,
              Path: pathURl.Data,
              Subject: subjectName,
            };

            const response = await axios.post(
              "http://localhost:8000/upload",
              {
                fileData,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: token, // Use 'Bearer' if you're using a token-based authentication
                  // If you're using other types of authentication, adjust the header accordingly
                },
              }
            );
            toast.success("Uploaded Successfully", {
              icon: "🍻",
            });
          } catch (err) {
            const { data, error } = await supabase.storage
              .from("Notes Bucket")
              .remove([uploadedFileName]);
            toast.error("Error Uploading file, please try again later", null, {
              icon: "👎🏼",
            });
          }
        }
      } catch (error) {
        toast.error("Error Uploading file, please try again ::", error, {
          icon: "👎🏼",
        });
        console.error("Error uploading file:", error);
      }
    } else {
      console.error("No file selected", {
        icon: "👎🏼",
      });
      toast.warn("Please select a file to upload", {
        icon: "",
      });
    }
  };


  const subjectsAvailable = subjects[branch][year][sNo];

  const handleSem = () => {
    if (sem === "Odd") {
      setSem("Even");
      setSNo(2);
    } else {
      setSem("Odd");
      setSNo(1);
    }
  };

  return (
    <button className="uploadSpace">
      <div className="topLevel">
        <div className="uploadColumn">
          <div className="fileDrop">
            <h1 className="text-[1.5vw] font-bold">Upload Notes here</h1>
            <input
              type="file"
              accept="application/pdf"
              className="uploader"
              onChange={handleFileChange}
            />
          </div>
        </div>

        <div className="uploadColumn">
          <form className="uploadForm">
            <div className="uFormRow py-[1vw]">
              <h4 className="uploadField"> Subject Name </h4>

              <select
                className="inputF"
                onChange={(e) => {
                  setSubjectName(e.target.value);
                }}
                required
              >
                {subjectsAvailable.map((subject, index) => (
                  <option value={subject} key={index}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            <button />
            <div className="uFormRow">
              <h4 className="uploadField"> Semester </h4>
              <div
                className="inputF flex items-center justify-center"
                onClick={handleSem}
              >
                {sem} Semester
              </div>
            </div>
          </form>
        </div>
      </div>

      <button className="uploadsBtn" onClick={handleFileUpload}>
        Upload File
      </button>
      <ToastContainer />
    </button>
  );
};

export default UploadArea;
