import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";
import { useRouteError,Link } from "react-router-dom";


const Error = () => {
  const error = useRouteError();

  if(error.status === 404){
    return <Wrapper>
      <div>
        <img src={img} alt="Not found" />
        <h3>Page not found</h3>
        <Link to='/'>Back home</Link>
      </div>
    </Wrapper>
  }

  return (
    <Wrapper>
      <div>
        <h3>Something went wrong</h3>
      </div>
    </Wrapper>
  );
};

export default Error;
