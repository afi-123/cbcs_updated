import React, { useEffect, useState } from 'react'
import { useStaffAuthContext } from '../Hooks/useStaffAuthContext';


const AttendenceInfo = () => {
const {staff} = useStaffAuthContext();
const [Date,setDates] = useState([])
const [pdate,setPDate] = useState('')
const [attendencedata,setAttendenceData] = useState([])
const handelclick = async(value) =>
{
    setPDate(value)
    const Data = {'Id':`${staff.id}`,'Date':`${value}`}
    const responce = await fetch('http://localhost:4000/cbcs/staf/Attendence/Info',{
     method: 'POST',
     body:JSON.stringify(Data),
     headers:{
       'Content-Type': 'application/json',
       'Authorization':`Bearer ${staff.token}`}
   }
    ) 
    if(responce.ok)
    {
       const json = await responce.json()
       setAttendenceData(json.StudentInfo)
       console.log(json.StudentInfo)
    }
}
  useEffect(() => 
  {
   const fetchData = async() =>
   {
     const Id = {'Id':`${staff.id}`}
     const responce = await fetch('http://localhost:4000/cbcs/staf/Attendence/Date',{
      method: 'POST',
      body:JSON.stringify(Id),
      headers:{
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${staff.token}`}
    }
     ) 
     if(responce.ok)
     {
        const json = await responce.json()
        setDates(json)
        console.log(json)
     }
   } 
   fetchData()
  },[])
  return (
    <div>
    {!pdate && Date.map((value) => 
    (
    <h1 onClick={() => handelclick(value.Date)}>{value.Date}</h1>
    ))
    }
    {pdate && 
        <table id='Hod'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>RegNo</th>
                    <th>Attendence</th>
                </tr>
            </thead>
            <tbody>
                {attendencedata.map((value)=>(
                    <tr>
                    <td>{value.StudentId.Name}</td>
                    <td>{value.StudentId.RegNo}</td>
                    {value.present ? <td>Present</td> : <td>Absent</td>}
                    </tr>
                )
                )}
            </tbody>
        </table>
    }
    </div>
  )
}

export default AttendenceInfo
