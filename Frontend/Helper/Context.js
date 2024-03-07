'use client'

import axios from 'axios';
import React, {createContext, useEffect, useState} from 'react'
export const ProfileData = createContext();

function Context({children}) {

  const [currentSubject, setCurrentSubject] = useState(null);

  const [data, setdata] = useState({
    // firstName: "Sanket",
    // lastName: "Sonawane",
    // username: "SanketSonawane11",
    // email:"sanketsona19@gmail.com",
    // branch: "EXTC",
    // year: "SE",
    // uploadCount: 11,
    // likes: 29,
    // downloads: 5,
  });

    const updateUserData = (newData)=>
    {
      setdata(newData);
      // console.log(data);
    }

    const changeCurrentSubject = (subjectName) =>
    {
      setCurrentSubject(subjectName);
    }

    const subjects = {
      Comps: 
      {
        SE: 
        {
          1: [
            "Engineering Mathematics 3",
            "Discrete Structures and Graph Theory",
            "Data Structure",
            "Digital Logic & Computer Architecture",
            "Computer Graphics",
          ],
          2: [
            "Engineering Mathematics IV",
            "Analysis of Algorithm",
            "Database Management System",
            "Operating System",
            "Microprocessor",
          ],
        },
        TE: 
        {
          1: [
            "Theoretical Computer Science",
            "Software Engineering",
            "Computer Networks",
            "Data Warehousing & Mining",
            "Departmental Level Optional Course – I",
          ],

          2: [
            "System Programming & Compiler Construction",
            "Cryptography & System Security",
            "Mobile Computing",
            "Artificial Intelligence",
            "Departmental Level Optional Course – 2",
          ],
        },
        BE: {
          
          1: [
            "Machine Learning",
            "Big Data Analytics",
            "Department Level Optional Course-3",
            "Department Level Optional Course-4",
            "Institute Level Optional Course-1",
          ],
        
          2: [
            "Distributed Computing",
            "Department Level Optional Course -5",
            "Department Level Optional Course -6",
            "Institute Level Optional Course -2",
          ],
        },
      },

      IT: {
        SE: {
          1: [
            "Engineering Mathematics-III",
            "Data Structure and Analysis",
            "Database Management System",
            "Principle of Communication",
            "Paradigms and Computer Programming Fundamentals"
          ],

          2: [
            "Engineering Mathematics-IV",
            "Computer Network and Network Design",
            "Operating System",
            "Automata Theory",
            "Computer Organization and Architecture"
          ]
        },

        TE: {
          1: [
            "Internet Programming",
            "Computer Network Security",
            "Entrepreneurship and E-business",
            "Software Engineering",
            "Department Optional Course-1"
          ],

          2: [
              "Data Mining & Business Intelligence",
              "Web X.0",
              "Wireless Technology",
              "AI and DS – 1",
              "Department Optional Course-2"
            ]
        },

        BE: {
          1: [
            "AI and DS –II",
            "Internet of Everything",
            "Department Level Optional Course – 3",
            "Department Level Optional Course – 4",
            "Institute Optional Course"
          ],

          2: [
            "Blockchain and DLT",
            "Department Level Optional Course -5",
            "Department Level Optional Course -6",
            "Institute Optional Course -2"
          ]
        }
      },

      EXTC: {
        SE: {
          1: [
            "Engineering Mathematics III",
            "Electronic Devices and Circuits",
            "Digital System Design",
            "Network Theory",
            "Electronic Instrumentation and Control System",
            "C++ and Java Programming"
          ],

          2: [
            "Engineering Mathematics IV",
            "Microcontrollers",
            "Linear Integrated Circuits",
            "Signals & Systems",
            "Principles of Communication Engineering",
            "Python Programming"
          ]
        },

        TE: {
          1: [
            "Microprocessor & Peripherals Interfacing",
            "Digital Communication",
            "Digital VLSI",
            "Discrete Time Signal Processing",
            "Sensor Technology/ Data Structures and Algorithm",
            "Professional Communication & Ethics – II"
          ],

          2: [
            "Electromagnetics and Antenna",
            "Computer Communication Networks",
            "Image Processing and Machine Vision",
            "Artificial Neural Network and Fuzzy Logic",
            "Data Base Management System"
          ]
        },

        BE: {
          1: [
            "Microwave Engineering",
            "Mobile Communication System",
            "Optical Communication",
            "Department level optional Course 3",
            "Department level optional Course 4",
            "Institute level optional Course 1"
          ],

          2: [
            "Optical Communication and Networks",
            "Department level optional Course 5",
            "Department level optional Course 6",
            "Institute level optional Course 2"
          ]
        }
      },

      AIDS: {
        SE: {
          1: [
            "Engineering Mathematics III",
            "Discrete Structures and Graph Theory",
            "Data Structure",
            "Digital Logic & Computer Architecture",
            "Computer Graphics",
          ],

          2: [
            "Engineering Mathematics IV",
            "Analysis of Algorithm",
            "Database Management System",
            "Operating System",
            "Microprocessor"
          ]
        },

        TE: {
          1: [
            "Computer Network",
            "Web Computing",
            "Artificial Intelligence",
            "Data Warehousing & Mining",
            "Statistics for Artificial Intelligence & Data Science",
            "Business Communication and Ethics-II"
          ],

          2: [
            "Data Analytics and Visualization",
            "Cryptography and System Security",
            "Software Engineering and Project Management",
            "Machine Learning",
            "High Performance Computing"
          ]
        },

        BE: {
          1: [
            "Deep Learning",
            "Big Data Analytics",
            "Department Level Optional Course 3",,
            "Department Level Optional Course 4",
            "Institute Level Optional Course-1"
          ],

          2: [
            "Advanced Artificial Intelligence",
            "Department Level Optional Course-5",
            "Department Level Optional Course-6",
            "Institute Level Optional Course-2"
          ]
        }
      },

      CHEM: {
        SE: {
          1: [
            "Engineering Mathematics-III",
            "Industrial and Engineering Chemistry I",
            "Fluid Flow Operations",
            "Chemical Engineering Thermodynamics I",
            "Process Calculations"
          ],

          2: [
            "Engineering Mathematics-IV",
            "Industrial and Engineering Chemistry II",
            "Numerical Method in Chemical Engineering",
            "Solid Fluid Mechanical Operations",
            "Chemical Engineering Thermodynamics II"
          ]
        },

        TE: {
          1: [
            "Mass Transfer Operations-I",
            "Heat Transfer Operations",
            "Chemical Reaction Engineering-I",
            "Transport Phenomena",
            "Department Optional Course 1"
          ],

          2: [
            "Mass Transfer Operation II",
            "Chemical Reaction Engineering II",
            "Pollution Control Technology",
            "Process Engineering and Economics",
            "Department Optional Course 2"
          ]
        },

        BE: {
          1: [
            "Instrumentation process dynamic and control",
            "Chemical engineering equipment design",
            "Department Optional Course 3",
            "Department Optional Course 4"
          ],

          2: [
            "Modelling simulation and optimization",
            "Department Optional Course 5",
            "Department Optional Course 6",
            "Institute Optional Course 2"
          ]
        }
      }

    }

  return (
    <div> 
        
      <ProfileData.Provider value={{data, subjects, setdata, updateUserData, changeCurrentSubject, currentSubject}}>
        {children}
      </ProfileData.Provider>

    </div>
  )
}

export default Context