import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, InputForm, SubmitBtn } from "../components";

import { Form,redirect,Link, useActionData, useNavigate } from "react-router-dom";
import customFetch from '../utils/customFetch';
import {toast} from 'react-toastify';
// import { use } from "express/lib/router";

export const action = async ({request})=>{
  
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  const errors = {msg: ''};

  if (data.password.length < 8) {
    errors.msg = 'Password must be at least 8 characters';
    return errors;
  }

  try {
    await customFetch.post('/auth/login', data);
    toast.success('Login successfully');
    return redirect('/dashboard');
  } catch (error) {
    errors.msg = error?.response?.data?.message;
    return errors;
  }


}

const Login = () => {
  
  const errors = useActionData();

  const navigate = useNavigate();

  const loginDemoUser = async () => {
    const data = {
      "email": "test@test.com",
      "password": "secret123",
    }

    try {

      await customFetch.post('/auth/login', data);
      toast.success('Enjoy viewing');
      navigate('/dashboard');
    } catch (error) {

      toast.error(error?.response?.data?.message);
      return error;
    }
  }
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>

        {errors?.msg && <p style={{color:'red'}}>{errors.msg}</p>}
        
        <InputForm name="email" type="email" labelName="Email" />
        <InputForm name="password" type="password" labelName="Password"/>

        <p>
          Dont have account ? <Link to='/register' className="member-btn">Register</Link>
        </p>
        <SubmitBtn formBtn />

        <button type="button" className="btn btn-block" onClick={loginDemoUser}>Explore the app</button>
      </Form>
    </Wrapper>
  );
};

export default Login;
