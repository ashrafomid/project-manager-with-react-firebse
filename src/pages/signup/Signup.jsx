import { useState } from 'react'
import './Signup.css'
import { useSignup } from '../../hooks/useSignup'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [thumbnial, setThumbnail] = useState('')
  const [thumbnialError, setThumbnailError] = useState(null)
  const { error, isPending, signUp} = useSignup(); 
  const handleSubmit = (e)=>{
    e.preventDefault();
    signUp(email,password,displayName,thumbnial)

  }
  const handlefileChange = (e)=>{
    setThumbnail('')
    let selected = e.target.files[0]
    if(!selected){
      setThumbnailError('please select an image')
      return
    }
    if(!selected.type.includes('image')){
      setThumbnailError('selected file must be an image')
      return
    }
    if(selected.size>30000){
      setThumbnailError('image file size must be 100 kb')
      return
    }
    setThumbnailError(null)
    setThumbnail(selected)
  }
  return (
    <form className='auth-form' onSubmit={handleSubmit}>
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
        <span>Full Name:</span>
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
        onChange={handlefileChange}
        required
        />
        {thumbnialError && <div className='error'>{thumbnialError}</div>}
      </label>
      {!isPending && <button className='btn'>Sign Up</button>}
    {error && <p className='error'>{error}</p>}
    {isPending && <button className='btn'>Loading...</button>}
    </form>
  )
}
