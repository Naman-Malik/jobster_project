import React, { useEffect } from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import {toast} from 'react-toastify'
import { useSelector,useDispatch } from 'react-redux'
import { FormRow,FormRowSelect } from '../../components'
import { clearValues, createJob, handleChange,editJob } from '../../features/user/jobSlice'

function AddJob() {
  const {
    isLoading,
    position,
    company,
    jobType,
    jobLocation,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId
  } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const {user} = useSelector((store) => store.user);
  useEffect(()=>{
    if(!isEditing){
      dispatch(handleChange({name:'jobLocation',
      value:user.location,
    }
    ));
    }
  },[])

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!position||!company||!jobLocation){
      toast.error('Please fill out all fields');
      return
    }
    if(isEditing){
      dispatch(editJob({
        jobId:editJobId,
      job: {
        position,
        company,
        jobLocation,
        jobType,
        status,
      },
      }))
      return
    }
    dispatch(createJob({position,company,jobLocation,jobType,status}));
  }

  const handleJobInput = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({name,value}))
  }


  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing?'edit job':'add job'}</h3>
        <div className="form-center">
          <FormRow 
          type='text'
          name='position'
          value={position}
          handleChange={handleJobInput}
          />
          <FormRow 
          type='text'
          name='company'
          value={company}
          handleChange={handleJobInput}
          />
          <FormRow 
          type='text'
          name='jobLocation'
          labelText='job location'
          value={jobLocation}
          handleChange={handleJobInput}
          />
          <FormRowSelect
          name='status'
          value={status}
          handleChange={handleJobInput}
          list={statusOptions}
          />
          <FormRowSelect
          name='jobType'
          labelText='job type'
          value={jobType}
          handleChange={handleJobInput}
          list={jobTypeOptions}
          />
          <button type='button' 
          className='btn btn-block clear-btn'
          onClick={()=>dispatch(clearValues())}
          >
            clear
          </button>
          <button type='submit' 
          className='btn btn-block submit-btn'
          onClick={handleSubmit}
          disabled={isLoading}
          >
            submit
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddJob