import Wrapper from "../assets/wrappers/LandingPage";
import Logo from '../components/Logo';
import { Link } from "react-router-dom";
import main from "../assets/images/main.svg"


const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo/>
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis,
            distinctio impedit molestias optio amet sequi deleniti at minima
            natus consequuntur odio laudantium dolor. Voluptatem eos, laboriosam
            perspiciatis molestias nulla dolorem?
          </p>

          <Link to="/register" className="btn register-link">
            Register
          </Link>

          <Link to="/login" className="btn register-link">
            Login / Demo User
          </Link>

        </div>

        <img src={main} alt="" className="img  main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
