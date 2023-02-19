import { useState } from 'react'
import './Signup.css'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnial, setThumbnail] = useState('')
  return (
    <form className='auth-form'>
      <h2>Sign Up</h2>
      <label >
        <span>Email:</span>
        <input type='email'
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
        required
        />
      </label>
      <label>
        <span>Password:</span>
        <input
        type='password'
        required
        onChange={(e)=> setPassword(e.target.value)}
        value={password}
        />
      </label> 
      <label>
        <span>Password:</span>
        <input
        type='text'
        required
        onChange={(e)=> setDisplayName(e.target.value)}
        value={displayName}
        />
      </label>
      <label>
        <span>Profile Thumbnail:</span>
        <input
        type='file'
        required
        />
      </label>
      <button className='btn'>Create Account</button>
    </form>
  )
}
