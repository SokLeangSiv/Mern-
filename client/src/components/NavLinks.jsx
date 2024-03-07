import Links from "../utils/Links";
import { NavLink } from "react-router-dom";
import { useDashBoardContext } from "../pages/DashboardLayout";

const NavLinks = () => {

    const {toggleSidebar,user} = useDashBoardContext();
    const {role} = user;

   

  return (
    <div className="nav-links">
            {Links.map((link, index) => {
              const { text, path, icon } = link;
              if(path === 'admin' && role !== 'admin') {return ;}
              return (
                <NavLink key={index} to={path} className="nav-link">
                  <span className="icon">{icon}</span>
                  {text}
                </NavLink>
              );
            })}
          </div>
  )
}

export default NavLinks