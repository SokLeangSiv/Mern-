import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer.js';
import { useAllJobsContext } from '../pages/AllJobs';

function JobContainer() {

  const {data} = useAllJobsContext();
  const {jobs} =  data;

  if(jobs.length === 0){
    
    return <Wrapper>
      <h1>No Job to display ... </h1>
    </Wrapper>
  }

  return <Wrapper>
    <div className='jobs'>
      {jobs.map((job)=> {
        return <Job key={job._id} {...job}/>
      })}
    </div>
  </Wrapper>
}

export default JobContainer;