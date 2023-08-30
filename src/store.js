import {configureStore} from '@reduxjs/toolkit'
import userSlice from './features/user/userSlice'
import jobSlice from './features/user/jobSlice';
import allJobsSlice from './features/user/allJobsSlice';

export const store = configureStore({
    reducer:{
        user:userSlice,
        job:jobSlice,
        allJobs:allJobsSlice
    },
});