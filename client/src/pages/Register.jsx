import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, InputForm } from "../components";
import { Form,useNavigation,redirect,Link } from "react-router-dom";
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

  const navigation = useNavigation();

  console.log(navigation);

  const isSubmitting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />

        <h4>Register</h4>

        <InputForm labelName='name' type='text' defaultValue="Leangsiv" name='name'/>
        <InputForm labelName='Last Name' type='text' defaultValue="Sok" name='lastname'/>
        <InputForm labelName='Location' type='text' defaultValue="Cambodia" name='location'/>
        <InputForm labelName='Email' type='email' defaultValue="Leangsiv777@gmail.com" name='email'/>
        <InputForm labelName='Password' type='password' defaultValue="123456789" name='password'/>

        <button className="btn btn-block" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Register"}
        </button>

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
