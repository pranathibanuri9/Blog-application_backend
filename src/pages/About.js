import React from 'react'
import Base from '../components/Base';
import { useContext } from 'react';
import userContext from '../context/userContext';

function About() {
  const user=useContext(userContext)
  return (
    <Base>
    <h1>this is about page</h1>
    <h1>we are building blog application</h1>
     {/* {console.log(user.user.data.user.name)}  */}
    {/* <h1>helloooooooooooo{user && user.data.name}</h1> */}
    </Base>
  )
}

export default About;
