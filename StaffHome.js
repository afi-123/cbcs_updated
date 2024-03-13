import React, { useEffect, useState } from 'react';
import { useStaffAuthContext } from '../../Hooks/useStaffAuthContext';
import { useStaffLogout } from '../../Hooks/useStaffLogout';
import { Link } from 'react-router-dom';
import './StaffHome.css'; // Import the CSS file
import { NavLink } from 'react-router-dom';

const StaffHome = () => {
  const { staff } = useStaffAuthContext();
  const { logout } = useStaffLogout();
  const [Data, setData] = useState([]);
  const [profilePic, setProfilePic] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(10); // You can adjust the number of students per page

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:4000/cbcs/staf/RegStudent/${staff.id}`, {
        headers: { Authorization: `Bearer ${staff.token}` }
      });
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        setData(json);
      }
    };
    if (staff) {
      fetchData();
    }
  }, [staff]);

  const handleLogout = async () => {
    logout();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
  };

  // Pagination
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = Data.slice(indexOfFirstStudent, indexOfLastStudent);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      {staff && (
        <div className="side-navbar">
          {/* Add the image here */}
          <img src="/Pages/Login/back.jpg" alt="Sidebar Image" className="sidebar-image" />
          <div className="staff-details">
            <div className="profile-pic-container">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="profile-pic" />
              ) : (
                <div className="upload-box">
                  <label htmlFor="file-upload" className="custom-file-upload"></label>
                  <input type="file" id="file-upload" onChange={handleFileChange} />
                </div>
              )}
            </div>
            <p className="info">{staff.Name}</p>
            <p className="info">{staff.Email}</p>
          </div>
          <div className="nav-links">
  <NavLink to="/staf/Home/Attendence" activeClassName="active">Give Attendence</NavLink>
  <NavLink to="/staf/Home/Attendence/Info" activeClassName="active">View Attendence Info</NavLink>
  <NavLink to="/staf/Home/EditProfile" activeClassName="active">Edit Profile</NavLink>
  <NavLink to="/staf/Home/AddStudent" activeClassName="active">Add Student</NavLink>
</div>
          <button onClick={handleLogout} id="Logout">LOG OUT</button>
        </div>
      )}
      {Data && (
        <>
          <table id="Hod">
            <thead>
              <tr>
                <th>Name</th>
                <th>RegNo</th>
                <th>Email</th>
                <th>DEPT</th>
                <th>Course</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.map((value) =>
                value.RegStudents.map((v) => (
                  <tr key={v.RegNo}>
                    <td>{v.Name}</td>
                    <td>{v.RegNo}</td>
                    <td>{v.Email}</td>
                    <td>{v.Dept}</td>
                    <td>{value.CourseName}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          <div className="pagination">
            {/* Pagination controls */}
            {Array.from({ length: Math.ceil(Data.length / studentsPerPage) }, (_, index) => (
              <button key={index + 1} onClick={() => paginate(index + 1)}>{index + 1}</button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StaffHome;
