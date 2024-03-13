import React from 'react'
import './HodNav.css'
import HodTable from '../HodTable'
import {Link} from 'react-router-dom'
const HodNav = ({course,handelclick}) => {
  return (
    <div className='body-nav'>
      <div className="wrapper-Nav">
      <div className="sidebar">
        <h2>HOD</h2>
        <ul>
          <li><Link to='/hod/Home'><div>Home</div></Link></li>
          <li><Link to='/hod/student_info'><div>Student Info</div></Link></li>
          <li><Link to='/hod/Create-course'><div>Create-Course</div></Link></li>
          <li><Link to='/hod/About'><div>About</div></Link></li>
          <li><a href="#"><i className="fas fa-address-book"></i>Contact</a></li>
          <li ><a onClick={handelclick} style={{cursor:'pointer'}}>Log-out</a></li>
        </ul> 
      </div>
      <div className="main_content">
        <div className="header">Welcome!! Have a nice day.</div>  
        <div className="info">
        {course && <HodTable />}
        </div>
      </div>
    </div>
    </div>
  )
}

export default HodNav
