import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <div className ='sidebar'>
        <div className= 'sidebar-content'>
          <div className="user">
            {/* user here later */}
            <p>Hey , User</p>
            <nav className="links">
              <ul>
                <NavLink to='/'>
                  <img src={DashboardIcon} alt="dashboard" />
                  <span>Dashboard</span>
                </NavLink>
                 <NavLink to='/create'>
                  <img src={AddIcon} alt="dashboard" />
                  <span>New Project</span>
                </NavLink>
              </ul>
            </nav>
          </div>
        </div>
    </div>
  )
}
