import { InputForm, FormRowSelect,SubmitBtn } from '../components';
import Wrapper from '../assets/wrappers/DashboardFormPage';
import { useOutletContext } from 'react-router-dom';

import { Form, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../utils/customFetch';
import { JOB_STATUS, JOB_TYPE } from '../../../utils/contants';

export const action = async ({request})=>{

  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try{
    await customFetch.post('/jobs', data);
    toast.success("Add Job Sucesfully");
    return redirect('all-jobs');
  }catch(error){

    toast.error(error?.response?.data?.msg);
    return error;

  }

  
}


const AddJob = () => {

  const {user} = useOutletContext();



  return (
   <Wrapper>

    <Form method='post' className='form'>
      <h4 className='form-title'>add job</h4>
      <div className='form-center'> 

          <InputForm type="text" name="position" /> 
          <InputForm type="text" name="company" /> 
          <InputForm type="text" name="jobLocation" defaultValue={user.location} /> 

          <FormRowSelect name="jobStatus" labelText="Job Status" defaultValue={JOB_STATUS.PENDING} list={Object.values(JOB_STATUS)} />
          <FormRowSelect name="jobType" labelText="Job Type" defaultValue={JOB_STATUS.FULL_TIME} list={Object.values(JOB_TYPE)} />
          
          <SubmitBtn formBtn/>
          
      </div>

    </Form>

   </Wrapper>
  )
}

export default AddJob