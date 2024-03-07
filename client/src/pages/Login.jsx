import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, InputForm } from "../components";

import { Form,useNavigation,redirect,Link, useActionData } from "react-router-dom";
import customFetch from '../utils/customFetch';
import {toast} from 'react-toastify';

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

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  
  const errors = useActionData();


  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <h4>Login</h4>

        {errors?.msg && <p style={{color:'red'}}>{errors.msg}</p>}
        
        <InputForm name="email" type="email" labelName="Email" defaultValue="leangsiv7777@gmail.com"/>
        <InputForm name="password" type="password" labelName="Password" defaultValue="123456789"/>

        <p>
          Dont have account ? <Link to='/register' className="member-btn">Register</Link>
        </p>
        <button type="submit" className="btn btn-block" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Login"}
        </button>
      </Form>
    </Wrapper>
  );
};

export default Login;
