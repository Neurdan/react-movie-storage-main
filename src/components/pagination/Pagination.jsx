import React from "react";
import {useDispatch} from "react-redux";
import {getNewItems} from "../../redux/actions/moviesActions";

const Pagination = ({countOfPages, portionPage, currentPage}) => {
    const dispatch = useDispatch();
    let pages = [];
    for (let i = 1; i <= countOfPages; i++) {
        pages.push(i);
    }

    const portionCount = countOfPages/10;
    // const [portionNumber, setPortionNumber] = useState(1);
    const left = (portionPage - 1) * 10 + 1;
    const right = portionPage * 10;
    const clickOnPage = (e, p) => {
        dispatch(getNewItems(true, p))
    }
    return (
        <div className='pagination'>
            {
               pages.length>0 && <button disabled={portionPage === 1}>{"<<"}</button>
            }
            <div className="">
                {
                    pages.filter(p => p >= left && p < right + 1)
                        .map(p => {
                            return <span key={p} className={currentPage === p ? 'pagination__current' : 'pagination__item'} onClick={(e)=>clickOnPage(e,p)}>{p}</span>
                        })
                }
            </div>
            {
                pages.length>0 && <button disabled={portionCount < portionPage}>{'>>'}</button>
            }
        </div>
    )
}
export default Pagination;