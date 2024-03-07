import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import Wrapper from '../assets/wrappers/ThemeToggle';
import { useDashBoardContext } from '../pages/DashboardLayout';

const ThemeToggle = () => {
    const{isDarkTheme, toggleDarkTheme} = useDashBoardContext();
  return (
    <Wrapper onClick={toggleDarkTheme}>
        {isDarkTheme ? <BsFillSunFill /> : <BsFillMoonFill />}
    </Wrapper>

  )
}

export default ThemeToggle;