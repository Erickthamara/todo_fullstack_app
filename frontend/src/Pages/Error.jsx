import React from 'react'
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className='error-card'>
       <h2 >Error: 404</h2>
       <h3>Page not found</h3>
       <Link to='/' className='btn'>back home</Link>
      
     </div>
        
  )
}

export default Error
