import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Landing,Error,Register, PrivateRoute} from './pages';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { SharedLayout,AllJobs,AddJob,Profile,Stats } from './pages/Dashboard';
// import styled from 'styled-components';


// const Button = styled.button`
// background: red;
// color:white;
// font-size: 2rem;
// `;

function App() {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={
        <PrivateRoute>
      <SharedLayout/>
      </PrivateRoute>
      }>
        <Route index element={<Stats/>}></Route>
        <Route path='/addjob' element={<AddJob/>}></Route>
        <Route path='/alljobs' element={<AllJobs/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        
      </Route>
      <Route path='landing' element={<Landing/>}></Route>
      <Route path='register' element={<Register/>}></Route>
      <Route path='*' element={<Error/>}></Route>
     </Routes>
     <ToastContainer position='top-center'/>
    </BrowserRouter>
  );
}

export default App;
