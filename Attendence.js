import React, { useEffect, useState } from 'react'
import {useStaffAuthContext} from '../Hooks/useStaffAuthContext'
import './attendanceSheet.css';
const AttendanceSheet = () => {
  const [Data,setData] = useState([])
  const [Dates,setDates] = useState()
  const [curdate,setcur] = useState()
  const [resid,setresid] = useState()
  const {staff} = useStaffAuthContext();
  const today = new Date();
  const formattedDate = formatDate(today);
  const [loading,setLoading] = useState(true)
  const toggleAttendance = (studentId) => {
    setAttendance((prevAttendance) => ({
      ...prevAttendance,
      [studentId]: !prevAttendance[studentId],
    }));
  };
  useEffect(()=>
  {
    const fetchdata = async() =>
    {
      try{
      const responce = await fetch('http://localhost:4000/cbcs/staf/Attendence/'+staff.course_id,
      {headers:{'Authorization':`Bearer ${staff.token}`}})
      const json = await responce.json()
      if(responce.ok)
      {
        setData(json)
      }
      setDates(json.map((value)=>value.Attendence.map((v)=>v.Date)))
      const resDate = await fetch('http://localhost:4000/cbcs/staf/Date/'+staff.id,
      {headers:{'Authorization':`Bearer ${staff.token}`}}) 
      const ob = await resDate.json()
      setcur(ob.Date.toString())
      setresid(ob.StaffId)
    }
    catch(error){console.error();}
    finally{setLoading(false)}
  } 
    if(staff)
    {
      fetchdata()
    }
  },[setData])
  const [attendance, setAttendance] = useState(null);
  
  useEffect(() => {
    const updatedAttendance = {};
    if (Data) {
      Data.forEach((student) => {
        updatedAttendance[student._id] = false;
      });
      setAttendance(updatedAttendance);
    }
  }, [Data]);

  console.log(attendance)
  console.log(Data)
  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  const handelsubmit = async(e) =>
  {
    e.preventDefault()
    const Date = {"Date":formattedDate.toString(),"Id":staff.id}
    const response = await fetch('http://localhost:4000/cbcs/staf/Attendence/Given', {
      method: 'POST',
      body: JSON.stringify(Date),
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${staff.token}`
      }  
    }
    )
    Object.entries(attendance).map(async([studentId, isPresent]) =>{
      const course = {"Date":formattedDate.toString(),present:isPresent,Id:staff.id}
      const response = await fetch('http://localhost:4000/cbcs/staf/Attendence/Given/'+studentId, {
      method: 'POST',
      body: JSON.stringify(course),
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${staff.token}`
      }
    })
    })
    Object.entries(attendance).map(async([studentId, isPresent]) =>{
      const course = {"Date":formattedDate.toString(),present:isPresent,Id:staff.id}
      const response1 = await fetch('http://localhost:4000/cbcs/staf/Attendence/student/given/'+studentId, {
      method: 'POST',
      body: JSON.stringify(course),
      headers: {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${staff.token}`
      }
    })
    })
    if(response.ok)
      {
        window.location.reload()
      }
  }
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h2>Attendance Sheet</h2>
      {(curdate === formattedDate) && (resid === staff.id) &&
      <label>Attendence already given</label>}
      {!(curdate === formattedDate && resid === staff.id) &&
      <form>
      <table id='Hod'>
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {Data.map((student) => (
            <tr key={student._id}>
              <td>{student.RegNo}</td>
              <td>{student.Name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={attendance[student._id]}
                  onChange={() => toggleAttendance(student._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
       <button onClick={(e)=>handelsubmit(e)}>SUBMIT</button>
     </div>
     </form>
}
    </div>
  );
};
export default AttendanceSheet;