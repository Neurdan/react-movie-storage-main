import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Card from "../components/Card/Card";
import {getFindResultThunk, getNewItems} from "../redux/actions/moviesActions";

const FindPage = () => {
    const isEmpty = (obj) => {
        for (let key in obj) {
            return false;
        }
        return true;
    }
    const {findResult, isFetchingMovie, errorFind, query} = useSelector(({movies}) => movies)
    const [errorFetch, setErrorFetch] = useState('')
    useEffect(() => {
        if (!isEmpty(errorFind)) {
            let errorText = `${errorFind.code}: `
            for (let key in errorFind.fields) {
                errorText += ` ${key} ${errorFind.fields[key]}`
            }
            setErrorFetch(errorText)
        } else {
            setErrorFetch('')
        }

    }, [errorFind])
    const [findFieldValue, setFindFieldValue] = useState(query)
    let history = useNavigate();
    const dispatch = useDispatch();
    const movieCards = findResult?.map(item => {
        return <Card year={item.year}
                     title={item.title}
                     id={item.id}
                     path={`movies/${item.id}`}
                     key={item.id}
        />
    })
    const clickEnter = e => {
        if (e.keyCode === 13 && findFieldValue.length > 0) {
            dispatch(getFindResultThunk(findFieldValue))
        }
    }
    const onFindClickHandle = () => {
        if (findFieldValue.length > 0) {
            dispatch(getFindResultThunk(findFieldValue))
        }

    }
    const onFindChangeHandle = e => {
        setFindFieldValue(e.target.value)
    }
    return (
        <div className='find-page'>
            {isFetchingMovie && <div className='loader'>
                <div className="loader__wrapper">
                    Loading...
                </div>
            </div>}
            <div className="find-page__top">
                <div className="go-back">
                    <span onClick={() => history(-1)}>Go Back</span>
                </div>
                <div className="find-page__search-block">
                    {(errorFetch !== '') && <span className='error-span'> {errorFetch}</span>}
                    <input placeholder='Type here actor name or title film' type="text" value={findFieldValue}
                           onKeyDown={e => clickEnter(e)}
                           onChange={onFindChangeHandle}/>
                    <button className="button find-page__search" onClick={onFindClickHandle}>Find</button>
                </div>
            </div>
            <div className="find-page__content">
                <div className="cards-block">
                    {
                        movieCards.length !== 0 ? movieCards : <p>{'You can find something'}</p>
                    }
                </div>
            </div>
        </div>
    )
};

export default FindPage;