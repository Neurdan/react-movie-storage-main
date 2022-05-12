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
    const [isFinded, setIsFinded] = useState(false)
    const [findQuery, setFindQuery] = useState('')
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
    const clickEnter = async e => {
        if (e.keyCode === 13 && findFieldValue.length > 0) {
            await dispatch(getFindResultThunk(findFieldValue))
            setFindQuery(findFieldValue)
            setIsFinded(true)
        }
    }
    const onFindClickHandle = async () => {
        if (findFieldValue.length > 0) {
            await dispatch(getFindResultThunk(findFieldValue))
            setFindQuery(findFieldValue)
            setIsFinded(true)
        }

    }
    const onFindChangeHandle = e => {
        if (e.target.value.charAt(0) === ' ') return
        setFindQuery('')
        setIsFinded(false)
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
                {isFinded ? <div className='find-page__query-text'>{`on query ${findQuery} you found:`}</div> : ''}
                <div className="cards-block">

                    {
                        movieCards.length !== 0 && movieCards
                    }
                    {
                        (isFinded && movieCards.length === 0) && <div>Nothing</div>
                    }
                </div>
            </div>
        </div>
    )
};

export default FindPage;