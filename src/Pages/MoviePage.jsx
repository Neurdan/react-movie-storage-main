import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Card from "../components/Card/Card";
import {getNewItems} from "../redux/actions/moviesActions";
import Modal from "../components/Modal/Modal";

const MoviePage = () => {
    const dispatch = useDispatch();

    const {result, sought, isFetchingMovie} = useSelector(({movies}) =>  movies)
    const [modalActive, setModalActive] = useState(false)
    useEffect(()=>{
       dispatch(getNewItems())
    },[])

    const movieCards =  result?.map(item =>{
        return <Card year={item.year}
                     title={item.title}
                     id={item.id}
                     path={`movies/${item.id}`}
                     key={item.id}
        />
    })
    return(
        <div className="search-result">
            {isFetchingMovie && <div className='loader'>
                <div className="loader__wrapper">
                    Loading...
                </div>
            </div>}
            <div className="search-result__top">
                <h2 className="search-result__title">All films sorted by name (asc)</h2>
                <div className="search-result__add-movie">
                    <span className="open-btn" onClick={()=>setModalActive(true)}>Add movie</span>
                </div>
            </div>
            <div className="cards-block">
                {
                    movieCards.length !== 0 ? movieCards : <p>{'You can find something'}</p>
                }
            </div>
            <Modal active={modalActive} setActive={setModalActive} type={"AddMovie"}/>
        </div>
    )
}
export default MoviePage;

