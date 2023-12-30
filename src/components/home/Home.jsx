import React from 'react'
import { useUserContext } from '../../context/UserContext'
import { Link } from 'react-router-dom';

const Home = () => {
  const {user}=useUserContext();
  if(!user){
    return <Link to='/login'/>
  }
  return (
    <div>
      <h1>Home Page</h1>
      <ul>
        <li>
          {user.uid}
        </li>
        <li>
          {user.displayName}
        </li>
        <li>
          {user.email}
        </li>
        <li>
          {user.photoURL}
        </li>
      </ul>
    </div>
  )
}

export default Home