import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import '../css/UserType12.css';

const UserType = () => {
  const [userType, setUserType] = useState('');
  const [registerNumber, setRegisterNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleUserSelect = (selectedUserType) => {
    // Add your logic here based on the selected user type
    console.log('Selected user type: ${selectedUserType}');
    // You can perform actions like navigating to a specific route or updating state

    // For "STUDENT" user type, clear register number and password
    if (selectedUserType === 'STUDENT') {
      setRegisterNumber('');
      setPassword('');
    }

    setUserType(selectedUserType);
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='login-box'>
      <img
        src="https://erp.sathyabama.ac.in/assets/images/sathyabama_header-logo-A++.jpg"
        alt="Sathyabama Logo"
        className='user-logo-img'
      />
      <div className='select-user-text'>Select User:</div>
      <select className='select-rp2' onChange={(e) => handleUserSelect(e.target.value)}>
        <option value='DEAN'>
          <Link to='/dean'>Dean</Link>
        </option>
        <option value='HOD'>
          <Link to='/hod'>HOD</Link>
        </option>
        <option value='STAFF'>
          <Link to='/staf'>Staff</Link>
        </option>
        <option value='STUDENT'>
          <Link to='/student'>Student</Link>
        </option>
      </select>
      {userType === 'STUDENT' && (
        <input
          type='text'
          className='form-control-6at'
          placeholder='Register Number'
          value={registerNumber}
          onChange={(e) => setRegisterNumber(e.target.value)}
        />
      )}
      {userType !== 'STUDENT' && (
        <input
          type='email'
          className='form-control-6at'
          placeholder='Email'
          value={registerNumber}
          onChange={(e) => setRegisterNumber(e.target.value)}
        />
      )}
      <input
        type={showPassword ? 'text' : 'password'}
        className='form-control-6at'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div className='password-toggle'>
        <input
          type='checkbox'
          id='showPassword'
          checked={showPassword}
          onChange={handlePasswordToggle}
        />
        <label htmlFor='showPassword'>Show Password</label>
      </div>
      <div className='button-container'>
        <button onClick={() => console.log('Login clicked')}>
          Login
        </button>
      </div>
    </div>
  );
};

export default UserType;