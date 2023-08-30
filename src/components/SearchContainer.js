import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import Wrapper from '../assets/wrappers/SearchContainer';
import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';
import { handleChange,clearFilters } from '../features/user/allJobsSlice';

function SearchContainer() {
  const {isLoading,search,searchStatus,searchType,sort,sortOptions } = useSelector((store)=> store.allJobs)
  const {jobTypeOptions,statusOptions} = useSelector((store)=>store.job)
  const dispatch = useDispatch();
  const handleSearch = (e) =>{
    if(isLoading) return;
    dispatch(handleChange({name:e.target.name,value:e.target.value}));
  };
  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(clearFilters());
  };
  return (
    <Wrapper>
      <form className='form'>
        <h4>search form</h4>
        <div className='form-center'>
          <FormRow type='text' name='search'// name must be equal to the initial state obj mai jo value hai uske
          value={search} handleChange={handleSearch}
          />

          <FormRowSelect 
          labelText='status' 
          name='searchStatus'
          value={searchStatus} 
          handleChange={handleSearch}
          list={['all',...statusOptions]}
          />
           <FormRowSelect 
          labelText='type' 
          name='searchType'
          value={searchType} 
          handleChange={handleSearch}
          list={['all',...jobTypeOptions]}
          />
           <FormRowSelect 
          name='sort'
          value={sort} 
          handleChange={handleSearch}
          list={sortOptions}
          />
          <button className='btn btn-block btn-danger'
          disabled={isLoading} onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default SearchContainer