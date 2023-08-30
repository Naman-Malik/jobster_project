import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { changePage } from '../features/user/allJobsSlice';

const PageBtnContainer = () => {
    const {page,numOfPages} = useSelector((store) => store.allJobs);
    const pages = Array.from({length:numOfPages},(_,index)=>{
        return index+1;
    });
    const dispatch = useDispatch();
    const nextPage = () => {
        let ret = page+1;
        if(ret>numOfPages){
            ret = 1;
        }
        dispatch(changePage(ret));
    };
  const prevPage = () => {
    let ret = page-1;
        if(ret<1){
            ret = numOfPages;
        }
        dispatch(changePage(ret));
  };
    // console.log(pages);
  return (
    <Wrapper>
        <button className='prev-btn' onClick={prevPage}>
            <HiChevronDoubleLeft/>
            prev
        </button>
        <div className='btn-container'>
        {pages.map((pageNumber) =>{
            return (
                <button 
                type='button'
                className={pageNumber === page? 'pageBtn active':'pageBtn'}
                key={pageNumber}
                onClick={()=> dispatch(changePage(pageNumber))}
                >
                    {pageNumber}
                </button>
            )
        })}
        </div>
        <button className='next-btn' onClick={nextPage}>
            <HiChevronDoubleRight/>
            right
        </button>
    </Wrapper>
  )
}

export default PageBtnContainer