import React from 'react'
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}>
        <h1>This page was not found &#128531; Please return to the <Link to='/'> Main</Link> page!</h1>
    </div>
    
  )
}

export default NotFound