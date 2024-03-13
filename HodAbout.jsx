import React from 'react';
import './HodAbout.css';

const HodAbout = () => {
  return (
    <div>
      <div className='main'>
        <div className="container_profile">
          <div className="box">
            <img src='' alt="" />
            <table id ='info'>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>: Dr.Subhashini </td>
                </tr>
                <tr>
                  <td>Position</td>
                  <td id='right'>: Head of Department</td>
                </tr>
                <tr>
                  <td>Department</td>
                  <td>: Information Technology</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>: hod.doe@example.com</td>
                </tr>
                <tr>
                  <td>Contact</td>
                  <td>: +1234567890</td>
                </tr>
                <tr>
                  <td>Address</td>
                  <td>: 123 Main Street, City, Country</td>
                </tr>
              </tbody> 
            </table>
          </div>
          <div className="About">  
            <h2>About Me</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac mollis massa. Morbi sed sapien nec risus placerat fermentum. Ut vehicula sem vitae eros lacinia, at congue lacus dapibus.</p>
            <p>Sed id nulla eget libero efficitur dapibus vitae sit amet mauris. Duis scelerisque lacus at mauris laoreet, eget eleifend mi molestie.</p>
            <p>Quisque a magna vitae mi hendrerit rutrum. Cras vitae pharetra nunc. Proin nec dui in magna tincidunt ultricies. Suspendisse potenti. In scelerisque convallis erat, ac commodo libero condimentum id. Phasellus venenatis mi nec purus blandit tempus.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HodAbout;
