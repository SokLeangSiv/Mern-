import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, InputForm, SubmitBtn } from "../components";
import { Form,redirect,Link } from "react-router-dom";
import customFetch from '../utils/customFetch';
import {toast} from 'react-toastify';

export const action = async ({request})=>{
  
  const formData = await request.formData();

  const data = Object.fromEntries(formData);


  try {
    await customFetch.post('/auth/register', data);
    toast.success('Register successfully');
    return redirect('/login'); 
  } catch (error) {
    toast.error(error?.response?.data?.message); // Display the specific error message from the server or 'Wrong part' if no message is available
    console.log(error); // Log the error to the console
    return null;
  }

}

const Register = () => {


  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />

        <h4>Register</h4>

        <InputForm labelName='name' type='text'  name='name'/>
        <InputForm labelName='Last Name' type='text'  name='lastname'/>
        <InputForm labelName='Location' type='text'  name='location'/>
        <InputForm labelName='Email' type='email'  name='email'/>
        <InputForm labelName='Password' type='password' name='password'/>

        <SubmitBtn formBtn />

        <p>
          Already a member
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
