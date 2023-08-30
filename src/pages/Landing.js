import React from 'react'
import main from '../assets/images/main.svg'
// import styled from 'styled-components'
import Wrapper from '../assets/wrappers/LandingPage'
import {Logo} from '../components'
import {Link} from 'react-router-dom' 

const Landing = () => {
  return (
    <Wrapper>
        <nav>
           <Logo/>
        </nav>
        <div className='container page'>
            <div className='info'>
                <h1>job <span>tracking</span> app</h1>
                <p>
                If you're looking for job opportunities, there are several resources available for job searches in Delhi NCR. You can begin by visiting popular job portals.
                By visiting these websites and utilizing their search features, you can get access to a wide range of job opportunities in Delhi NCR. Remember to regularly check for updates and refine your search criteria to find the perfect job for you. Good luck with your job search!
                </p>
                <Link to='/register' className='btn btn-hero'>Login/Register</Link>
            </div>
            <img src={main} alt='job hunt' className='img main-img '/>
        </div>
    </Wrapper>
  )
}

// const Wrapper = styled.main`
// nav {
//     width: var(--fluid-width);
//     max-width: var(--max-width);
//     margin: 0 auto;
//     height: var(--nav-height);
//     display: flex;
//     align-items: center;
//   }
//   .page {
//     min-height: calc(100vh - var(--nav-height));
//     display: grid;
//     align-items: center;
//     margin-top: -3rem;
//   }
//   h1 {
//     font-weight: 700;
//     span {
//       color: var(--primary-500);
//     }
//   }
//   p {
//     color: var(--grey-600);
//   }
//   .main-img {
//     display: none;
//   }
//   @media (min-width: 992px) {
//     .page {
//       grid-template-columns: 1fr 1fr;
//       column-gap: 3rem;
//     }
//     .main-img {
//       display: block;
//     }
//   }
// `;

export default Landing;
