import React,{useEffect} from 'react'
import Loading from './Loading'
import { useSelector,useDispatch } from 'react-redux';
import Jobs from './Jobs';
import Wrapper from '../assets/wrappers/JobsContainer';
import { getAllJobs } from '../features/user/allJobsSlice';
import PageBtnContainer from './PageBtnContainer';


function JobsContainer() {
    const { jobs, isLoading,page,totalJobs,numOfPages,search,
        sort,searchStatus,searchType
     } = useSelector((store) => store.allJobs);
    // console.log(numOfPages);
    // console.log(jobs);
    // console.log(page);
    // console.log(totalJobs);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getAllJobs());
    },[page,sort,searchStatus,searchType,search])


    if (isLoading) {
        return <Loading center/>
    }

    if(jobs.length === 0 ){
        return(
            <Wrapper>
                <h2>No jobs to display...</h2>
            </Wrapper>
        )
    }

  return (
    <Wrapper>
        <h5>
            {totalJobs} job{jobs.length>1&&'s'} Found
        </h5>
        <div className='jobs'>
            {jobs.map((job)=>{
                // console.log(job);
                return <Jobs key={job._id} {...job}/>
            })}
        </div>
        {numOfPages>1 && <PageBtnContainer/>}
    </Wrapper>
  )
}

export default JobsContainer