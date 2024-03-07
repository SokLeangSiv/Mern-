import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from "./NavLinks";
import  Logo from "./Logo"
import { useDashBoardContext } from "../pages/DashboardLayout";

const BigSidebar = () => {

  const {showSidebar} = useDashBoardContext();
  return (
    <Wrapper>
      <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar