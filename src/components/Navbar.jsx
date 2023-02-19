import './Navbar.css'
import Temple from '../assets/temple.svg'

import { Link } from 'react-router-dom'

export default function Navbar() {
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
            <li>
                <button className='btn'>Logout</button>
            </li>
        </ul>
    </nav>
  )
}
