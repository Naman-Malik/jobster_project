import React, { useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { showStats } from '../../features/user/allJobsSlice';
import { ChartsContainer, StatsContainer } from '../../components';

function Stats() {
  const {isLoading,monthlyApplications} = useSelector((store) => store.allJobs)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(showStats());
  },[])
  return (
    <>
    <StatsContainer/>
    {monthlyApplications.length>0 && <ChartsContainer/>}
    </>
  )
}

export default Stats