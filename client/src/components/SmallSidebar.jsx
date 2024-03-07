import { FaTimes } from "react-icons/fa";
import Wrapper from "../assets/wrappers/SmallSidebar";
import { useDashBoardContext } from "../pages/DashboardLayout";  // Ensure correct import path


import Logo from "./Logo";
import NavLinks from "./NavLinks";

const SmallSidebar = () => {


  const { showSidebar, toggleSidebar } = useDashBoardContext();
  console.log("showSidebar:", showSidebar); 

  const handleClick = () => {
    console.log("Button clicked"); // Log button click
    toggleSidebar();
  };

  return (
    <Wrapper>
      <div className={showSidebar? 'sidebar-container show-sidebar ' : 'sidebar-container '}>
        <div className="content">
          <button type="button" className="close-btn" onClick={handleClick}>
            <FaTimes />
          </button>

          <header>
            <Logo />
          </header>

          <NavLinks/>
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;
