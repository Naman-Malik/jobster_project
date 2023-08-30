import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import customFetch from '../../utils/axios';
import { getUserFromLocalStorage } from '../../utils/localStorage';
import { LogoutUser } from './userSlice';
import { showLoading,hideLoading,getAllJobs } from './allJobsSlice';

const initialState = {
  isLoading: false,
  position: '',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
};

export const deleteJob = createAsyncThunk(
    'job/deleteJob',
    async (jobId, thunkAPI) => {
      thunkAPI.dispatch(showLoading());
      try {
        const resp = await customFetch.delete(`/jobs/${jobId}`, {
          headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
          },
        });
        thunkAPI.dispatch(getAllJobs());
        return resp.data;
      } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    }
  );

export const createJob = createAsyncThunk('job/createJob',async(job,thunkAPI)=>{
    try{
        const resp = await customFetch.post('/jobs',job,{
            headers:{
                authorization:`Bearer ${thunkAPI.getState().user.user.token}`
            }
        })
        thunkAPI.dispatch(clearValues())
        return resp.data;
    }catch(error){
        if(error.response.status==401){
            thunkAPI.dispatch(LogoutUser())
            return toast.rejectWithValue('Unauthorized! Logging Out...')
        }

        return toast.rejectWithValue(error.response.data.msg);
    }
})

export const editJob = createAsyncThunk('job/editJob',
async({jobId,job},thunkAPI)=>{
    try {
        const resp = await customFetch.patch(`/jobs/${jobId}`,job,{
            headers:{
                authorization:`Bearer ${thunkAPI.getState().user.user.token}`,
            }
        })
        thunkAPI.dispatch(clearValues())
        return resp.data;
    } catch (error) {
        thunkAPI.rejectWithValue(error.response.data.msg);
    }
}
)

const jobSlice = createSlice({
  name: 'job',
  initialState,
  reducers:{
    handleChange:(state,{payload:{name,value}})=>{
        state[name] = value;
    },
    clearValues:()=>{
        return{
            ...initialState,
            jobLocation:getUserFromLocalStorage()?.location||'',  
       };
    },
    setEditValues:(state,{payload})=>{
        return {...state,isEditing:true,...payload}
    }
  },
  extraReducers:{
    [createJob.pending]: (state) =>{
        state.isLoading = true;
    },
    [createJob.fulfilled]: (state,{payload}) =>{
        state.isLoading = false;
        // console.log(payload);
        // return resp.data is the payload 
        toast.success(`Job Created`);
    },
    [createJob.rejected]: (state,{payload}) =>{
        state.isLoading = false;
        toast.error(payload);
        // error.response.data.msg is the payload
    },
    [deleteJob.fulfilled]: (state,{payload:{msg}}) =>{ 
        toast.success(msg);
    },
    [deleteJob.rejected]: (state,{payload}) =>{
        toast.error(payload);
    },
    [editJob.pending]: (state) =>{
        state.isLoading = true;
    },
    [editJob.fulfilled]: (state,{payload}) =>{
        state.isLoading = false;
        toast.success(`Job Edited...`);
    },
    [editJob.rejected]: (state,{payload}) =>{
        state.isLoading = false;
        toast.error(payload);
    },
  }
});

export const {handleChange,clearValues,setEditValues} = jobSlice.actions;

export default jobSlice.reducer;