import './Navbar.css'
import Temple from '../assets/temple.svg'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

export default function Navbar() {
    const {logout, isPending, error} = useLogout();
    const handleLogout = ()=>{
        logout()
    }
  return (
    <nav className='navbar'>
        <ul>
            <li className='logo'>
                <img src={Temple} alt="/" />
                <span>Pro</span>
            </li>
            <li>
                <Link to="/login">Login</Link>
            </li>
            <li><Link to='/signup'>Create Account</Link></li>
            {error && <p>{error}</p>}
            <li>{ !isPending &&
                <button className='btn' onClick={handleLogout}>Logout</button>}
                {isPending && <button className='btn' onClick={handleLogout}>Wait...</button>}
            </li>
        </ul>
    </nav>
  )
}
